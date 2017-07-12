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
            <a onClick={() => this.props.handleLink('/')} className="logo">React Simple Chatbot</a>
            <i
              className="sidebar-close-button fa fa-close"
              onClick={() => this.toggleSidebar()}
            />
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
