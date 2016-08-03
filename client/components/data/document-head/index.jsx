/**
 * External dependencies.
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import each from 'lodash/each';
import isEqual from 'lodash/isEqual';

/**
 * Internal dependencies.
 */
import {
	setDocumentHeadTitle as setTitle,
	setDocumentHeadDescription as setDescription,
	addDocumentHeadLink as addLink,
	addDocumentHeadMeta as addMeta,
	setDocumentHeadUnreadCount as setUnreadCount
} from 'state/document-head/actions';

class DocumentHead extends Component {
	componentWillMount() {
		const {
			title,
			description,
			unreadCount
		} = this.props;

		if ( title ) {
			this.props.setTitle( title );
		}

		if ( description ) {
			this.props.setDescription( description );
		}

		if ( unreadCount ) {
			this.props.setUnreadCount( unreadCount );
		}

		each( this.props.link, ( link ) => {
			this.props.addLink( link );
		} );

		each( this.props.meta, ( meta ) => {
			this.props.addMeta( meta );
		} );
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.props.title !== nextProps.title ) {
			this.props.setTitle( nextProps.title );
		}

		if ( this.props.description !== nextProps.description ) {
			this.props.setDescription( nextProps.description );
		}

		if ( this.props.unreadCount !== nextProps.unreadCount ) {
			this.props.setUnreadCount( nextProps.unreadCount );
		}

		if ( ! isEqual( this.props.link, nextProps.link ) ) {
			each( nextProps.link, ( link ) => {
				this.props.addLink( link );
			} );
		}

		if ( ! isEqual( this.props.meta, nextProps.meta ) ) {
			each( nextProps.meta, ( meta ) => {
				this.props.addMeta( meta );
			} );
		}
	}

	render() {
		return null;
	}
}

DocumentHead.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	unreadCount: PropTypes.string, // E.g. '40+'
	link: PropTypes.array,
	meta: PropTypes.array,
	setTitle: PropTypes.func.isRequired,
	setDescription: PropTypes.func.isRequired,
	addLink: PropTypes.func.isRequired,
	addMeta: PropTypes.func.isRequired,
	setUnreadCount: PropTypes.func.isRequired
};

export default connect(
	null,
	{
		setTitle,
		setDescription,
		addLink,
		addMeta,
		setUnreadCount
	}
)( DocumentHead );
