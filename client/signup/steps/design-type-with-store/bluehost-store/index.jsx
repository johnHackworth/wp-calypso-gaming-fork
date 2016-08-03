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
import { abtest } from 'lib/abtest';
import { localize } from 'i18n-calypso';

function redirectToPartner() {
	if ( 'bluehostWithWoo' === abtest( 'signupStoreBenchmarking' ) ) {
		window.location.href = 'https://www.bluehost.com/web-hosting/signup?flow=woocommerce';
	} else {
		window.location.href = 'https://www.bluehost.com/wordpress';
	}
}

function getPrice() {
	return 'bluehost' === abtest( 'signupStoreBenchmarking' ) ? '$3.95' : '$12.95';
}

export const BluehostStoreStep = props => {
	const { translate } = props;

	return (
		<div>
			<StepHeader
				headerText={ translate( 'Create a WordPress Store' ) }
				subHeaderText={ translate( 'Our partners at BlueHost and WooCommerce are here for you' ) }
			/>

			<div className="design-type-with-store__container">
				<div className="design-type-with-store__copy">
					<img src="/calypso/images/signup/bluehost-logo.png" className="design-type-with-store__bluehost-logo" />
					{ translate(
						'We\'ve partnered with BlueHost, a top-notch WordPress hosts ' +
						'with a knack for building great e-commerce stores using WooCommerce.'
					) }
				</div>

				<div className="design-type-with-store__form">
					<span className="design-type-with-store__price-text"> { translate( 'Starting at' ) } </span>
					<span className="design-type-with-store__price"> <b>{ getPrice() }</b>/mo </span>
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

export default localize( BluehostStoreStep );
