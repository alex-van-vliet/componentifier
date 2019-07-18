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
    'my-div': {default: ['text-red-500']},
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
    'my-div': {default: ['text-red-500']},
    'my-nested-div': {default: ['text-red-200']},
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
    'my-div': {default: ['text-red-500']},
    'my-next-div': {default: ['text-red-200']},
  });
});
