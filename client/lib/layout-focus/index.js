/** @ssr-ready **/

/**
 * Internal dependencies
 */
import Emitter from 'lib/mixins/emitter';
import config from 'config';

// These are the structural areas
// of the main body of Calypso
const _areas = [ 'content', 'sidebar', 'sites', 'preview' ];
function isValid( area ) {
	const valid = _areas.indexOf( area ) !== -1;

	if ( ! valid ) {
		if ( config( 'env' ) === 'development' ) {
			throw new Error( area + ' is not a valid layout focus area' );
		}
	}

	return valid;
}

/**
 * This module stores the current and previous
 * layout focus for easy, centralized access and
 * retrieval from anywhere in the app.
 *
 * These focus area values are whitelisted and used for informing
 * what the focus for any view of Calypso should be.
 *
 * This is a legacy Flux store; there is a Redux store available instead under
 * state.ui.layoutFocus.
 */
const layoutFocus = {

	// Store `current` and `previous` states
	// as internal attributes
	_current: null,
	_previous: null,
	_next: null,

	getCurrent: function() {
		return this._current || 'content';
	},

	getPrevious: function() {
		return this._previous;
	},

	set: function( area ) {
		if ( area === this._current || ! isValid( area ) ) {
			return;
		}

		this._previous = this._current;

		// Update current state and emit change event
		this._current = area;
		this.emit( 'change' );
	},

	next: function() {
		let area = this._next;

		// If we don't have a change queued and the focus has changed
		// previously, set it to `content`. This avoids having to set the
		// focus to content on all navigation links because it becomes the
		// default after focus has shifted.
		if ( ! area && this._previous !== null ) {
			area = 'content';
		}

		if ( ! area ) {
			return;
		}

		this._next = null;

		this.set( area );
	},

	setNext: function( area ) {
		if ( ! isValid( area ) ) {
			return;
		}

		this._next = area;
	},

};

/**
 * Mixins
 */
Emitter( layoutFocus );

module.exports = layoutFocus;
