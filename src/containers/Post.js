import React, { Component } from 'react';
import Button from '../components/Button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAlignJustify } from '@fortawesome/fontawesome-free-solid';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <FontAwesomeIcon icon={faAlignJustify} className="faAlignJustify" />);

class Post extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isEdit: false,
		};

		this.osEdit = this.onEdit.bind(this);
	}

	onEdit(id) {
		this.setState({
			isEdit: true,
		});
	}

	render() {
		const { post, onDismiss } = this.props;
		const isEdit = this.state.isEdit;
		return (
			<div post={post} className="table-row">
				<DragHandle />
				<span style={{ width: '20%' }}>{post.author}</span>
				{isEdit ? (
					<span style={{ width: '75%' }}>asdad</span>
				) : (
					<span style={{ width: '75%' }}>{post.title}</span>
				)}
				<Button onClick={() => this.onEdit(post.objectID)} className="button">
					Edit
				</Button>
				<Button onClick={() => onDismiss(post.objectID)} className="button">
					Delete
				</Button>
			</div>
		);
	}
}

export default SortableElement(Post);
