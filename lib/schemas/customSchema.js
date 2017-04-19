export default [
  {
    key: 'id',
    types: ['string', 'number'],
    required: true,
  },
  {
    key: 'component',
    types: ['any'],
    required: true,
  },
  {
    key: 'replace',
    types: ['boolean'],
    required: false,
  },
  {
    key: 'waitUser',
    types: ['boolean'],
    required: false,
  },
  {
    key: 'asMessage',
    types: ['boolean'],
    required: false,
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
