import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DrawerToggleButton from './DrawerToggleButton';
import { logoutUser } from '../../actions/user';
import ChangeLanguage from '../utils/changeLanguage';
import { withNamespaces } from 'react-i18next';

class Header extends Component {
  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        this.props.history.push('/register_login');
      }
    });
  };

  cartLink = (item, i) => {
    const user = this.props.user.userData;

    return (
      <div className="cart_link" key={i}>
        <span>{user.cart ? user.cart.length : 0}</span>
        <Link to={item.linkTo}>{item.name}</Link>
      </div>
    );
  };

  defaultLink = (item, i) =>
    item.linkTo === '/user/logout' ? (
      <div
        className="log_out_link"
        key={i}
        onClick={() => this.logoutHandler()}
      >
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    );

  showLinks = (type) => {
    let list = [];

    if (this.props.user.userData) {
      type.forEach((item) => {
        if (!this.props.user.userData.isAuth) {
          if (item.public === true) {
            list.push(item);
          }
        } else {
          if (item.linkTo !== '/register_login') {
            list.push(item);
          }
        }
      });
    }

    return list.map((item, i) => {
      if (item.linkTo !== '/user/cart') {
        return this.defaultLink(item, i);
      } else {
        return this.cartLink(item, i);
      }
    });
  };

  render() {
    const { t } = this.props;
    const menuLinks = {
      page: [
        {
          name: t('Home'),
          linkTo: '/',
          public: true,
        },
        {
          name: t('Shop'),
          linkTo: '/shop',
          public: true,
        },
        {
          name: t('Club'),
          linkTo: '/club',
          public: true,
        },

        {
          name: t('Breeders'),
          linkTo: '/breeders',
          public: true,
        },

        {
          name: t('Breeds'),
          linkTo: '/breeds',
          public: true,
        },
        {
          name: t('Forum'),
          linkTo: '/forum',
          public: false,
        },
        {
          name: t('Weather'),
          linkTo: '/weather',
          public: true,
        },
      ],
      user: [
        {
          name: t('My account'),
          linkTo: '/user/dashboard',
          public: false,
        },
        {
          name: t('My cart'),
          linkTo: '/user/cart',
          public: false,
        },

        {
          name: t('Log in'),
          linkTo: '/register_login',
          public: true,
        },
        {
          name: t('Log out'),
          linkTo: '/user/logout',
          public: false,
        },
      ],
    };
    return (
      <header className="toolbar">
        <nav className="toolbar__navigation">
          <div className="toolbar__toggle-button">
            <DrawerToggleButton click={this.props.drawerClickHandler} />
          </div>
          <div className="toolbar__logo">
            <Link to="/">
              <img
                className="toolbar__logo_tb"
                src={'/images/logo.png'}
                alt="logo"
              />
            </Link>
          </div>
          <div className="spacer" />
          <div className="toolbar_navigation-items">
            {this.showLinks(menuLinks.page)}
            {this.showLinks(menuLinks.user)}
          </div>
          <ChangeLanguage />
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default withNamespaces()(connect(mapStateToProps)(withRouter(Header)));
