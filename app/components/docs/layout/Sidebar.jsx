import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import menu from '../menu';

const $ = require('jquery');
require('./Sidebar.css');

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
    };

    this.renderSection = this.renderSection.bind(this);
    this.renderLink = this.renderLink.bind(this);
  }

  componentDidMount() {
    const self = this;
    const link = window.location.hash.replace('#', '');
    $(`.sub-links a[data-href="${link}"]`).parents('div').first().addClass('selected');
    $(`.sub-links a[data-href="${link}"]`).addClass('selected-link');

    const linkDivs = $('.sidebar-links > div');
    const links = $('.sidebar-links a');

    linkDivs.on('click', handleLinkDiv);
    links.on('click', handleLink);

    function handleLinkDiv(event) {
      event.preventDefault();

      linkDivs.removeClass('selected');
      $(this).addClass('selected');
    }

    function handleLink(event) {
      event.preventDefault();
      const href = $(this).attr('href');

      if (href !== '#') {
        links.removeClass('selected-link');
        $(this).addClass('selected-link');
        self.setState({ opened: false });
      }
    }
  }

  toggleSidebar() {
    const { opened } = this.state;
    this.setState({ opened: !opened });
  }

  renderLink(link) {
    return (
      <li key={link.href}>
        <a
          data-href={link.href}
          onClick={() => this.props.handleLink(link.href)}
        >
          {link.title}
        </a>
      </li>
    );
  }

  renderSection(section) {
    return (
      <div key={section.title}>
        <a href="#">
          <i className={section.icon} /> {section.title}
        </a>

        <ul className="sub-links">
          {_.map(section.links, this.renderLink)}
        </ul>
      </div>
    );
  }

  render() {
    const { opened } = this.state;

    return (
      <div className="sidebar-container">
        <i
          className="sidebar-toggle fa fa-bars"
          onClick={() => this.toggleSidebar()}
        />
        <div className={`sidebar ${opened ? 'opened' : ''}`}>
          <div className="sidebar-header">
            <a onClick={() => this.props.handleLink('/')} className="logo">
              React Simple Chatbot
            </a>
            <i
              className="sidebar-close-button fa fa-close"
              onClick={() => this.toggleSidebar()}
            />
            <a
              href="https://badge.fury.io/js/react-simple-chatbot"
              className="npm-release"
            >
              <img
                src="https://camo.githubusercontent.com/fa9a3062cddf9bacb54d8f070d43c3bb01e76875/68747470733a2f2f62616467652e667572792e696f2f6a732f72656163742d73696d706c652d63686174626f742e737667" alt="npm version" data-canonical-src="https://badge.fury.io/js/react-simple-chatbot.svg"
                style={{ maxWidth: '100%' }}
              />
            </a>
          </div>

          <div className="sidebar-links">
            {_.map(menu, this.renderSection)}
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  handleLink: PropTypes.func.isRequired,
};

export default Sidebar;
