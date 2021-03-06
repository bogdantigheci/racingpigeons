import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostItem from '../Posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../../utils/Forum/Spinner';
import { getPost } from '../../../actions/post';
import { withNamespaces } from 'react-i18next';

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    let postContent;

    if (
      this.props.post === [] ||
      this.props.post.loading ||
      Object.keys(this.props.post).length === 0
    ) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={this.props.post.post} showActions={false} />
          <CommentForm />
          {this.props.post.post._id && this.props.post.post.comments && (
            <CommentFeed
              postId={this.props.post.post._id}
              comments={this.props.post.post.comments}
            />
          )}
        </div>
      );
    }
    const { t } = this.props;
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/forum" className="btn btn-primary mb-3">
                {t('Back to forum')}
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.post,
});

const mapDispatchToProps = (dispatch) => ({
  getPost: (id) => dispatch(getPost(id)),
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(Post)
);
