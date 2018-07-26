import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import TwitterButton from '../common/TwitterButton';
import FacebookButton from '../common/FacebookButton';

require('./Home.css');

const home = {
  title: 'React Simple Chatbot',
  description: 'A simple react chatbot component',
  docsLink: '/docs/installation',
  github: {
    user: 'lucasbassetti',
    repository: 'react-simple-chatbot',
  },
};

class Home extends Component {

  componentDidMount() {
  }

  render() {
    const { title, description, docsLink, github } = home;
    const githubUrl = `https://ghbtns.com/github-btn.html?user=${github.user}&repo=${github.repository}`;
    return (
      <div className="home">
        <div className="column">
          <h1 className="title">{title}</h1>
          <p className="description">{description}</p>
          <div className="social-buttons">
            <FacebookButton dataSize="large" />
            <TwitterButton dataSize="large" />
          </div>
          <div className="buttons">
            <iframe
              src={`${githubUrl}&type=star&count=true&size=large`}
              frameBorder="0"
              scrolling="0"
              width="160px"
              height="30px"
            />
            <iframe
              src={`${githubUrl}&type=fork&count=true&size=large`}
              frameBorder="0"
              scrolling="0"
              width="158px"
              height="30px"
            />
          </div>
          <p className="documentation">
            <a
              className="docs-button"
              onClick={() => this.props.handleLink(docsLink)}
            >
              <i className="fa fa-book" />
              Documentation
            </a>
          </p>
        </div>
        <div className="column">
          <ChatBot
            style={{
              // boxShadow: '0 0 100px #ddd',
              width: '300px',
              height: '420px',
            }}
            hideHeader={true}
            botBubbleColor="#6E48AA"
            botFontColor="#fff"
            userBubbleColor="#9D50BB"
            userFontColor="#fff"
            contentStyle={{ overflow: 'hidden' }}
            footerStyle={{ display: 'none' }}
            steps={[
              {
                id: '1',
                message: 'Welcome to chatbot!',
                trigger: '2',
              },
              {
                id: '2',
                message: 'Check out the documentation!',
                trigger: '3',
              },
              {
                id: '3',
                options: [
                  { value: 'got-it', label: 'Got it!', trigger: '4' },
                ],
              },
              {
                id: '4',
                message: 'Great!',
                trigger: '5',
              },
              {
                id: '5',
                message: 'I hope you enjoy it! :)',
                end: true,
              },
            ]}
          />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  handleLink: PropTypes.func.isRequired,
};

export default Home;
