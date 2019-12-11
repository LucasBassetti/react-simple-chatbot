export default [
  {
    key: 'id',
    types: ['string', 'number'],
    required: true
  },
  {
    key: 'update',
    types: ['string', 'number'],
    required: true
  },
  {
    key: 'trigger',
    types: ['string', 'number', 'function'],
    required: false
  },
  {
    key: 'updateOptions',
    types: ['object'],
    required: false
  },
  {
    key: 'placeholder',
    types: ['string'],
    required: false
  },
  {
    key: 'inputAttributes',
    types: ['object'],
    required: false
  },
  {
    key: 'metadata',
    types: ['object'],
    required: false
  },
  {
    key: '@class',
    types: ['string'],
    required: false
  },
  {
    key: 'evalExpression',
    types: ['string'],
    required: false
  },
  {
    key: 'end',
    types: ['boolean'],
    required: false
  }
];
