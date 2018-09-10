function deepFreeze(obj) {
  const propNames = Object.getOwnPropertyNames(obj);
  for (const name in propNames) {
    const prop = obj[name];
    if (typeof prop === 'object' && prop !== null) {
      deepFreeze(prop);
    }
  }
  return Object.freeze(obj);
}

function error(message) {
  console.error(message);
}

export default {
  install(Vue, options) {
    Vue.mixin({
      beforeCreate() {
        const constants = this.$options.const;
        if (!constants) return;
        this.$options.computed = this.$options.computed || {};
        for (const key in constants) {
          if (key !== key.toUpperCase()) {
            error(`Constant '${key}' must be all upper case`);
            return;
          }
          if (constants.hasOwnProperty(key)) {
            const frozen = deepFreeze(constants[key]);
            this.$options.computed[key] = {
              get: () => frozen,
              set: () => error(`Constant '${key}' cannot be changed`),
            }
          }
        }
      }
    });
  }
}
