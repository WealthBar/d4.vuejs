import Axis from './Axis';

const components = {
  Axis,
};

const plugin = {
  install(Vue) {
    Object
      .values(components)
      .forEach(c => Vue.component(c.name, c));
  },
};

Object.assign(plugin, components);

export default plugin;
