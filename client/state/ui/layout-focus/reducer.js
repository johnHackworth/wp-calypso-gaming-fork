/**
 * External dependencies
 */
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import {
	LAYOUT_FOCUS_SET,
	LAYOUT_NEXT_FOCUS_ACTIVATE,
	LAYOUT_NEXT_FOCUS_SET,
} from 'state/action-types';

const initialState = { current: null, previous: null, next: null };
const validAreas = [ 'content', 'sidebar', 'sites', 'preview' ];
const isValidArea = area => includes( validAreas, area );

export default function layoutFocus( state = initialState, action ) {
	switch ( action.type ) {
		case LAYOUT_FOCUS_SET:
			if ( action.area === state.current || ! isValidArea( action.area ) ) {
				return state;
			}
			return Object.assign( {}, state, { current: action.area, previous: state.current } );
		case LAYOUT_NEXT_FOCUS_SET:
			if ( action.area === state.next || ! isValidArea( action.area ) ) {
				return state;
			}
			return Object.assign( {}, state, { next: action.area } );
		case LAYOUT_NEXT_FOCUS_ACTIVATE:
			// If we don't have a change queued and the focus has changed
			// previously, set it to `content`. This avoids having to set the
			// focus to content on all navigation links because it becomes the
			// default after focus has shifted.
			if ( ! state.next && ! state.previous ) {
				return state;
			}
			return Object.assign( {}, state, { current: state.next || 'content', previous: state.current, next: null } );
	}
	return state;
}
