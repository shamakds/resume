import React from 'react';
import { Dispatcher } from 'flux';
import _ from 'underscore';
import Navigation from './navigation';
import View from './view';
import Menu from './menu';

const dispatcher = new Dispatcher();
const ViewMap = [{
	  	name: 'welcome'
	  }, {
	  	name: 'edit'
	  }, {
	  	name: 'theame'
	  }, {
	  	name: 'preview'
	  }];
const BackupKey = "RESUME_BACKUP";
let backup = JSON.parse(localStorage.getItem(BackupKey));

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeViewIndex: 0
		};
		this.data = [];
		this.handlers = {
			switchView: (type) => {
				dispatcher.dispatch({
					type: type
				});
			},
			navigateTo: (name) => {
				dispatcher.dispatch({
					type: 'navigateTo',
					data: name
				});
			},
			setData: (data) => {
				dispatcher.dispatch({
					type: 'data',
					data: data
				});
			},
			doBackup: () => {
				dispatcher.dispatch({
					type: 'backup'
				});
			}
		};
	};
	componentDidMount() {
		if(backup) {
			this.backup = backup;
			this.setData(backup.data);
			this.navigateTo(backup.view);
		}

	    dispatcher.register( dispatch => {
	    	switch(dispatch.type) {
	    		case 'goNext':
	    			this.switchView('next');
	    			break;
    			case 'goBack':
    				this.switchView('prev');
	    			break;
    			case 'navigateTo':
	    			this.navigateTo(dispatch.data);
	    			break;
    			case 'data':
    				this.setData(dispatch.data);
	    			break;
    			case 'backup':
    				this.doBackup();
	    			break;
	    	}
	    });
	};
	getActiveViewName() {
		return ViewMap[this.state.activeViewIndex || 0].name;
	};
	doBackup() {
		console.info('do backup');
		let backup = {
			data: this.data,
			view: this.getActiveViewName()
		};
		localStorage.setItem(BackupKey, JSON.stringify(backup));
	};
	setData(data) {
		this.data = data || [];
	};
	switchView(dir) { 
		let _dir, index,
			activeViewIndex = this.state.activeViewIndex;

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

		if(!_dir) {
			return;
		}

		index = activeViewIndex + _dir;
		if(index < 0) {
			index = ViewMap.length - 1;
		} else if(index >= ViewMap.length) {
			index = 0;
		}

		this.setState({
			activeViewIndex: index
		});
	};
	navigateTo(viewName) {
		let view = _.find(ViewMap, (item) => (item.name === viewName) ),
			index = view ? ViewMap.indexOf(view) : -1;
		
		if(index == -1) {
			return;
		}

		this.setState({
			activeViewIndex: index
		});
	};
	componentDidUpdate() {
		this.doBackup();
	};
	render() {
		return (
			<div className="r--wrap">
				<Menu doBackup={ this.handlers.doBackup } navigateTo={ this.handlers.navigateTo } />
				<Navigation switchView={ this.handlers.switchView } />
				<View data={this.data} setData={ this.handlers.setData } navigateTo={ this.handlers.navigateTo } activeView={this.getActiveViewName()} />
			</div>
		);
	};
}