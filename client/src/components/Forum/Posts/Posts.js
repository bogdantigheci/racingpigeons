import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../../actions/post';
import Spinner from '../../utils/Forum/Spinner';
import PostFeed from './PostFeed';
import PostForm from './PostForm';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    let postContent;
    if (this.props.posts === null) {
      postContent = <Spinner />;
    } else {
      // console.log('pooosts', this.props.posts);
      postContent = <PostFeed posts={this.props.posts} />;
    }
    return (
      <div>
        <PostForm />
        {postContent}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  posts: state.post
});
const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
