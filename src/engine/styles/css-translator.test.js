import translate from './css-translator';

it('translates the default key of a component correctly', () => {
  let input = {
    'my-div': {default: ['text-red-500']},
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
    'my-div': {default: ['text-red-500']},
    'my-nested-div': {default: ['text-red-200']},
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
    'my-div': {default: ['text-red-500', 'text-red-200']},
  };
  let output = translate(input);
  expect(output).toBe(
      '.my-div{' +
        '@apply text-red-500 text-red-200;' +
      '}'
  );
});

