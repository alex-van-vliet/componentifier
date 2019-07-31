import translate from './css-translator';

it('translates the default key of a component correctly', () => {
  let input = {
    'my-div': {_default: {_default: ['text-red-500']}},
  };
  let output = translate(input);
  expect(output).toBe(
      '.my-div{' +
        '@apply text-red-500;' +
      '}'
  );
});

it('translates several components', () => {
  let input = {
    'my-div': {_default: {_default: ['text-red-500']}},
    'my-nested-div': {_default: {_default: ['text-red-200']}},
  };
  let output = translate(input);
  expect(output).toBe(
      '.my-div{' +
        '@apply text-red-500;' +
      '}' +
      '.my-nested-div{' +
        '@apply text-red-200;' +
      '}'
  );
});

it('handles several classes', () => {
  let input = {
    'my-div': {_default: {_default: ['text-red-500', 'text-red-200']}},
  };
  let output = translate(input);
  expect(output).toBe(
      '.my-div{' +
        '@apply text-red-500 text-red-200;' +
      '}'
  );
});

it('handles sizes and variants', () => {
  let input = {
    'my-div': {lg: {hover: ['text-red-500']}},
  };
  let output = translate(input);
  expect(output).toBe(
      '@screen lg{' +
        '.my-div:hover{' +
          '@apply text-red-500;' +
        '}' +
      '}'
  );
});

it('handles group-hover', () => {
  let input = {
    'my-div': {_default: {'group-hover': ['text-red-500']}},
  };
  let output = translate(input);
  expect(output).toBe(
      '.group:hover .my-div{' +
        '@apply text-red-500;' +
      '}'
  );
});
