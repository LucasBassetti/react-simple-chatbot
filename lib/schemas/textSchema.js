export default [
  {
    key: 'id',
    types: ['string', 'number'],
    required: true,
  },
  {
    key: 'message',
    types: ['string', 'function'],
    required: true,
  },
  {
    key: 'avatar',
    types: ['string'],
    required: false,
  },
  {
    key: 'trigger',
    types: ['string', 'number'],
    required: false,
  },
  {
    key: 'delay',
    types: ['number'],
    required: false,
  },
  {
    key: 'end',
    types: ['boolean'],
    required: false,
  },
];
