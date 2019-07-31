import htmlparser from 'htmlparser2';

function handle_element(names, classes)
{
  const split_names = names.split(',');
  const split_classes = classes.split(',');

  if (split_names.length !== split_classes.length)
  {
    throw new Error("The number of chunks of names is" +
        "different from the number of chunks of classes.");
  }

  for (let i = 0; i < split_names.length; ++i)
  {
    split_names[i] = split_names[i].trim().split(' ');
    split_classes[i] = split_classes[i].trim().split(' ');
  }

  return [split_names, split_classes];
}

function generate(elements, components)
{
  for (let element_id in elements)
  {
    if (elements.hasOwnProperty(element_id))
    {
      let element = elements[element_id];

      if (element.attribs)
      {
        if ('class' in element.attribs && 'tw-name' in element.attribs)
        {
          let [names, classes]
              = handle_element(element.attribs['tw-name'], element.attribs['class']);
          for (let i = 0; i < names.length; ++i)
          {
            components[names[i]] = classes[i];
          }
          element.attribs['class'] = names.join(' ');
          delete element.attribs['tw-name'];
        }
      }
      if (element.children)
      {
        generate(element.children, components);
      }
    }
  }
}

function is_variant(variant)
{
  return ['hover', 'focus', 'active', 'group-hover', 'focus-within'].includes(variant);
}

function simplify(components)
{
  const re_two_modifiers = /^([^:]*):([^:]*):(.*)$/;
  const re_one_modifier = /^([^:]*):([^:]*)$/;
  for (let component_id in components)
  {
    if (components.hasOwnProperty(component_id))
    {
      const classes = components[component_id];
      let component = {};
      for (let i = 0; i < classes.length; ++i)
      {
        let [size, variant, class_to_add] = ['_default', '_default', classes[i]];
        const matches = classes[i].match(re_two_modifiers);
        if (matches)
        {
          if (!is_variant(matches[2]))
            throw new Error("Invalid variant " + matches[2]);
          size = matches[1];
          variant = matches[2];
          class_to_add = matches[3];
        }
        else
        {
          const matches = classes[i].match(re_one_modifier);
          if (matches)
          {
            if (is_variant(matches[1]))
              variant = matches[1];
            else
              size = matches[1];
            class_to_add = matches[2];
          }
        }

        if (!(size in component))
          component[size] = {};
        if (!(variant in component[size]))
          component[size][variant] = [];
        component[size][variant].push(class_to_add);
      }
      components[component_id] = component;
    }
  }
}


function translate(input)
{
  let parsed = null;

  let handler = new htmlparser.DomHandler(function (error, dom) {
    if (error)
      console.error(error);
    parsed = dom;
  });
  let parser = new htmlparser.Parser(handler, {
    decodeEntities: true,
  });
  parser.write(input);
  parser.end();

  if (parsed == null)
    return { html: null, components: null };

  let components = {};
  generate(parsed, components);
  simplify(components);

  return {
    html: htmlparser.DomUtils.getInnerHTML({children: parsed}),
    components,
  };
}

export default translate;
