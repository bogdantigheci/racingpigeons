import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProdCommentFeed from './ProdCommentFeed';
import ProdCommentForm from './ProdCommentForm';
import { withNamespaces } from 'react-i18next';

class ProdComments extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <hr></hr>
        <h3 className="reviews_title">{t('Comments')}</h3>
        {this.props.user.userData.isAuth ? (
          <ProdCommentForm prodId={this.props.prodId} />
        ) : null}
        <ProdCommentFeed
          comments={this.props.comments}
          prodId={this.props.prodId}
          auth={this.props.user.userData.isAuth}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });

export default withNamespaces()(connect(mapStateToProps)(ProdComments));
