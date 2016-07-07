/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import page from 'page';
import classNames from 'classnames';

/**
 * Internal Dependencies
 */
import Main from 'components/main';
import Card from 'components/card';
import Button from 'components/button';
import HappinessSupport from 'components/happiness-support';
import PersonalPlanDetails from 'my-sites/upgrades/checkout-thank-you/personal-plan-details';
import PremiumPlanDetails from 'my-sites/upgrades/checkout-thank-you/premium-plan-details';
import BusinessPlanDetails from 'my-sites/upgrades/checkout-thank-you/business-plan-details';
import PurchaseDetail from 'components/purchase-detail';
import {
	getPlansBySite,
	getCurrentPlan
} from 'state/sites/plans/selectors';
import { getSelectedSite, getSelectedSiteId } from 'state/ui/selectors';
import { fetchSitePlans } from 'state/sites/plans/actions';
import {
	isBusiness,
	isPremium,
	isPersonal,
	isFreePlan
} from 'lib/products-values';
import Gridicon from 'components/gridicon';
import TrackComponentView from 'lib/analytics/track-component-view';

const PlanDetailsComponent = React.createClass( {
	PropTypes: {
		selectedSite: React.PropTypes.object.isRequired,
		sitePlans: React.PropTypes.object.isRequired,
		fetchPlans: React.PropTypes.func.isRequired
	},

	componentWillUpdate: function( props ) {
		this.props.fetchPlans( props );
	},

	componentDidMount: function() {
		this.props.fetchPlans();
	},

	getPurchaseInfo: function() {
		const plan = this.props.currentPlan;

		if ( ! plan ) {
			return null;
		}

		const classes = classNames( 'current-plan__purchase-info', {
			'is-expiring': plan.userFacingExpiryMoment < this.moment().add( 30, 'days' )
		} );

		return (
			<div className={ classes }>
				<span className="current-plan__expires-in">
					{ this.translate( 'Expires on %s', {
						args: plan.userFacingExpiryMoment.format( 'LL' )
					} ) }
				</span>
				{ plan.userIsOwner &&
					<Button compact href={ `/purchases/${ this.props.selectedSite.slug }/${ plan.id }` }>
						{ this.translate( 'Renew Now' ) }
					</Button>
				}
			</div>
		);
	},

	render: function() {
		const { selectedSite } = this.props;
		const { hasLoadedFromServer } = this.props.sitePlans;
		let title;
		let tagLine;
		let featuresList;

		if ( ! selectedSite || ! hasLoadedFromServer ) {
			featuresList = (
				<div>
						<PurchaseDetail isPlaceholder />
						<PurchaseDetail isPlaceholder />
				</div>
			);
		} else if ( this.props.selectedSite.jetpack || isFreePlan( this.props.selectedSite.plan ) ) {
			page.redirect( '/plans/' + this.props.selectedSite.slug );
		} else if ( isPersonal( this.props.selectedSite.plan ) ) {
			title = this.translate( 'Your site is on a Personal plan' );
			tagLine = this.translate( 'Unlock the full potential of your site with all the features included in your plan.' );
			featuresList = (
				<PersonalPlanDetails
					selectedSite={ this.props.selectedSite }
					sitePlans={ this.props.sitePlans }
				/>
			);
		} else if ( isPremium( this.props.selectedSite.plan ) ) {
			title = this.translate( 'Your site is on a Premium plan' );
			tagLine = this.translate( 'Unlock the full potential of your site with the premium features included in your plan.' );
			featuresList = (
				<PremiumPlanDetails
					selectedSite={ selectedSite }
					sitePlans={ this.props.sitePlans }
				/>
			);
		} else if ( isBusiness( selectedSite.plan ) ) {
			title = this.translate( 'Your site is on a Business plan' );
			tagLine = this.translate( 'Learn more about everything included with Business and take advantage of its professional features.' );
			featuresList = ( <div>
				<BusinessPlanDetails
					selectedSite={ selectedSite }
					sitePlans={ this.props.sitePlans }
				/>
				<PremiumPlanDetails
					selectedSite={ selectedSite }
					sitePlans={ this.props.sitePlans }
				/>
			</div> );
		}

		return (
			<Main className="current-plan">
				<Card>
					<div className="current-plan__header">
						<div className="current-plan__header-content">
							<span className="current-plan__header-icon">
								<Gridicon icon="star" size={ 48 } />
							</span>

							<div className="current-plan__header-copy">
								<h1 className={ classNames( { 'current-plan__header-heading': true, 'is-placeholder': ! hasLoadedFromServer } ) }>
									{ title }
								</h1>
								<h2 className={ classNames( { 'current-plan__header-text': true, 'is-placeholder': ! hasLoadedFromServer } ) }>
									{ tagLine }
								</h2>
							</div>
						</div>
					</div>
					<Card compact>
						{ this.getPurchaseInfo() }
					</Card>
				</Card>
				<Card>
					{ featuresList }
				</Card>
				<Card>
					<HappinessSupport
						isJetpack={ false }
						isPlaceholder={ false } />
				</Card>
				{ selectedSite &&
					<Card href={ '/plans/compare/' + selectedSite.slug }>
						{ this.translate( 'Missing some features? Compare our different plans' ) }
					</Card>
				}
				<TrackComponentView eventName={ 'calypso_plans_my-plan_view' } />
			</Main>
		);
	}
} );

export default connect(
	( state ) => {
		return {
			selectedSite: getSelectedSite( state ),
			sitePlans: getPlansBySite( state, getSelectedSite( state ) ),
			currentPlan: getCurrentPlan( state, getSelectedSiteId( state ) )
		};
	},
	dispatch => ( {
		fetchSitePlans: siteId => dispatch( fetchSitePlans( siteId ) )
	} ),
	( stateProps, dispatchProps ) => {
		function fetchPlans( props = stateProps ) {
			if (
				props.selectedSite &&
				! props.sitePlans.hasLoadedFromServer &&
				! props.sitePlans.isRequesting
			) {
				dispatchProps.fetchSitePlans( props.selectedSite.ID );
			}
		}

		return Object.assign( { fetchPlans }, stateProps );
	}
)( PlanDetailsComponent );
