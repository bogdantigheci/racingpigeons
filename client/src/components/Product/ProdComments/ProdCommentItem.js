import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../utils/Forum/TextAreaFieldGroup';
import {
  deleteCommentFromProduct,
  editCommentFromProduct
} from '../../../actions/product';

class ProdCommentItem extends Component {
  state = {
    text: this.props.comment.text,
    edit: false
  };

  handleDeleteCommentFromProduct(productId, commentId) {
    this.props.deleteCommentFromProduct(productId, commentId);
  }
  handleEditCommentFromProduct(productId, commentId, editCommentData) {
    editCommentData = {
      text: this.state.text,
      user: this.props.user.userData.id,
      name: this.props.user.userData.name
    };

    this.props.editCommentFromProduct(productId, commentId, editCommentData);
    this.setState({ edit: false });
  }
  handleEdit() {
    this.setState({ edit: true });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    //console.log('comment item props', this.props);
    // console.log('11111111111111111', this.props.comment.user);
    // console.log('222222222222222222', this.props.user.userData.id);

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
                    type="submit"
                    onClick={this.handleEditCommentFromProduct.bind(
                      this,
                      this.props.prodId,
                      this.props.comment._id,
                      this.state.text
                    )}
                  >
                    Save
                  </button>
                </div>
              ) : (
                this.props.comment.text
              )}
              <span className="delbtn">
                {this.props.comment.user === this.props.user.userData.id ? (
                  <div>
                    <button
                      onClick={this.handleDeleteCommentFromProduct.bind(
                        this,
                        this.props.prodId,
                        this.props.comment._id
                      )}
                      type="button"
                      className="btn btn-danger mr-1"
                    >
                      <i className="fas fa-times" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary mr-1"
                      onClick={() => this.handleEdit()}
                    >
                      Edit
                    </button>
                  </div>
                ) : null}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  deleteCommentFromProduct: (productId, commentId) =>
    dispatch(deleteCommentFromProduct(productId, commentId)),
  editCommentFromProduct: (productId, commentId, editCommentData) =>
    dispatch(editCommentFromProduct(productId, commentId, editCommentData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProdCommentItem);
