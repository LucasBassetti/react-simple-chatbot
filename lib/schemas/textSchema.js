export default [
  {
    key: 'id',
    types: ['string', 'number'],
    required: true
  },
  {
    key: 'message',
    types: ['string', 'function'],
    required: true
  },
  {
    key: 'value',
    types: ['string', 'number', 'object'],
    required: false
  },
  {
    key: 'avatar',
    types: ['string'],
    required: false
  },
  {
    key: 'trigger',
    types: ['string', 'number', 'function'],
    required: false
  },
  {
    key: 'delay',
    types: ['number'],
    required: false
  },
  {
    key: 'end',
    types: ['boolean'],
    required: false
  },
  {
    key: 'placeholder',
    types: ['string'],
    required: false
  },
  {
    key: 'hideInput',
    types: ['boolean'],
    required: false
  },
  {
    key: 'hideExtraControl',
    types: ['boolean'],
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
    key: 'user',
    types: ['boolean'],
    required: false
  }
];
