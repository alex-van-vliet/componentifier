function translate(components) {
  let output = '';
  for (let component_class in components)
  {
    if (components.hasOwnProperty(component_class))
    {
      let component = components[component_class];

      if (component.hasOwnProperty('_default'))
      {
        const size = component['_default'];
        if (size.hasOwnProperty('_default'))
        {
          output += '.' + component_class + '{';
          output += '@apply ' + size['_default'].join(' ') + ';';
          output += '}';
        }
      }
    }
  }
  return output;
}

export default translate;
