import React from 'react';
import Button from './common/button';


export default class WelcomeView extends React.Component {
	loadFromFile() {
		this.props.navigateTo('theame');
	};
	render() {
		return (
			<div>
				<h3>Welcome</h3>
				<div>
					<Button onClick={this.props.navigateTo.bind(this, 'edit')}>New Resume</Button>
					<Button onClick={this.loadFromFile.bind(this)}>Load from File</Button>
				</div>
			</div>
		);
	}
}