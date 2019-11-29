export default [
  {
    key: 'id',
    types: ['string', 'number'],
    required: true
  },
  {
    key: 'choices',
    types: ['object'],
    required: true
  },
  {
    key: 'maxChoices',
    types: ['number'],
    defaultValue: Number.MAX_VALUE,
    required: true
  },
  {
    key: 'minChoices',
    types: ['number'],
    defaultValue: 0,
    required: true
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
    key: 'trigger',
    types: ['string', 'number', 'function'],
    required: false
  }
];
