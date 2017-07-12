import React, { Component } from 'react';
import ReactGA from 'react-ga';
import Home from './components/home/Home';
import Docs from './components/docs/Docs';

ReactGA.initialize('UA-50372288-6');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link: '/',
    };

    this.handleLink = this.handleLink.bind(this);
  }

  componentWillMount() {
    const link = window.location.hash.replace('#', '');
    this.setState({ link });
    ReactGA.pageview(link || '/');
  }

  handleLink(link) {
    window.location.hash = link;
    this.setState({ link });
    ReactGA.pageview(link);
  }

  render() {
    const { link } = this.state;
    const isHome = link.indexOf('/docs') < 0;

    return isHome ? (
      <Home
        handleLink={this.handleLink}
        link={link}
      />
    ) : (
      <Docs
        handleLink={this.handleLink}
        link={link}
      />
    );
  }
}

export default App;
