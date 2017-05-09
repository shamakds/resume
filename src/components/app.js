import React from 'react';
import Navigation from './navigation';
import View from './view';
import Menu from './menu';

const ViewMap = [{
	  	name: 'welcome'
	  }, {
	  	name: 'edit'
	  }, {
	  	name: 'theame'
	  }, {
	  	name: 'preview'
	  }];

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeViewIndex: 0
		};
	};

	getActiveViewName() {
		return ViewMap[this.state.activeViewIndex].name;
	};
	switchView(dir) { 
		let _dir,
			activeViewIndex = this.state.activeViewIndex,
			index;

		switch(dir) {
			case 'next':
				_dir = 1;
				break;
			case 'prev':
				_dir = -1;
				break;
			default:
				_dir = 0;
		}

		if(!dir) {
			return;
		}

		index = activeViewIndex + dir;
		if(index < 0) {
			index = ViewMap.length - 1;
		} else if(index >= ViewMap.length) {
			index = 0;
		}

		this.setState({
			activeViewIndex: index
		});
	};

	render() {
		return (
			<div className="r--wrap">
				<Navigation onChange={ ()=>{} } />
				<View activeView={this.getActiveViewName()} />
				<Menu />
			</div>
		);
	}
}