import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../utils/Forum/TextAreaFieldGroup';
import { deleteComment, editComment } from '../../../actions/post';
import { withNamespaces } from 'react-i18next';

class CommentItem extends Component {
  state = {
    text: this.props.comment.text,
    edit: false,
  };
  handleDeleteComment(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  handleEditCommentFromPost(postId, commentId, editCommentData) {
    editCommentData = {
      text: this.state.text,
      user: this.props.user.userData.id,
      name: this.props.user.userData.name,
    };

    this.props.editComment(postId, commentId, editCommentData);
    this.setState({ edit: false });
  }
  handleEdit() {
    this.setState({ edit: true });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { t } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <p className="text-center">{this.props.comment.name}</p>
          </div>
          <div className="col-md-10">
            <div className="lead">
              {this.state.edit ? (
                <div>
                  <TextAreaFieldGroup
                    placeholder="Edit text"
                    name="text"
                    value={this.state.text}
                    onChange={this.onChange.bind(this)}
                  />
                  <button
                    className="btn btn-primary mr-1 mb-3"
                    type="submit"
                    onClick={this.handleEditCommentFromPost.bind(
                      this,
                      this.props.postId,
                      this.props.comment._id,
                      this.state.text
                    )}
                  >
                    {t('Save')}
                  </button>
                </div>
              ) : (
                this.props.comment.text
              )}
            </div>
            {this.props.comment.user === this.props.user.userData.id ||
            this.props.user.userData.isAdmin ? (
              <div>
                <button
                  onClick={this.handleDeleteComment.bind(
                    this,
                    this.props.postId,
                    this.props.comment._id
                  )}
                  type="button"
                  className="btn btn-danger mr-1 mt-0"
                >
                  <i className="fas fa-times" />
                </button>
                <button
                  type="button"
                  className="btn btn-primary mr-1"
                  onClick={() => this.handleEdit()}
                >
                  {t('Edit')}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  deleteComment: (postId, commentId) =>
    dispatch(deleteComment(postId, commentId)),
  editComment: (postId, commentId, editCommentData) =>
    dispatch(editComment(postId, commentId, editCommentData)),
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(CommentItem)
);
