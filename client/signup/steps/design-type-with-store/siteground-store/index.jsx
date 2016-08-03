/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Gridicon from 'components/gridicon';
import FormButton from 'components/forms/form-button';
import StepHeader from 'signup/step-header';
import Button from 'components/button';
import { localize } from 'i18n-calypso';
import analytics from 'lib/analytics';

import SitegroundLogo from './siteground-logo';

function redirectToPartner() {
	analytics.tracks.recordEvent( 'calypso_triforce_partner_redirect', { partner_name: 'Siteground' } );

	window.open( 'https://www.siteground.com/woocommerce/step1.htm' );
}

export const SitegroundStoreStep = props => {
	const { translate } = props;

	return (
		<div>
			<StepHeader
				headerText={ translate( 'Create a WordPress Store' ) }
				subHeaderText={ translate( 'Our partners at SiteGround and WooCommerce are here for you' ) }
			/>

			<div className="design-type-with-store__container">
				<div className="design-type-with-store__copy">
					<SitegroundLogo />
					<div className="design-type-with-store__text">
						{ translate(
							'We\'ve partnered with SiteGround, a top-notch WordPress hosts ' +
							'with a knack for building great e-commerce stores using WooCommerce.'
						) }
					</div>
				</div>

				<div className="design-type-with-store__form">
					<span className="design-type-with-store__price-text"> { translate( 'Starting at' ) } </span>
					<span className="design-type-with-store__price"> <b>$3.95</b>/mo </span>
					<FormButton className="design-type-with-store__form-submit" onClick={ redirectToPartner }>
						{ translate( 'Create Store' ) }
					</FormButton>
				</div>
			</div>

			<div className="design-type-with-store__back-button-wrapper">
				<Button compact borderless onClick={ props.onBackClick }>
					<Gridicon icon="arrow-left" size={ 18 } />
					{ translate( 'Back' ) }
				</Button>
			</div>
		</div>
	);
};

export default localize( SitegroundStoreStep );
