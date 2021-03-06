import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { withNamespaces } from 'react-i18next';

const Footer = ({ data, t }) => {
  return data.siteData ? (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">{t('Racing Pigeons')}</div>
        <div className="wrapper">
          <div className="left">
            <h3>{t('Contact information')}</h3>
            <div className="business_nfo">
              <div className="tag">
                <FontAwesomeIcon icon={faCompass} className="icon" />
                <div className="nfo">
                  <div>{t('Address')}</div>
                  <div>{data.siteData[0].address}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <div className="nfo">
                  <div>{t('Phone')}</div>
                  <div>{data.siteData[0].phone}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faClock} className="icon" />
                <div className="nfo">
                  <div>{t('Working hours')}</div>
                  <div>{data.siteData[0].hours}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <div className="nfo">
                  <div>{t('Email')}</div>
                  <div>{data.siteData[0].email}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="left">
            <h3>{t('Follow us on Social Media')}</h3>
            <div>
              <div>
                {t(
                  'Get all the latest information on events, sales and offers. You can miss out.'
                )}
                <div className="social_links">
                  <a
                    href="https://www.facebook.com/Racing-Pigeons-310366422402712"
                    className="social_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a
                    className="social_link"
                    href="https://twitter.com/Retailgamers"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="social_link"
                    href="https://www.instagram.com/bogdantigheci"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyr">
        Copyright &copy; {new Date().getFullYear()} Racing Pigeons
      </div>
    </footer>
  ) : null;
};

export default withNamespaces()(Footer);
