import React from 'react';
import WelcomeView from './WelcomeView';
import EditView from './editView';
import TheameView from './TheameView';
import PreviewView from './PreviewView';

export default class View extends React.Component {
	getActiveViewComponent() {
		let acviteView = this.props.activeView,
			template;

		switch(acviteView) {
			case 'welcome':
				template = <WelcomeView />;
				break;
			case 'edit':
				template = <EditView />;
				break;
			case 'theame':
				template = <TheameView />;
				break;
			case 'preview':
				template = <PreviewView />;
				break;
		}

		return template;
	};
	render() {
		return (
			<div>
			{
				this.getActiveViewComponent()
			}
			</div>
		);
	}
}