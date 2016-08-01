/**
 * External dependencies
 */
var React = require( 'react' ),
	wrapWithClickOutside = require( 'react-click-outside' ),
	noop = require( 'lodash/noop' ),
	closeOnEsc = require( 'lib/mixins/close-on-esc' );

/**
 * Internal dependencies
 */
var SiteSelector = require( 'components/site-selector' ),
	hasTouch = require( 'lib/touch-detect' ).hasTouch;

const SitePicker = React.createClass( {
	displayName: 'SitePicker',

	mixins: [ closeOnEsc( 'closePicker' ) ],

	propTypes: {
		onClose: React.PropTypes.func,
		currentLayoutFocus: React.PropTypes.string,
		setNextLayoutFocus: React.PropTypes.func.isRequired,
		setLayoutFocus: React.PropTypes.func.isRequired,
	},

	getInitialState: function() {
		return {
			isAutoFocused: false
		};
	},

	getDefaultProps: function() {
		return {
			onClose: noop
		};
	},

	componentWillReceiveProps: function( nextProps ) {
		if ( ! nextProps.currentLayoutFocus || hasTouch() ) {
			return;
		}

		const isAutoFocused = nextProps.currentLayoutFocus === 'sites';
		if ( isAutoFocused !== this.state.isAutoFocused ) {
			this.setState( { isAutoFocused } );
		}
	},

	onClose: function( event ) {
		if ( event.key === 'Escape' ) {
			this.closePicker();
		} else {
			// We use setNext here, because on mobile we want to show sidebar
			// instead of Stats page after picking a site
			this.props.setNextLayoutFocus( 'sidebar' );
			this.scrollToTop();
		}
		this.props.onClose( event );
	},

	scrollToTop: function() {
		document.getElementById( 'secondary' ).scrollTop = 0;
		window.scrollTo( 0, 0 );
	},

	closePicker: function() {
		if ( this.props.currentLayoutFocus === 'sites' ) {
			this.props.setLayoutFocus( 'sidebar' );
			this.scrollToTop();
		}
	},

	handleClickOutside: function() {
		this.closePicker();
	},

	render: function() {
		return (
			<SiteSelector
				ref="siteSelector"
				indicator={ true }
				showAddNewSite={ true }
				showAllSites={ true }
				sites={ this.props.sites }
				allSitesPath={ this.props.allSitesPath }
				siteBasePath={ this.props.siteBasePath }
				autoFocus={ this.state.isAutoFocused }
				onClose={ this.onClose }
				groups={ true }
			/>
		);
	}
} );

module.exports = wrapWithClickOutside( SitePicker );
