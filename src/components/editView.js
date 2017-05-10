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
        this.setState(this.state);
	};
	addItem() {
		this.state.items.push({
			name: '',
			info: '',
			items: [],
			date: {}
		});
        this.setState(this.state);
	};
	updateItem(index, data) {
		this.state.items[index] = data;
        this.setState(this.state);
	};
	removeItem(index) {
		this.state.items.splice(index, 1);
        this.setState(this.state);
	};
    update(data) {
        this.props.update && this.props.update(data);
    };
    onSubmit(event) {
        event.preventDefault();
        this.update(this.state);
    };
	render() {
		return (
			<div><form onSubmit={ this.onSubmit.bind(this) }>
                <Button type="submit">Save</Button>
				<input onChange={ (event) => this.setData(event.target.value, 'name') } value={ this.state.name } placeholder="Project name" />
				<div>
					<Button onClick={ this.props.remove }>Remove Group</Button>
					<Button onClick={ this.addItem.bind(this) }>Add Project</Button>
				</div>
				{(this.state.items || []).map( (item, index) => (
					<Project key={'project_'+ index} data={ item }
							 update={ this.updateItem.bind(this, index) }
							 remove={ this.removeItem.bind(this, index) } />
				) )}
            </form></div>
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
		return (<div>
			<input onChange={ (event) => this.setData(event.target.value, 'name') } value={ this.state.name } placeholder="Project name" />
			<Button onClick={ this.props.remove }>Remove Project</Button>
			<Button onClick={ this.addItem.bind(this) }>Add Skill</Button>
			<div>
				{(this.state.items || []).map( (item, index) => (
					<Skill key={'skill_' + index} data={ item }
						   update={ this.updateItem.bind(this, index) }
						   remove={ this.removeItem.bind(this, index) } />
				) )}
			</div>
			<TextArea onChange={ (event) => this.setData(event.target.value, 'info') } value={ this.state.info } />
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
		this.state = this.props.data || {
			items: []
		};
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
	componentDidUpdate() {
        this.props.update && this.props.update(this.state);
    }
	render() {
		return (
			<div>
				<h3>Edit</h3>
				<div>
					<Button onClick={ this.addItem.bind(this) }>Add Company</Button>
				</div>{
					(this.state.items || []).map( (item, index) => ( <Company key={'company'+ index} data={item}
																			  update={ this.updateItem.bind(this, index) }
																			  remove={ this.removeItem.bind(this, index) } />) )
				}</div>
		);
	}
}