import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../utils/Forum/TextAreaFieldGroup';
import { addCommentToProduct } from '../../../actions/product';
import { withNamespaces } from 'react-i18next';

class ProdCommentForm extends Component {
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

    const newComment = {
      text: this.state.text,
      name: this.props.user.userData.name,
      user: this.props.user.userData.id,
    };

    this.props.addCommentToProduct(this.props.prodId, newComment);
    this.setState({ text: '' });
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
            {t('Make a comment...')}
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder={t('Reply to post')}
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                />
                {this.props.product && this.props.product.errors ? (
                  <div className="form_error">
                    {t('Comment must be between 2 and 10000 characters')}
                  </div>
                ) : null}
              </div>
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
  product: state.product,
});
const mapDispatchToProps = (dispatch) => ({
  addCommentToProduct: (prodId, newComment) =>
    dispatch(addCommentToProduct(prodId, newComment)),
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(ProdCommentForm)
);
