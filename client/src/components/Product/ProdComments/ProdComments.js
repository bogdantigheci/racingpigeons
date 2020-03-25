import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProdCommentFeed from './ProdCommentFeed';
import ProdCommentForm from './ProdCommentForm';

class ProdComments extends Component {
  render() {
    return (
      <div>
        <hr></hr>
        <h3 className='reviews_title'>Reviews</h3>
        {this.props.user.userData.isAuth ? (
          <ProdCommentForm prodId={this.props.prodId} />
        ) : null}
        <ProdCommentFeed
          comments={this.props.comments}
          prodId={this.props.prodId}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(ProdComments);
