import React from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../utils/Forum/TextAreaFieldGroup';
import { addComment } from '../../../actions/post';
import { withNamespaces } from 'react-i18next';

const CommentForm = (props) => {
  const [text, setText] = React.useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      text: text,
      name: props.user.userData.name,
      user: props.user.userData.id,
    };

    props.addComment(props.post.post._id, newComment);
    setText('');
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const { t } = props;
  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-primary text-white">
          {t('Make a comment...')}
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder={t('Reply to post')}
                name="text"
                value={text}
                onChange={onChange}
              />
              {props.post.errors && (
                <div>
                  {props.post.errors.map((error, i) => (
                    <p key={i} className="form_error">
                      {error.text}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              {t('Submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  post: state.post,
});
const mapDispatchToProps = (dispatch) => ({
  addComment: (postId, newComment) => dispatch(addComment(postId, newComment)),
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(CommentForm)
);
