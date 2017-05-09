import React from 'react';
import Button from './common/button';

export default class Navigation extends React.Component {
	render() {
		return (
			<div>
				<Button onClick={this.props.switchView.bind(this, 'goBack')}>Go Back</Button>
				<Button onClick={this.props.switchView.bind(this, 'goNext')}>Go Next</Button>
			</div>
		);
	}
}