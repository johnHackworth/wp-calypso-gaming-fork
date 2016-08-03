
/**
 * External dependencies
 */
import React from 'react';
import PureRenderMixin from 'react-pure-render/mixin';

/**
 * Internal dependencies
 */
import TooltipComponent from 'components/tooltip';

const Tooltip = React.createClass( {
	mixins: [ PureRenderMixin ],

	getInitialState: function() {
		return {
			position: 'bottom left',
			show: true,
		};
	},

	open() {
		this.setState( { show: true } );
	},

	close() {
		this.setState( { show: false } );
	},

	render() {
		const size = 20;

		return (
			<div className="docs__design-assets-group">
				<h2>
					<a href="/devdocs/design/tooltip">Tooltip</a>
				</h2>

				<div>
					tooltip context&nbsp;
					<span
						style={ {
							width: size,
							height: size,
							lineHeight: `${ size }px`,
							display: 'inline-block',
							borderRadius: parseInt( size / 2 ),
							backgroundColor: '#444',
							color: 'white',
							fontSize: '12px',
							cursor: 'pointer',
							textAlign: 'center',
						} }
						onMouseEnter={ this.open }
						onMouseLeave={ this.close }
						ref="tooltip-reference"
					>
						T
					</span>

					<TooltipComponent
						isVisible={ this.state.show }
						onClose={ this.close }
						position={ this.state.position }
						context={ this.refs && this.refs[ 'tooltip-reference' ] }
					>
						<div style={ { padding: '10px' } }>
							Simple Tooltip Instance
						</div>
					</TooltipComponent>
				</div>
			</div>
		);
	}
} );

export default Tooltip;
