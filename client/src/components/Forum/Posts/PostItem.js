import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../../actions/post';
// import classnames from 'classnames';

class PostItem extends Component {
  handledeletePost(id) {
    this.props.deletePost(id);
    console.log('deleted');
  }

  handleLikePost(id) {
    this.props.addLike(id);
    console.log('liked');
  }
  handleUnikePost(id) {
    this.props.removeLike(id);
    console.log('rliked');
  }

  // findUserLikes(likes) {
  //   if (
  //     likes.filter(like => like.user === this.props.user.userData.id).length > 0
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    //console.log('this.props.post.likes', this.props.post.likes);
    // console.log('this.props.user.userData.id', this.props.user.userData.id);
    // console.log('this.props.post.name', this.props.post.post.name);
    // console.log('this.props.post.text', this.props.post.post.text);
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
                    className="fas fa-thumbs-up
                      text-info"
                  />
                  {/* <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(this.props.post.post.likes)
                    })}
                  /> */}
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
                  className="btn btn-info mr-1"
                >
                  Comments
                </Link>
                {this.props.post.user === this.props.user.userData.id ? (
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
  showActions: true
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id)),
  addLike: id => dispatch(addLike(id)),
  removeLike: id => dispatch(removeLike(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
