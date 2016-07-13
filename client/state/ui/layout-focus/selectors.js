/** @ssr-ready **/

/**
 * Returns the current layout focus area
 *
 * @param  {Object}  state Global state tree
 * @return {?String}  The current layout focus area
 */
export function getCurrentLayoutFocus( state ) {
	return state.ui.layoutFocus.current;
}

/**
 * Returns the previous layout focus area
 *
 * @param  {Object}  state Global state tree
 * @return {?String}  The previous layout focus area
 */
export function getPreviousLayoutFocus( state ) {
	return state.ui.layoutFocus.previous;
}

/**
 * Returns the next layout focus area
 *
 * @param  {Object}  state Global state tree
 * @return {?String}  The next layout focus area
 */
export function getNextLayoutFocus( state ) {
	return state.ui.layoutFocus.next;
}

