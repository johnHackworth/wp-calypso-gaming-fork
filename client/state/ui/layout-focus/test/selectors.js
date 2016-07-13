/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { getCurrentLayoutFocus, getPreviousLayoutFocus, getNextLayoutFocus } from '../../layout-focus/selectors';

describe( 'selectors', () => {
	let state;

	before( () => {
		state = { ui: { layoutFocus: {
			current: 'sites',
			previous: 'content',
			next: 'preview',
		} } };
	} );

	describe( 'getCurrentLayoutFocus', () => {
		it( 'returns the current layout focus area', () => {
			expect( getCurrentLayoutFocus( state ) ).to.equal( 'sites' );
		} );
	} );

	describe( 'getPreviousLayoutFocus', () => {
		it( 'returns the previous layout focus area', () => {
			expect( getPreviousLayoutFocus( state ) ).to.equal( 'content' );
		} );
	} );

	describe( 'getNextLayoutFocus', () => {
		it( 'returns the next layout focus area', () => {
			expect( getNextLayoutFocus( state ) ).to.equal( 'preview' );
		} );
	} );
} );
