import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deletePost,
  addLike,
  removeLike,
  getPost,
} from '../../../actions/post';
import { withNamespaces } from 'react-i18next';

class PostItem extends Component {
  handledeletePost(id) {
    this.props.deletePost(id);
  }
  handleLikePost(id) {
    this.props.getPost(id);
    this.props.addLike(id);
  }
  handleUnikePost(id) {
    this.props.getPost(id);
    this.props.removeLike(id);
  }
  checkUserLike(likes) {
    if (
      likes.filter((like) => like.user === this.props.user.userData.id).length >
      0
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <p className="text-center">{this.props.post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{this.props.post.text}</p>
            {this.props.showActions ? (
              <span>
                <button
                  onClick={this.handleLikePost.bind(this, this.props.post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={
                      this.props.errors &&
                      this.props.post.likes &&
                      this.checkUserLike(this.props.post.likes)
                        ? 'fas fa-thumbs-up text-info no_like_allowed'
                        : 'fas fa-thumbs-up text-info'
                    }
                  />
                  <span className="badge badge-light">
                    {this.props.post.likes.length}
                  </span>
                </button>
                <button
                  onClick={this.handleUnikePost.bind(this, this.props.post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                  <span className="badge badge-light"></span>
                </button>
                <Link
                  to={`forum/post/${this.props.post._id}`}
                  className="btn btn-primary mr-1"
                >
                  {t('Comments')}
                </Link>
                {this.props.post.user === this.props.user.userData.id ||
                this.props.user.userData.isAdmin ? (
                  <button
                    onClick={this.handledeletePost.bind(
                      this,
                      this.props.post._id
                    )}
                    type="button"
                    className="btn btn-danger mr-1 mt-0"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
PostItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.post.errors,
});

const mapDispatchToProps = (dispatch) => ({
  deletePost: (id) => dispatch(deletePost(id)),
  addLike: (id) => dispatch(addLike(id)),
  removeLike: (id) => dispatch(removeLike(id)),
  getPost: (id) => dispatch(getPost(id)),
});
export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(PostItem)
);
