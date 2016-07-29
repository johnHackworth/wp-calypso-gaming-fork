/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import observe from 'lib/mixins/data-observe';
import SitePicker from 'my-sites/picker';
import Sidebar from 'my-sites/sidebar';
import { getCurrentUser } from 'state/current-user/selectors';
import { getCurrentLayoutFocus } from 'state/ui/layout-focus/selectors';
import { setNextLayoutFocus, setLayoutFocus } from 'state/ui/layout-focus/actions';

const MySitesNavigation = React.createClass( {
	displayName: 'MySitesNavigation',

	mixins: [ observe( 'sites' ) ],

	preventPickerDefault( event ) {
		event.preventDefault();
		event.stopPropagation();
	},

	render() {
		return (
			<div className="sites-navigation">
				<SitePicker
					setNextLayoutFocus={ this.props.setNextLayoutFocus }
					setLayoutFocus={ this.props.setLayoutFocus }
					currentLayoutFocus={ this.props.currentLayoutFocus }
					sites={ this.props.sites }
					allSitesPath={ this.props.allSitesPath }
					siteBasePath={ this.props.siteBasePath }
					onClose={ this.preventPickerDefault }
				/>
				<Sidebar
					setNextLayoutFocus={ this.props.setNextLayoutFocus }
					setLayoutFocus={ this.props.setLayoutFocus }
					sites={ this.props.sites }
					allSitesPath={ this.props.allSitesPath }
					path={ this.props.path }
					siteBasePath={ this.props.siteBasePath }
					currentUser={ this.props.currentUser }
				/>
			</div>
		);
	}
} );

function mapStateToProps( state ) {
	return {
		currentUser: getCurrentUser( state ),
		currentLayoutFocus: getCurrentLayoutFocus( state ),
	};
}

// TODO: set pure = true when Redux sites can be used for SitePicker
module.exports = connect( mapStateToProps, { setNextLayoutFocus, setLayoutFocus }, null, { pure: false } )( MySitesNavigation );
