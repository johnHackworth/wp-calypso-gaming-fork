/**
 * External dependencies
 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import {
	LAYOUT_FOCUS_SET,
	LAYOUT_NEXT_FOCUS_SET,
	LAYOUT_NEXT_FOCUS_ACTIVATE,
} from 'state/action-types';
import layoutFocus from '../reducer';

describe( 'reducer', () => {
	it( 'starts with current focus set to null', function() {
		const action = { type: 'FAKE_ACTION' };
		const state = layoutFocus( undefined, action );
		expect( state.current ).to.equal( null );
	} );

	describe( 'LAYOUT_FOCUS_SET', () => {
		it( 'sets the current focus area to the passed value', function() {
			const action = { type: LAYOUT_FOCUS_SET, area: 'sidebar' };
			const state = layoutFocus( undefined, action );
			expect( state.current ).to.equal( 'sidebar' );
		} );

		it( 'sets the previous focus area to the old current value', function() {
			const action = { type: LAYOUT_FOCUS_SET, area: 'sidebar' };
			const initialState = { current: 'content', previous: null, next: null };
			const state = layoutFocus( initialState, action );
			expect( state.previous ).to.equal( 'content' );
		} );

		it( 'does not set the current focus area if the value is invalid', function() {
			const action = { type: LAYOUT_FOCUS_SET, area: 'foobar' };
			const initialState = deepFreeze( { current: 'content', previous: null, next: null } );
			const state = layoutFocus( initialState, action );
			expect( state ).to.eql( initialState );
		} );

		it( 'does not set the current focus area if the value is the same', function() {
			const action = { type: LAYOUT_FOCUS_SET, area: 'content' };
			const initialState = { current: 'content', previous: null, next: null };
			const state = layoutFocus( initialState, action );
			expect( state ).to.equal( initialState );
		} );
	} );

	describe( 'LAYOUT_NEXT_FOCUS_SET', () => {
		it( 'sets the next focus area to the passed value', function() {
			const action = { type: LAYOUT_NEXT_FOCUS_SET, area: 'sidebar' };
			const state = layoutFocus( undefined, action );
			expect( state.next ).to.equal( 'sidebar' );
		} );

		it( 'does not change the current focus area', function() {
			const action = { type: LAYOUT_NEXT_FOCUS_SET, area: 'sidebar' };
			const initialState = deepFreeze( { current: 'content', previous: null, next: null } );
			const state = layoutFocus( initialState, action );
			expect( state.current ).to.equal( initialState.current );
		} );

		it( 'does not change the previous focus area', function() {
			const action = { type: LAYOUT_NEXT_FOCUS_SET, area: 'sidebar' };
			const initialState = deepFreeze( { current: 'content', previous: 'sites', next: null } );
			const state = layoutFocus( initialState, action );
			expect( state.previous ).to.equal( initialState.previous );
		} );

		it( 'does not set the next focus area if the value is invalid', function() {
			const action = { type: LAYOUT_NEXT_FOCUS_SET, area: 'foobar' };
			const initialState = deepFreeze( { current: 'content', previous: null, next: null } );
			const state = layoutFocus( initialState, action );
			expect( state ).to.eql( initialState );
		} );

		it( 'does not set the next focus area if the value is the same', function() {
			const action = { type: LAYOUT_NEXT_FOCUS_SET, area: 'preview' };
			const initialState = { current: 'content', previous: null, next: 'preview' };
			const state = layoutFocus( initialState, action );
			expect( state ).to.equal( initialState );
		} );
	} );

	describe( 'LAYOUT_NEXT_FOCUS_ACTIVATE', () => {
		it( 'sets the current focus area to the next value if one exists', function() {
			const action = { type: LAYOUT_NEXT_FOCUS_ACTIVATE };
			const initialState = { current: 'content', previous: null, next: 'sidebar' };
			const state = layoutFocus( initialState, action );
			expect( state.current ).to.equal( 'sidebar' );
		} );

		it( 'sets the current focus area to "content" if the previous focus is set and no next state exists', function() {
			const action = { type: LAYOUT_NEXT_FOCUS_ACTIVATE };
			const initialState = { current: 'preview', previous: 'sites', next: null };
			const state = layoutFocus( initialState, action );
			expect( state.current ).to.equal( 'content' );
		} );

		it( 'sets the previous focus area to the current area', function() {
			const action = { type: LAYOUT_NEXT_FOCUS_ACTIVATE };
			const initialState = { current: 'content', previous: null, next: 'sidebar' };
			const state = layoutFocus( initialState, action );
			expect( state.previous ).to.equal( 'content' );
		} );

		it( 'sets the next focus area to null when complete', function() {
			const action = { type: LAYOUT_NEXT_FOCUS_ACTIVATE };
			const initialState = { current: 'content', previous: null, next: 'sidebar' };
			const state = layoutFocus( initialState, action );
			expect( state.next ).to.equal( null );
		} );

		it( 'does not take any action if the previous focus is not set and no next state exists', function() {
			const action = { type: LAYOUT_NEXT_FOCUS_ACTIVATE };
			const initialState = deepFreeze( { current: 'content', previous: null, next: null } );
			const state = layoutFocus( initialState, action );
			expect( state ).to.eql( initialState );
		} );
	} );
} );
