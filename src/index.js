function deepFreeze(obj) {
   const propNames = Object.getOwnPropertyNames(obj)
   for (const name in propNames) {
      const prop = obj[name]
      if (typeof prop === 'object' && prop !== null) {
         deepFreeze(prop)
      }
   }
   return Object.freeze(obj)
}

function error(message) {
   console.error(message)
}

const REGEXP_CONSTANT = /^[A-Z_][A-Z0-9_]*$/

export default {
   install(Vue) {
      Vue.mixin({
         beforeCreate() {
            const constants = this.$options.const
            if (!constants) return
            this.$options.computed = this.$options.computed || {}
            for (const key in constants) {
               if (constants.hasOwnProperty(key)) {
                  if (!REGEXP_CONSTANT.test(key)) {
                     error(`Constant '${key}' must use upper case letters and underscores`)
                     continue
                  }
                  const frozen = deepFreeze(constants[key])
                  this.$options.computed[key] = {
                     get: () => frozen,
                     set: () => error(`Constant '${key}' cannot be changed`),
                  }
               }
            }
         },
      })
   },
}
