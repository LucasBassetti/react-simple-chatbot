export default [
  {
    key: 'id',
    types: ['string', 'number'],
    required: true,
  },
  {
    key: 'message',
    types: ['string'],
    required: true,
  },
  {
    key: 'trigger',
    types: ['string', 'number'],
    required: false,
  },
  {
    key: 'end',
    types: ['boolean'],
    required: false,
  },
];
