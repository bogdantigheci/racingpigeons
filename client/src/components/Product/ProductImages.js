import React, { Component } from 'react';
import ImageLightBox from '../utils/ImageLightBox';

class ProdImg extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: [],
  };

  componentDidMount() {
    if (this.props.detail.images.length > 0) {
      let lightboxImages = [];

      this.props.detail.images.forEach((item) => {
        lightboxImages.push(item.url);
      });

      this.setState({
        lightboxImages,
      });
    }
  }

  handleLightBoxOpen = (pos) => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({
        lightbox: true,
        imagePos: pos,
      });
    }
  };

  handleLightBoxClose = () => {
    this.setState({
      lightbox: false,
    });
  };

  handleShowThumbs = () =>
    this.state.lightboxImages.map((item, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => this.handleLightBoxOpen(i)}
          className="thumb"
          style={{ background: `url(${item}) no-repeat` }}
        ></div>
      ) : null
    );

  renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return `/images/image_not_available.png`;
    }
  };

  render() {
    const { detail } = this.props;

    return (
      <div className="product_image_container">
        <div className="main_pic">
          <img
            className="image_prod_detail"
            src={`${this.renderCardImage(detail.images)}`}
            alt="pigeon"
            onClick={() => this.handleLightBoxOpen(0)}
          />
        </div>
        <div className="main_thumbs">{this.handleShowThumbs(detail)}</div>
        {this.state.lightbox ? (
          <ImageLightBox
            id={detail._id}
            images={this.state.lightboxImages}
            open={this.state.lightbox}
            pos={this.state.imagePos}
            onclose={() => this.handleLightBoxClose()}
          />
        ) : null}
      </div>
    );
  }
}

export default ProdImg;
