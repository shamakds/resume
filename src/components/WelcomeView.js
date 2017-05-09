import React from 'react';
import Button from './common/button';


export default class WelcomeView extends React.Component {
	render() {
		return (
			<div>
				<h3>Welcome</h3>
				<div>
					<Button>New Resume</Button>
					<Button>Load from File</Button>
				</div>
			</div>
		);
	}
}