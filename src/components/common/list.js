import React from 'react';

class ListItem extends React.Component {
	render() {
		return (
			<li {...this.props}></li>
		);
	}
};

export default class List extends React.Component {
	render() {
		return (
			<ul {...this.props}></ul>
		);
	}
}