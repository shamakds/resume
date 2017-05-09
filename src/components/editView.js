import React from 'react';
import Button from './common/button';
import Form from './common/form';
import TextArea from './common/textarea';

export default class EditView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			groups: this.props.data || []
		};
	};
	addGroup() {
		let groups = this.state.groups;
		groups.push({
			name: '',
			items: []
		});
		this.setState({
			groups: groups
		});
	};
	removeGroup(groupIndex) {
		let groups = this.state.groups,
			group = groups.splice(groupIndex, 1);

		this.setState({
			groups: groups
		});	
	};
	addProject(groupIndex) {
		if(Number(groupIndex) == NaN) {
			return;
		}
		let groups = this.state.groups;
		groups[groupIndex].items.push({
			name: '',
			info: '',
			skills: [],
			date: {}
		});

		this.setState({
			groups: groups
		});
	};
	setProjectData(groupIndex, projectIndex, value, key) {
		let groups = this.state.groups,
			group = groups[groupIndex],
			project = group.items[projectIndex];

		project[key] = value;

		this.setState({
			groups: groups
		});
	};
	removeProject(groupIndex, projectIndex) {
		let groups = this.state.groups,
			group = groups[groupIndex],
			project = group.items.splice(projectIndex, 1);

		this.setState({
			groups: groups
		});	
	};
	addSkill(groupIndex, projectIndex) {
		if(Number(groupIndex) == NaN || Number(projectIndex) == NaN) {
			return;
		}
		let groups = this.state.groups,
			group = groups[groupIndex];

		group.items[projectIndex].skills.push({
			name: 'SKILL'
		});

		this.setState({
			groups: groups
		});	
	};
	removeSkill(groupIndex, projectIndex, skillIndex) {
		let groups = this.state.groups,
			group = groups[groupIndex],
			project = group.items[projectIndex],
			skill = project.skills.splice(skillIndex, 1);

		this.setState({
			groups: groups
		});
	};
	render() {
		return (
			<div>
				<h3>Edit</h3>
				<div>
					<Button onClick={this.addGroup.bind(this)}>Add Company</Button>
				</div>			
					{
						(this.state.groups || []).map( (group, groupIndex) => (
							<div key={'company'+groupIndex}>
								<h4>Company {groupIndex}</h4>
								<div>
									<Button onClick={this.removeGroup.bind(this, groupIndex)}>Remove Group</Button>
									<Button onClick={this.addProject.bind(this, groupIndex)}>Add Project</Button>
								</div>
								{(group.items || []).map( (project, projectIndex) => (
									<div key={'project'+projectIndex}>
										<input onChange={ (event) => this.setProjectData(groupIndex, projectIndex, event.target.value, 'name') } 
											value={ project.name } placeholder="Project name" />
										<Button onClick={this.removeProject.bind(this, groupIndex, projectIndex)}>Remove Project</Button>
										<Button onClick={this.addSkill.bind(this, groupIndex, projectIndex)}>Add Skill</Button>
										<div>{(project.skills || []).map( (skill, skillIndex) => (
											<span key={skillIndex}>
												{skill.name}
												<span onClick={this.removeSkill.bind(this, groupIndex, projectIndex, skillIndex)}> (remove)</span>
											</span>
										) )}</div>
										<TextArea onChange={ (event) => this.setProjectData(groupIndex, projectIndex, event.target.value, 'info') }
											value={project.info} />
									</div>
								) )}
							</div>
						) )
					}
			</div>
		);
	}
}