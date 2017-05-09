import React from 'react';
import Button from './common/button';
import Form from './common/form';
import TextArea from './common/textarea';

export default class EditView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			groups: []
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
									<Button onClick={this.addProject.bind(this, groupIndex)}>Add Project</Button>
								</div>
								{(group.items || []).map( (project, projectIndex) => (
									<div key={'project'+projectIndex}>
										<Button onClick={this.addSkill.bind(this, groupIndex, projectIndex)}>Add Skill</Button>
										<TextArea placeholder="Input your data" value="initial text" />

										<div>{(project.skills || []).map( (skill, i) => <span key={i}>{skill.name}</span> )}</div>
									</div>
								) )}
							</div>
						) )
					}
			</div>
		);
	}
}