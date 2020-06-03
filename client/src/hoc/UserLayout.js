import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

const UserLayout = (props) => {
  const { t } = props;
  const links = [
    {
      name: t('My account'),
      linkTo: '/user/dashboard',
    },
    {
      name: t('User information'),
      linkTo: '/user/user_profile',
    },
    {
      name: t('My cart'),
      linkTo: '/user/cart',
    },
    {
      name: t('Sell request'),
      linkTo: '/user/sell_request',
    },
    {
      name: t('Sell requests'),
      linkTo: '/user/sell_requests',
    },
  ];

  const admin = [
    {
      name: t('App info'),
      linkTo: '/admin/site_info',
    },
    {
      name: t('Add pigeons'),
      linkTo: '/admin/add_product',
    },
    {
      name: t('Manage categories'),
      linkTo: '/admin/manage_categories',
    },
    {
      name: t('Add races'),
      linkTo: '/admin/add_races',
    },
    {
      name: t('Sell requests'),
      linkTo: '/admin/sell_requests',
    },
    {
      name: t('Orders'),
      linkTo: '/admin/orders',
    },
  ];

  const generateLinks = (links) =>
    links.map((item, i) => (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    ));

  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>{t('My account')}</h2>
          <div className="links">{generateLinks(links)}</div>
          {props.user.userData.isAdmin ? (
            <div>
              <h2>{t('Admin')}</h2>
              <div className="links">{generateLinks(admin)}</div>
            </div>
          ) : null}
        </div>
        <div className="user_right">{props.children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withNamespaces()(connect(mapStateToProps)(UserLayout));
