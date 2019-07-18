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

// Ignore elements without tw-name
// Remove tw-name

it('replaces the class with the component name', () => {
  let input = '<div class="text-red-500" tw-name="my-div"></div>';
  let output = translate(input);
  expect(output.html).toBe('<div class="my-div"></div>');
});

it('generates a component with the classes', () => {
  let input = '<div class="text-red-500" tw-name="my-div"></div>';
  let output = translate(input);
  expect(output.components).toStrictEqual({ 'my-div': ['text-red-500'] });
});
