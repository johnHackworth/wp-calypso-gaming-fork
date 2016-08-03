/**
 * Internal dependencies
 */
import { DOCUMENT_HEAD_TITLE_SET, DOCUMENT_HEAD_UNREAD_COUNT_SET, SELECTED_SITE_SET } from 'state/action-types';
import { decodeEntities } from 'lib/formatting';
import { getTitle, getUnreadCount } from './selectors';
import { getSelectedSite } from 'state/ui/selectors';
import { getSite } from 'state/sites/selectors';

/**
 * Middleware that updates the screen title when a title updating action is
 * dispatched.
 *
 * @param {Object} store Redux store instance
 * @returns {Function} A configured middleware with store
 */
export default ( { getState } ) => ( next ) => ( action ) => {
	let formattedTitle;
	switch ( action.type ) {
		case DOCUMENT_HEAD_TITLE_SET:
			formattedTitle = getFormattedTitle(
				action.title,
				getUnreadCount( getState() ),
				getSelectedSite( getState() )
			);
			if ( formattedTitle !== document.title ) {
				document.title = formattedTitle;
			}
			break;

		case DOCUMENT_HEAD_UNREAD_COUNT_SET:
			formattedTitle = getFormattedTitle(
				getTitle( getState() ),
				action.count,
				getSelectedSite( getState() )
			);
			if ( formattedTitle !== document.title ) {
				document.title = formattedTitle;
			}
			break;

		case SELECTED_SITE_SET:
			formattedTitle = getFormattedTitle(
				getTitle( getState() ),
				getUnreadCount( getState() ),
				getSite( getState(), action.siteId )
			);
			if ( formattedTitle !== document.title ) {
				document.title = formattedTitle;
			}
			break;
	}

	return next( action );
};

function getFormattedTitle( title, unreadCount, site ) {
	let pageTitle = '';

	if ( unreadCount ) {
		pageTitle += '(' + unreadCount + ') ';
	}

	pageTitle += title;

	if ( site ) {
		pageTitle = appendSite( pageTitle, site );
	}

	if ( pageTitle ) {
		pageTitle = decodeEntities( pageTitle ) + ' — WordPress.com';
	} else {
		pageTitle = 'WordPress.com';
	}

	return pageTitle;
}

function appendSite( title, site ) {
	let siteName;

	if ( site.name ) {
		siteName = site.name;
	} else {
		// FIXME: site.domain computed attribute. See https://github.com/Automattic/wp-calypso/pull/6477
		siteName = site.URL.replace( /^https?:\/\//, '' );
	}

	if ( title ) {
		return title + ' \u2039 ' + siteName;
	}

	return siteName;
}
