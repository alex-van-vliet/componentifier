function handle_variants(component_class, size)
{
  let output = "";
  if (size.hasOwnProperty('_default')) {
    output += '.' + component_class + '{';
    output += '@apply ' + size['_default'].join(' ') + ';';
    output += '}';
  }

  for (let variant in size)
  {
    if (size.hasOwnProperty(variant) && variant !== '_default')
    {
      if (variant === 'group-hover')
      {
        output += '.group:hover .' + component_class + '{';
        output += '@apply ' + size[variant].join(' ') + ';';
        output += '}';
      }
      else
      {
        output += '.' + component_class + ':' + variant + '{';
        output += '@apply ' + size[variant].join(' ') + ';';
        output += '}';
      }
    }
  }
  return output;
}

function translate(components) {
  let output = '';
  for (let component_class in components)
  {
    if (components.hasOwnProperty(component_class))
    {
      let component = components[component_class];

      if (component.hasOwnProperty('_default'))
      {
        output += handle_variants(component_class, component['_default']);
      }

      for (let size in component)
      {
        if (component.hasOwnProperty(size) && size !== '_default')
        {
          output += "@screen " + size + "{";
          output += handle_variants(component_class, component[size]);
          output += "}";
        }
      }
    }
  }
  return output;
}

export default translate;
