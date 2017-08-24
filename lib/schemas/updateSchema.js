export default [
  {
    key: 'id',
    types: ['string', 'number'],
    required: true,
  },
  {
    key: 'update',
    types: ['string', 'number'],
    required: true,
  },
  {
    key: 'trigger',
    types: ['string', 'number', 'function'],
    required: true,
  },
];
