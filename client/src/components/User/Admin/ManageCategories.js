import React from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../hoc/UserLayout';
import ManageBreeds from './ManageBreeds';
import ManageBreeders from './ManageBreeders';
import { withNamespaces } from 'react-i18next';

const ManageCategories = (props) => {
  const { t } = props;
  return (
    <div>
      <UserLayout>
        {props.user.userData.isAdmin ? (
          <React.Fragment>
            <ManageBreeders />
            <ManageBreeds />
          </React.Fragment>
        ) : (
          <div className="not_allowed_here">
            {t('You are not allowed here')}
          </div>
        )}
      </UserLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withNamespaces()(connect(mapStateToProps)(ManageCategories));
