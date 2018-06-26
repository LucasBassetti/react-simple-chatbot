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
    key: 'enableFiles',
    types: ['boolean'],
    required: false,
  },
  {
    key: 'trigger',
    types: ['string', 'number', 'function'],
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
