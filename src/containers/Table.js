import React, { Component } from 'react';
import Post from './Post';
import './Table.css';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';

const List = SortableContainer(({ posts, onDismiss }) => {
	return (
		<div>
			{posts.map((post, index) => <Post key={`post-${index}`} onDismiss={onDismiss} index={index} post={post} />)}
		</div>
	);
});

class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			error: null,
			isLoading: false,
		};

		this.onDismiss = this.onDismiss.bind(this);
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		const { posts } = this.state;

		this.setState({
			posts: arrayMove(posts, oldIndex, newIndex),
		});
	};

	onDismiss(id) {
		const isNotId = post => post.objectID !== id;
		const updatedHits = this.state.posts.filter(isNotId);

		this.setState({
			posts: updatedHits,
		});
	}

	render() {
		const { posts, isLoading, error } = this.state;

		if (error) {
			return <p>{error.message}</p>;
		}

		if (isLoading) {
			return <p>Loading...</p>;
		}
		return (
			<div className="table">
				<div className="table-header">
					<span style={{ width: '20%' }}>Author</span>
					<span style={{ width: '80%' }}>Title</span>
				</div>
				<List onDismiss={this.onDismiss} posts={posts} onSortEnd={this.onSortEnd} useDragHandle={true} />
			</div>
		);
	}

	componentDidMount() {
		this.setState({ isLoading: true });

		fetch(`https://hn.algolia.com/api/v1/search?query=redux`)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Somethimg went wrong ...');
				}
			})
			.then(result => this.setState({ posts: result.hits, isLoading: false }))
			.catch(error => this.setState({ error, isLoading: false }));
	}
}
export default Table;
