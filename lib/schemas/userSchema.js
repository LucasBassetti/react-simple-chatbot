export default [
  {
    key: 'id',
    types: ['string', 'number'],
    required: true,
  },
  {
    key: 'user',
    types: ['boolean'],
    required: true,
  },
  {
    key: 'trigger',
    types: ['string', 'number'],
    required: false,
  },
  {
    key: 'validator',
    types: ['function'],
    required: false,
  },
  {
    key: 'end',
    types: ['boolean'],
    required: false,
  },
];
