import React from 'react';
import PropTypes from 'prop-types';
import Tutorial from './Tutorial';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import GithubIcon from './layout/GithubIcon';
import menu from './menu';
import TwitterButton from '../common/TwitterButton';
import FacebookButton from '../common/FacebookButton';

require('./Docs.css');

const routes = [];
for (let i = 0, len = menu.length; i < len; i += 1) {
  for (let j = 0, jlen = menu[i].links.length; j < jlen; j += 1) {
    routes[menu[i].links[j].href] = menu[i].links[j];
  }
}

const Docs = (props) => {
  const link = routes[props.link];

  return (
    <div className="docs">
      <Sidebar handleLink={props.handleLink} />
      <div className="social-buttons">
        <FacebookButton dataSize="small" />
        <TwitterButton dataSize="small" />
      </div>
      <GithubIcon />
      <main>
        {
          link ? (
            <div>
              <Header
                title={link.title}
                description={link.description}
              />
              { link.component }
            </div>
          ) : (
            <Header
              title="404 - Not Found"
              description="Page not found"
            />
          )
        }
      </main>
      <Tutorial handleLink={props.handleLink} />
    </div>
  );
};

Docs.propTypes = {
  link: PropTypes.string.isRequired,
  handleLink: PropTypes.func.isRequired,
};

export default Docs;
