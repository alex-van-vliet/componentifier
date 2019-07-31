function translate(components) {
  let output = '';
  for (let component_class in components)
  {
    if (components.hasOwnProperty(component_class))
    {
      let component = components[component_class];

      if (component.hasOwnProperty('default'))
      {
        output += '.' + component_class + '{';
        output += '@apply ' + component['default'].join(' ') + ';';
        output += '}';
      }
    }
  }
  return output;
}

export default translate;
