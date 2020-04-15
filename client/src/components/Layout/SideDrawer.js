import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logoutUser } from '../../actions/user';
import { connect } from 'react-redux';

class sideDrawer extends Component {
  state = {
    page: [
      {
        name: 'Home',
        linkTo: '/',
        public: true,
      },
      {
        name: 'Shop',
        linkTo: '/shop',
        public: true,
      },
      {
        name: 'Club',
        linkTo: '/club',
        public: true,
      },

      {
        name: 'Breeders',
        linkTo: '/breeders',
        public: true,
      },

      {
        name: 'Breeds',
        linkTo: '/breeds',
        public: true,
      },
      {
        name: 'Forum',
        linkTo: '/forum',
        public: false,
      },
      {
        name: 'Weather',
        linkTo: '/weather',
        public: true,
      },
    ],
    user: [
      {
        name: 'My Account',
        linkTo: '/user/dashboard',
        public: false,
      },
      {
        name: 'My Cart',
        linkTo: '/user/cart',
        public: false,
      },

      {
        name: 'Log in',
        linkTo: '/register_login',
        public: true,
      },
      {
        name: 'Log out',
        linkTo: '/user/logout',
        public: false,
      },
    ],
  };

  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        this.props.history.push('/');
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
    item.name === 'Log out' ? (
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
          if (item.name !== 'Log in') {
            list.push(item);
          }
        }
      });
    }

    return list.map((item, i) => {
      if (item.name !== 'My Cart') {
        return this.defaultLink(item, i);
      } else {
        return this.cartLink(item, i);
      }
    });
  };
  render() {
    let drawerClasses = 'side-drawer';
    if (this.props.show) {
      drawerClasses = 'side-drawer open';
    }

    return (
      <nav className={drawerClasses}>
        <ul>
          {this.showLinks(this.state.page)}
          {this.showLinks(this.state.user)}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(withRouter(sideDrawer));
