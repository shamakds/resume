import React from 'react';
import _ from 'underscore';
import Button from './common/button';
import Form from './common/form';
import TextArea from './common/textarea';

class Company extends React.Component {
	constructor(props) {
		super(props);
		this.state = _.extend({
            name: '',
            items: []
        }, this.props.data);
	};
	setData(value, key) {
		this.state[key] = value;
        this.update(this.state);
	};
	addItem() {
		this.state.items.push({
			name: '',
			info: '',
			items: [],
			date: {}
		});
        this.update(this.state);
	};
	updateItem(index, data) {
		this.state.items[index] = data;
        this.update(this.state);
	};
	removeItem(index) {
		this.state.items.splice(index, 1);
        this.update(this.state);
	};
    update(data) {
        this.props.update && this.props.update(data);
    };
	render() {
		return (
			<div>
				<input onChange={ (event) => this.setData(event.target.value, 'name') } value={ this.state.name } placeholder="Company name" />

				<div className="z--mv-x">
					<Button>Edit</Button>
					<Button>Cancel</Button>
					<Button onClick={ this.props.remove }>Remove Group</Button>
					<Button onClick={ this.addItem.bind(this) }>Add Project</Button>
				</div>

				{(this.state.items || []).map( (item, index) => (
					<Project key={'project_'+ index} data={ item }
							 update={ this.updateItem.bind(this, index) }
							 remove={ this.removeItem.bind(this, index) } />
				) )}
           </div>
		)
	}
}
class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state = _.extend({
            items: []
        }, this.props.data);
	};
	setData(value, key) {
		this.state[key] = value;
        this.update(this.state);
	};
	addItem() {
		this.state.items.push({ name: ''});
        this.update(this.state);
	};
	updateItem(index, data) {
		this.state.items[index] = data;
        this.update(this.state);
	};
	removeItem(index) {
		this.state.items.splice(index, 1);
        this.update(this.state);
	};
    update(data) {
        this.props.update && this.props.update(data);
    };
	render() {
		return (<div className="z--ml-x z--mv-x">
			<div><input onChange={ (event) => this.setData(event.target.value, 'name') } value={ this.state.name } placeholder="Project name" /></div>
			<div className="z--mv-x">
				<Button onClick={ this.addItem.bind(this) }>Add Skill</Button>
				<Button onClick={ this.props.remove }>Remove Project</Button>
			</div>
			<div>
				{(this.state.items || []).map( (item, index) => (
					<Skill key={'skill_' + index} data={ item }
						   update={ this.updateItem.bind(this, index) }
						   remove={ this.removeItem.bind(this, index) } />
				) )}
			</div>
			<TextArea placeholder="Description" className="z--sw-1" onChange={ (event) => this.setData(event.target.value, 'info') } value={ this.state.info } />
		</div>);
	};
}
class Skill extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.data || {};
	};
	setData(value, key) {
		this.state[key] = value;
        this.update(this.state);
	};
    update(data) {
        this.props.update && this.props.update(data);
    };
	render() {
		return (
			<span>
				<input onChange={ (event) => this.setData(event.target.value, 'name') } value={ this.state.name } placeholder="Skill name" />
				<span onClick={this.props.remove}> (remove)</span>
			</span>
		);
	}
}

export default class EditView extends React.Component {
	constructor(props) {
		super(props);
		this.state = Array.isArray(this.props.data) ? {
			items: this.props.data
		} : this.props.data || { items: [] };
	};
	addItem() {
		let items = this.state.items;
		items.push({ name: '', items: []});
		this.setState({ items });
	};
	updateItem(index, data) {
		let items = this.state.items || [];
		items[index] = data;
		this.setState({ items });
	};
	removeItem(index) {
		let items = this.state.items;
		items.splice(index, 1);
		this.setState({ items });
	};
    onSubmit(event) {
        event.preventDefault();
        this.update();
    };
    update() {
        this.props.update && this.props.update(this.state);
	};
	render() {
		return (
			<div>
				<h3>Edit</h3>
				<form className="z--d-ib" onSubmit={ this.onSubmit.bind(this) }>
				<div className="z--mb-m">
					<Button type="submit">Save</Button>
					<Button onClick={ this.addItem.bind(this) }>Add Company</Button>
				</div>{
					(this.state.items || []).map( (item, index) => ( <Company key={'company'+ index} data={item}
																			  update={ this.updateItem.bind(this, index) }
																			  remove={ this.removeItem.bind(this, index) } />) )
				}</form>
			</div>
		);
	}
}
