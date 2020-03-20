import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../utils/Forum/TextAreaFieldGroup';
import { addComment } from '../../../actions/post';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const newComment = {
      text: this.state.text,
      name: this.props.user.userData.name,
      user: this.props.user.userData.id
    };

    this.props.addComment(this.props.post.post._id, newComment);
    this.setState({ text: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  post: state.post
});
const mapDispatchToProps = dispatch => ({
  addComment: (postId, newComment) => dispatch(addComment(postId, newComment))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
