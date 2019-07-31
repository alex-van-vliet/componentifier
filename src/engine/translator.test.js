import translate from './translator';

// Simplest case
// From:
// <div class="text-red-500" tw-name="my-div"></div>
// To:
// <div class="my-div"></div>
// &
// .my-div {
//     @apply text-red-500;
// }

it('replaces the class with the component name', () => {
  let input =
      '<div class="text-red-500" tw-name="my-div"></div>';
  let output = translate(input);
  expect(output.html).toBe('<div class="my-div"></div>');
});

it('generates a component with the classes', () => {
  let input =
      '<div class="text-red-500" tw-name="my-div"></div>';
  let output = translate(input);
  expect(output.components).toMatchObject({
    'my-div': {_default: {_default: ['text-red-500']}},
  });
});

it('handles nested components', () => {
  let input =
      '<div class="text-red-500" tw-name="my-div">' +
        '<div class="text-red-200" tw-name="my-nested-div">Test</div>' +
      '</div>';
  let output = translate(input);
  expect(output.html).toBe(
      '<div class="my-div">' +
        '<div class="my-nested-div">Test</div>' +
      '</div>'
  );
  expect(output.components).toMatchObject({
    'my-div': {_default: {_default: ['text-red-500']}},
    'my-nested-div': {_default: {_default: ['text-red-200']}},
  });
});

it('handles neighbour components', () => {
  let input =
      '<div class="text-red-500" tw-name="my-div"></div>' +
      '<div class="text-red-200" tw-name="my-next-div">Test</div>';
  let output = translate(input);
  expect(output.html).toBe(
      '<div class="my-div"></div>' +
      '<div class="my-next-div">Test</div>'
  );
  expect(output.components).toMatchObject({
    'my-div': {_default: {_default: ['text-red-500']}},
    'my-next-div': {_default: {_default: ['text-red-200']}},
  });
});

it('handles several classes', () => {
  let input =
      '<div class="text-red-500 text-red-200" tw-name="my-div"></div>';
  let output = translate(input);
  expect(output.html).toBe('<div class="my-div"></div>');
  expect(output.components).toMatchObject({
    'my-div': {_default: {_default: ['text-red-500', 'text-red-200']}},
  });
});

it('can split one element into several components', () => {
  let input =
      '<div class="text-center , text-red-500" tw-name="my-div , my-red-div"></div>';
  let output = translate(input);
  expect(output.html).toBe('<div class="my-div my-red-div"></div>');
  expect(output.components).toMatchObject({
    'my-div': {_default: {_default: ['text-center']}},
    'my-red-div': {_default: {_default: ['text-red-500']}},
  });
});

it('handles pseudo-class variants', () => {
  let input =
      '<div class="hover:text-red-100 focus:text-red-200 active:text-red-300 group-hover:text-red-400 focus-within:text-red-500" tw-name="my-div">' +
      '</div>';
  let output = translate(input);
  expect(output.html).toBe('<div class="my-div"></div>');
  expect(output.components).toMatchObject({
    'my-div': {
      hover: {_default: ['text-red-100']},
      focus: {_default: ['text-red-200']},
      active: {_default: ['text-red-300']},
      'group-hover': {_default: ['text-red-400']},
      'focus-within': {_default: ['text-red-500']},
    },
  });
});
