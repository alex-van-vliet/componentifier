import htmlparser from 'htmlparser2';

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
          components[element.attribs['tw-name'].toString()]
              = element.attribs['class'].split(' ');
          element.attribs['class'] = element.attribs['tw-name'];
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

  return {
    html: htmlparser.DomUtils.getInnerHTML({children: parsed}),
    components,
  };
}

export default translate;
