import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { logoutUser } from '../../actions/user';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

class sideDrawer extends Component {
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

    let drawerClasses = 'side-drawer';
    if (this.props.show) {
      drawerClasses = 'side-drawer open';
    }

    return (
      <nav className={drawerClasses}>
        <ul>
          {this.showLinks(menuLinks.page)}
          {this.showLinks(menuLinks.user)}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withNamespaces()(
  connect(mapStateToProps)(withRouter(sideDrawer))
);
