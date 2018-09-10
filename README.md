# vue-const

Adds a constants section in Vue components. 

[![npm](https://img.shields.io/npm/v/vue-const.svg)](https://www.npmjs.com/package/vue-const)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/react.svg)](https://www.npmjs.com/package/vue-const)
[![npm](https://img.shields.io/npm/dt/vue-const.svg)](https://www.npmjs.com/package/vue-const)
[![NpmLicense](https://img.shields.io/npm/l/vue-const.svg)](https://www.npmjs.com/package/vue-const)

Install:

    npm install vue-const

or

   yarn add vue-const

Enable it in your project:

    import VueConst from 'vue-const';
    Vue.use(VueConst);

You can now declare your constants (must use all upper case identifiers):

    export default {
      const: {
        NAME_OF_CONSTANT: value1, 
        OTHER: value2, 
        ...
      }
    }

Constants defined this way are used like any data property (for example by `this.NAME` in code or simply `NAME` in templates). Obviously, they are not reactive.
