const styles = {
  loading: {
    animation: 'chatbotLoading 1.4s infinite both',
  },
  loading2: {
    animationDelay: '.2s',
  },
  loading3: {
    animationDelay: '.4s',
  },
  chatTextStep: {
    alignItems: 'flex-end',
    display: 'flex',
  },
  userChatTextStep: {
    justifyContent: 'flex-end',
  },
  chatImage: {
    display: 'inline-block',
    padding: 6,
  },
  userChatImage: {
    order: 1,
  },
  image: {
    border: '1px solid #ddd',
    borderRadius: '50% 50% 0 50%',
    height: 40,
    padding: 2,
    width: 40,
    transform: 'scale(0)',
    animation: 'chatbotScale .3s ease forwards',
    transformOrigin: 'bottom right',
  },
  userImage: {
    borderRadius: '50% 50% 50% 0',
    transformOrigin: 'bottom left',
  },
  chatContent: {
    borderRadius: '18px 18px 18px 0',
    display: 'inline-block',
    maxWidth: '50%',
    marginBottom: 10,
    position: 'relative',
    padding: 12,
    fontSize: 14,
    transform: 'scale(0)',
    animation: 'chatbotScale .3s ease forwards',
    transformOrigin: 'bottom left',
  },
  userChatContent: {
    borderRadius: '18px 18px 0 18px',
    transformOrigin: 'bottom right',
  },
  middle: {
    borderRadius: '0 18px 18px 0px',
    marginLeft: 46,
    marginTop: -8,
    transformOrigin: 'top left',
  },
  userMiddle: {
    borderRadius: '18px 0 0 18px',
    marginRight: 46,
    marginTop: -8,
    transformOrigin: 'top right',
  },
  last: {
    borderRadius: '0 18px 18px 18px',
    marginLeft: 46,
    marginTop: -8,
    transformOrigin: 'top left',
  },
  userLast: {
    borderRadius: '18px 0 18px 18px',
    marginRight: 46,
    marginTop: -8,
    transformOrigin: 'top right',
  },
};

export default styles;
