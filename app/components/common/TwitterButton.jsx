import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TwitterButton extends Component {

  componentDidMount() {
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }
  }

  render() {
    return (
      <a
        href="https://twitter.com/share"
        className="twitter-share-button"
        data-text="Simple chatbot / conversational-ui React component"
        data-size={this.props.dataSize}
        data-url="https://lucasbassetti.com.br/react-simple-chatbot"
        data-via="LucasBassetti"
      >
        Tweet
      </a>
    );
  }
}

TwitterButton.propTypes = {
  dataSize: PropTypes.string.isRequired,
};

export default TwitterButton;
