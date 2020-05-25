import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { withNamespaces } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';

class Fileupload extends Component {
  constructor() {
    super();
    this.state = {
      uploadedFiles: [],
      uploading: false,
    };
  }

  onDrop = (files) => {
    this.setState({ uploading: true });
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    axios.post('/api/users/uploadimage', formData, config).then((response) => {
      this.setState(
        {
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, response.data],
        },
        () => {
          this.props.imagesHandler(this.state.uploadedFiles);
        }
      );
    });
  };

  onRemove = (id) => {
    axios.get(`/api/users/removeimage?public_id=${id}`).then((response) => {
      let images = this.state.uploadedFiles.filter((item) => {
        return item.public_id !== id;
      });

      this.setState(
        {
          uploadedFiles: images,
        },
        () => {
          this.props.imagesHandler(images);
        }
      );
    });
  };

  showUploadedImages = () =>
    this.state.uploadedFiles.map((item) => (
      <div
        className="dropzone_box"
        key={item.public_id}
        onClick={() => this.onRemove(item.public_id)}
      >
        <div
          className="wrap"
          style={{ background: `url(${item.url}) no-repeat` }}
        ></div>
      </div>
    ));

  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return (state = {
        uploadedFiles: [],
      });
    }
    return null;
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone
              onDrop={(e) => this.onDrop(e)}
              multiple={false}
              className="dropzone_box"
            >
              {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragReject,
                rejectedFiles,
              }) => {
                const isFileTooLarge =
                  rejectedFiles.length > 0 &&
                  rejectedFiles[0].size > 1000000000;
                return (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive
                      ? t('Drop your file here to upload!')
                      : t('Click me or drag a file to upload!')}
                    {isDragActive &&
                      !isDragReject &&
                      t('Drop your file here to upload!')}
                    {isDragReject && t('File type not accepted, sorry!')}
                    {isFileTooLarge && <div>{t('File is too large.')}</div>}
                  </div>
                );
              }}
            </Dropzone>
            {this.showUploadedImages()}
            {this.state.uploading ? (
              <div
                className="dropzone_box"
                style={{
                  textAlign: 'center',
                  paddingTop: '60px',
                }}
              >
                <CircularProgress style={{ color: '#00bcd4' }} thickness={7} />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

export default withNamespaces()(Fileupload);
