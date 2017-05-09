import React from 'react';
import Button from './common/button';

export default class Navigation extends React.Component {
	render() {
		return (
			<div {...this.props}>
				<Button onClick={this.props.onChange('prev')}>Go Back</Button>
				<Button onClick={this.props.onChange('next')}>Go Next</Button>
			</div>
		);
	}
}