import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FacebookButton extends Component {

  componentDidMount() {
    // window.facebook.ready();
  }

  render() {
    const { dataSize } = this.props;
    const isSmall = (dataSize === 'small');
    const width = isSmall ? 107 : 129;
    const height = isSmall ? 20 : 28;

    return (
      <iframe
        className="fb-share-button"
        src={`https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Flucasbassetti.com.br%2Freact-simple-chatbot&layout=button_count&size=${dataSize}&mobile_iframe=true&appId=902012053186141&width=${width}&height=${height}`}
        width={width}
        height={height}
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allowTransparency="true"
      />
    );
  }
}

FacebookButton.propTypes = {
  dataSize: PropTypes.string.isRequired,
};

export default FacebookButton;
