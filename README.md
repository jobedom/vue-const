# vue-const

Adds a constants section in Vue components. 


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
