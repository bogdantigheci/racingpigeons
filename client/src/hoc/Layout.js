import React, { Component } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import SideDrawer from '../components/Layout/SideDrawer';
import Backdrop from '../components/Layout/Backdrop';
import { connect } from 'react-redux';
import { getSiteData } from '../actions/site';

class Layout extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  componentDidMount() {
    if (Object.keys(this.props.site).length === 0) {
      this.props.getSiteData();
    }
  }

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div>
        <Header drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        <div className="page_container">{this.props.children}</div>
        <Footer data={this.props.site} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { site: state.site };
};

const mapDispatchToProps = dispatch => {
  return {
    getSiteData: () => dispatch(getSiteData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
