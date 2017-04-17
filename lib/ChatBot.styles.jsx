const createdStyleTag = document.createElement('style');
createdStyleTag.textContent = `
  @-webkit-keyframes chatbotLoading {
    0% { opacity: .2; }
    100% { opacity: 1; }
  }
  @keyframes chatbotLoading {
    0% { opacity: .2; }
    100% { height: 1; }
  }

  @-webkit-keyframes chatbotScale {
    100% { transform: scale(1); }
  }
  @keyframes chatbotScale {
    100% { transform: scale(1); }
  }

  @-webkit-keyframes chatbotInvalidRotate {
    25% { transform: rotate(-1deg); }
    100% { transform: rotate(1deg); }
  }
  @keyframes chatbotInvalidRotate {
    25% { transform: rotate(-1deg); }
    100% { transform: rotate(1deg); }
  }

  .hover-element:hover { opacity: .7; }
`;
document.head.appendChild(createdStyleTag);

const styles = {
  chatbot: {
    border: '1px solid #ddd',
    fontFamily: 'monospace',
    width: 400,
  },
  chatbotMain: {
    height: 450,
    overflowY: 'scroll',
    paddingTop: 6,
  },
  chatInput: {
    width: 'calc(100% - 16px)',
    padding: '12px 8px',
    fontSize: 12,
    border: 0,
    borderTop: '1px solid #ddd',
    borderRadius: 2,
  },
  chatInputDisabled: {
    opacity: '.5',
  },
  chatInputInvalid: {
    animation: 'chatbotInvalidRotate .2s ease',
    border: '1px solid #E53935',
    borderTop: '1px solid #E53935',
    color: '#E53935',
    opacity: '1',
  },
};

export default styles;
