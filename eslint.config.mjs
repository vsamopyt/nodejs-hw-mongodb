import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    languageOptions: { globals: globals.node },
    files: ['src/**/*.js'],
    rules: {
	    semi: 'error',
	    'no-unused-vars': ['error', { args: 'none' }],
	    'no-undef': 'error'
	  },

},
  pluginJs.configs.recommended,
];
