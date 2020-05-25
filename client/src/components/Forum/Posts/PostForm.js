import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../utils/Forum/TextAreaFieldGroup';
import { addPost, getPosts } from '../../../actions/post';
import { withNamespaces } from 'react-i18next';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const newPost = {
      text: this.state.text,
      name: this.props.user.userData.name,
      user: this.props.user.userData.id,
    };

    this.props.addPost(newPost);
    this.setState({ text: '' });
    this.props.getPosts();
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { t } = this.props;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-primary text-white">
            {t('Say Something...')}
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder={t('Create a post')}
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                />
              </div>
              {this.props.post.errors && (
                <div>
                  {this.props.post.errors.map((error, i) => (
                    <p key={i} className="form_error">
                      {error.text}
                    </p>
                  ))}
                </div>
              )}
              <button type="submit" className="btn btn-primary">
                {t('Submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  post: state.post,
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (postData) => dispatch(addPost(postData)),
  getPosts: () => dispatch(getPosts()),
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(PostForm)
);
