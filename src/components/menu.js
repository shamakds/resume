import React from 'react';
import Button from './common/button';
import Dropdown from './common/dropdown'; 

export default class Menu extends React.Component {
	render() {
		return (
			<div>
				<Button onClick={this.props.doBackup}>Save</Button>
			</div>
		);
	}
}