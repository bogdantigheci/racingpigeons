import React, { Component } from 'react';
import ImageLightBox from '../utils/ImageLightBox';

class ProdImg extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  };

  componentDidMount() {
    if (this.props.detail.images.length > 0) {
      let lightboxImages = [];

      this.props.detail.images.forEach(item => {
        lightboxImages.push(item.url);
      });

      this.setState({
        lightboxImages
      });
      //console.log('lightboxImages', lightboxImages);
    }
  }

  handleLightBoxOpen = pos => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({
        lightbox: true,
        imagePos: pos
      });
    }
  };

  handleLightBoxClose = () => {
    this.setState({
      lightbox: false
    });
  };

  showThumbs = () =>
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

  renderCardImage = images => {
    if (images.length > 0) {
      // console.log(' images[0].url', images[0].url);
      return images[0].url;
    } else {
      return `/images/image_not_available.png`;
    }
  };

  render() {
    const { detail } = this.props;
    // console.log('detail', detail.images[0].url);
    // console.log('deetaaail', detail);
    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{
              background: `url(${this.renderCardImage(
                detail.images
              )}) no-repeat`
            }}
            onClick={() => this.handleLightBoxOpen(0)}
          ></div>
        </div>
        <div className="main_thumbs">{this.showThumbs(detail)}</div>
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
