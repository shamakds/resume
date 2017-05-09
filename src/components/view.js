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
				template = <WelcomeView {...this.props} />;
				break;
			case 'edit':
				template = <EditView {...this.props} />;
				break;
			case 'theame':
				template = <TheameView {...this.props} />;
				break;
			case 'preview':
				template = <PreviewView {...this.props} />;
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