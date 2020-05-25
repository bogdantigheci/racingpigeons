const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const SHA1 = require('crypto-js/sha1');
const moment = require('moment');
const cors = require('cors');
const Pusher = require('pusher');

const app = express();

const mongoose = require('mongoose');
const async = require('async');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(`${process.env.MONGODB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
var pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: 'eu',
  useTLS: true,
});

//for heroku

app.use(express.static('client/build'));

////

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

////Models

const { User } = require('./models/user');
const { Breed } = require('./models/breed');
const { Breeder } = require('./models/breeder');
const { Product } = require('./models/product');
const { Payment } = require('./models/payment');
const { Site } = require('./models/site');
const { Post } = require('./models/post');
const { Race } = require('./models/race');
const { Request } = require('./models/request');

///Validation

const validatePostInput = require('../server/utils/validation/post');
const validateCommentInput = require('../server/utils/validation/comment');

///Middlewares

const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

///Utils

const { sendEmail } = require('./utils/mail/index');

//////////////////////////////////////
//    PRODUCTS - PIGEONS
//////////////////////////////////////

app.post('/api/product/shop', (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  findArgs['publish'] = true;

  Product.find(findArgs)
    .populate('breed')
    .populate('breeder')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        size: articles.length,
        articles,
      });
    });
});

//////by arrival
/// /articles?sortBy=createdAt&order=desc&limit=4
app.get('/api/product/articles', (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Product.find()
    .populate('breed')
    .populate('breeder')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.send(articles);
    });
});

/// /api/product/article?id=5e44032aae38cb5e54ad89a9&type=single

app.get('/api/product/articles_by_id', (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === 'array') {
    let ids = req.query.id.split(',');
    items = [];
    items = ids.map((item) => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Product.find({ _id: { $in: items } })
    .populate('breed')
    .populate('breeder')
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

app.post('/api/product/article', auth, admin, (req, res) => {
  const product = new Product(req.body);

  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      article: doc,
    });
  });
});

app.post('/api/product/sell_request', auth, admin, (req, res) => {
  const request = new Request(req.body);

  request.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      request: doc,
    });
  });
});

app.get('/api/product/requests', (req, res) => {
  Request.find({}, (err, requests) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({ requests });
  });
});

//////////////////////////////////////
//    BREEDS -brand
//////////////////////////////////////

app.post('/api/product/breeds', auth, admin, (req, res) => {
  const breed = new Breed(req.body);

  breed.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      breed: doc,
    });
  });
});

app.get('/api/product/breeds', (req, res) => {
  Breed.find({}, (err, breeds) => {
    if (err) return res.status(400).send(err);

    res.status(200).send({ breeds });
  });
});

//////////////////////////////////////
//    BREEDERS
//////////////////////////////////////

app.post('/api/product/breeders', auth, admin, (req, res) => {
  const breeder = new Breeder(req.body);

  breeder.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    res.status(200).json({
      success: true,
      breeder: doc,
    });
  });
});

app.get('/api/product/breeders', (req, res) => {
  Breeder.find({}, (err, breeders) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({ breeders });
  });
});

app.get('/api/product/breeders/:id', (req, res) => {
  Breeder.findById(req.params.id)
    .then((breeder) => res.json(breeder))
    .catch((err) =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
});

//////////////////////////////////////
//    RACES
//////////////////////////////////////

app.post('/api/product/races', auth, admin, (req, res) => {
  const race = new Race(req.body);
  race.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    res.status(200).json({
      success: true,
      race: doc,
    });
  });
});

app.get('/api/product/races', (req, res) => {
  Race.find({}, (err, races) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({ races });
  });
});

app.get('/api/product/races/:id', (req, res) => {
  Race.findById(req.params.id)
    .then((race) => res.json(race))
    .catch((err) =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
});

//////////////////////////////////////
//     USERS
/////////////////////////////////////

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history,
  });
});

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    sendEmail(doc.email, doc.name, null, 'welcome');

    res.status(200).json({
      success: true,
    });
  });
});

app.post('/api/users/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: 'Auth failed, email not found',
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: 'Wrong password' });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('w_auth', user.token).status(200).json({
          loginSuccess: true,
        });
      });
    });
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.post('/api/users/uploadimage', auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    (result) => {
      // console.log(result);
      res.status(200).send({
        public_id: result.public_id,
        url: result.url,
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: 'auto',
    }
  );
});

app.get(`/api/users/removeimage`, auth, admin, (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false }, error);
  });
  res.status(200).send('image deleted');
});

app.post('/api/users/addToCart', auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false;

    doc.cart.forEach((item) => {
      if (item.id == req.query.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
          'cart.id': mongoose.Types.ObjectId(req.query.productId),
        },
        { $inc: { 'cart.$.quantity': 1 } },
        { new: true },
        () => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.productId),
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    }
  });
});

app.get('/api/users/removeFromCart', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { cart: { id: mongoose.Types.ObjectId(req.query._id) } } },
    { new: true },
    (err, doc) => {
      let cart = doc.cart;
      let array = cart.map((item) => {
        return mongoose.Types.ObjectId(item.id);
      });

      Product.find({ _id: { $in: array } })
        .populate('breed')
        .populate('breeder')
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart,
          });
        });
    }
  );
});

app.post('/api/users/successBuy', auth, (req, res) => {
  let history = [];
  let transactionData = {};
  const date = new Date();
  const po = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA1(
    req.user._id
  )
    .toString()
    .substring(0, 8)}`;

  // user history
  req.body.cartDetail.forEach((item) => {
    history.push({
      porder: po,
      dateOfPurchase: Date.now(),
      ringId: item.ringId,
      breed: item.breed.name,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });

  // PAYMENTS DASH----verifica nume
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email,
  };
  transactionData.data = {
    ...req.body.paymentData,
    porder: po,
  };
  transactionData.product = history;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        let products = [];
        doc.product.forEach((item) => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          products,
          (item, callback) => {
            Product.update(
              { _id: item.id },
              {
                $inc: {
                  sold: item.quantity,
                },
                $set: {
                  publish: false,
                },
              },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.json({ success: false, err });
            sendEmail(user.email, user.name, null, 'purchase', transactionData);
            res.status(200).json({
              success: true,
              cart: user.cart,
              cartDetail: [],
            });
          }
        );
      });
    }
  );
});

app.post('/api/users/update_profile', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: req.body,
    },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

app.post('/api/users/reset_user', (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      user.generateResetToken((err, user) => {
        if (err) return res.json({ success: false, err });
        sendEmail(user.email, user.name, null, 'reset_password', user);
        return res.json({ success: true });
      });
    }
  );
});

app.post('/api/users/reset_password', (req, res) => {
  var today = moment().startOf('day').valueOf();

  User.findOne(
    {
      resetToken: req.body.resetToken,
      resetTokenExp: {
        $gte: today,
      },
    },
    (err, user) => {
      if (!user)
        return res.json({
          success: false,
          message: 'Sorry, token bad, generate a new one.',
        });

      user.password = req.body.password;
      user.resetToken = '';
      user.resetTokenExp = '';

      user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
          success: true,
        });
      });
    }
  );
});

//////////////////////////////////////
//    SITE -info
/////////////////////////////////////

app.get('/api/site/site_data', (req, res) => {
  Site.find({}, (err, site) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(site[0].siteInfo);
  });
});

app.post('/api/site/site_data', auth, admin, (req, res) => {
  Site.findOneAndUpdate(
    { name: 'Site' },
    { $set: { siteInfo: req.body } },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
        siteInfo: doc.siteInfo,
      });
    }
  );
});

//////////////////////////////////////
//    FORUM
/////////////////////////////////////

// @desc    Create post

app.post('/api/forum/posts', auth, (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    user: req.user._id,
  });

  newPost.save().then((post) => res.json(post));
});

// @desc    Get posts

app.get('/api/forum/posts', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsfound: 'No posts found' }));
});

//Get post by id

app.get('/api/forum/posts/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({
        nopostfound:
          'The post you are looking for does not exist or was removed!',
      })
    );
});

// // // @desc    remove post

app.get('/api/forum/posts/remove/:id', auth, admin, function (req, res) {
  Post.findById(req.params.id)
    .then((post) => {
      if (post.user.toString() === req.user.id || req.user.role === 1) {
        post.remove().then(() => res.json({ success: true }));
      } else {
        return res.status(401).json({ notauthorized: 'User not authorized' });
      }
    })
    .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
});

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private

app.get('/api/forum/posts/like/:id', auth, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res
          .status(400)
          .json({ alreadyliked: 'You already liked this post' });
      }

      post.likes.unshift({ user: req.user.id, post: post.id });

      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
});

// // @route   POST api/posts/unlike/:id
// // @desc    Unlike post
// // @access  Private

app.get('/api/forum/posts/unlike/:id', auth, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res
          .status(400)
          .json({ notliked: 'You have not yet liked this post' });
      }

      const removeIndex = post.likes
        .map((item) => item.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);
      post.save().then((post) => res.json({ success: true }));
    })
    .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post

app.post('/api/forum/posts/comment/:id', auth, (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Post.findOne({ _id: req.params.id })
    .then((post) => {
      const newComment = {
        text: req.body.text,
        user: req.user._id,
        name: req.user.name,
      };

      post.comments.unshift(newComment);

      post
        .save()
        .then((post) => res.json(post))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
app.get('/api/forum/posts/comment/:id/:comment_id', auth, admin, (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (
        post.comments.filter(
          (comment) => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentnotexists: 'Comment does not exist' });
      }

      const removeIndex = post.comments
        .map((item) => item._id.toString())
        .indexOf(req.params.comment_id);

      post.comments.splice(removeIndex, 1);

      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
});

// @route   PRODUCT api/posts/comment/:id
// @desc    Add comment to product

app.post('/api/product/comment/:id', auth, (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  Product.findOne({ _id: req.params.id })
    .then((product) => {
      const newComment = {
        text: req.body.text,
        name: req.user.name,
        user: req.user._id,
      };

      product.comments.unshift(newComment);

      product
        .save()
        .then((product) => res.json(product))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// @route   DELETE api/product/comment/:id/:comment_id
// @desc    Remove comment from product
// @access  Private
app.get('/api/product/comment/:id/:comment_id', auth, admin, (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => {
      if (
        product.comments.filter(
          (comment) => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentnotexists: 'Comment does not exist' });
      }

      const removeIndex = product.comments
        .map((item) => item._id.toString())
        .indexOf(req.params.comment_id);

      product.comments.splice(removeIndex, 1);

      product.save().then((product) => res.json(product));
    })
    .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
});

// // @route   EDIT api/product/comment/:id/:comment_id/edit
// // @desc    Edit comment from post
app.post(
  '/api/product/comment/:id/:comment_id/edit',
  auth,
  admin,
  (req, res) => {
    Product.findOne({ _id: req.params.id })
      .then((product) => {
        if (
          product.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }
        const editIndex = product.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        product.comments[editIndex] = req.body;

        product.save().then((product) => res.json(product));
      })
      .catch((err) =>
        res.status(404).json({ productnotfound: 'No product found' })
      );
  }
);

// // @route   EDIT api/posts/comment/:id/:comment_id/edit
// // @desc    Edit comment from post
app.post(
  '/api/forum/posts/comment/:id/:comment_id/edit',
  auth,
  admin,
  (req, res) => {
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        const editIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        post.comments[editIndex] = req.body;

        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

///////////DEFAULT for heroku

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.get('/*', (req, res) => {
    res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
