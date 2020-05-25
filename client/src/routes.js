import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './hoc/Layout';
import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/Register';
import Dashboard from './components/User/Dashboard';
import Auth from './hoc/Auth';
import Shop from './components/Shop';
import AddProduct from './components/User/Admin/AddProduct';
import ManageCategories from './components/User/Admin/ManageCategories';
import ProductDetail from './components/Product';
import PageNotFound from './components/utils/pageNotFound';
import Cart from './components/User/Cart';
import UpdateProfile from './components/User/UpdateProfile';
import ManageSite from './components/User/Admin/ManageSite';
import Breeds from './components/Breeds/Breeds';
import Breeders from './components/Breeders/Breeders';
import ResetUser from './components/ResetUser';
import ResetPassword from './components/ResetUser/ResetPassword';
import Forum from './components/Forum/Posts/Posts';
import Post from './components/Forum/Comments/Post';
import Club from './components/Club/Club';
import BreederInfo from './components/Breeders/BreederInfo';
import Weather from './components/Weather/Weather';
import AddRaces from './components/User/Admin/AddRaces';
import RaceInfo from './components/Club/RaceInfo';
import SellRequest from './components/User/SellRequest';
import SellRequests from './components/User/Admin/SellRequests';
import SellRequestInfo from './components/User/Admin/SellRequestInfo';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(Dashboard, true)} />
        <Route path="/user/cart" exact component={Auth(Cart, true)} />
        <Route
          path="/admin/add_product"
          exact
          component={Auth(AddProduct, true)}
        />
        <Route
          path="/admin/manage_categories"
          exact
          component={Auth(ManageCategories, true)}
        />
        <Route
          path="/admin/sell_requests"
          exact
          component={Auth(SellRequests, true)}
        />

        <Route path="/admin/add_races" exact component={Auth(AddRaces, true)} />
        <Route
          path="/reset_password/:token"
          exact
          component={Auth(ResetPassword, false)}
        />
        <Route path="/reset_user" exact component={Auth(ResetUser, false)} />
        <Route
          path="/admin/site_info"
          exact
          component={Auth(ManageSite, true)}
        />
        <Route
          path="/user/user_profile"
          exact
          component={Auth(UpdateProfile, true)}
        />
        <Route
          path="/user/sell_request"
          exact
          component={Auth(SellRequest, true)}
        />
        <Route
          path="/product_detail/:id"
          exact
          component={Auth(ProductDetail, null)}
        />
        <Route
          path="/product/breeders/:id"
          exact
          component={Auth(BreederInfo, null)}
        />
        <Route
          path="/product/races/:id"
          exact
          component={Auth(RaceInfo, null)}
        />
        <Route
          path="/product/requests/:id"
          exact
          component={Auth(SellRequestInfo, null)}
        />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route
          path="/register_login"
          exact
          component={Auth(RegisterLogin, null)}
        />
        <Route path="/forum/post/:id" exact component={Auth(Post, true)} />
        <Route path="/forum" exact component={Auth(Forum, true)} />
        <Route path="/breeds" exact component={Auth(Breeds, null)} />
        <Route path="/weather" exact component={Auth(Weather, null)} />
        <Route path="/breeders" exact component={Auth(Breeders, null)} />
        <Route path="/club" exact component={Auth(Club, null)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
        <Route component={Auth(PageNotFound)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
