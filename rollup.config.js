import RollupNodeResolve from '@rollup/plugin-node-resolve';
import RollupCommonJS from '@rollup/plugin-commonjs';
import RollupAlias from '@rollup/plugin-alias';
import RollupBabel from 'rollup-plugin-babel';
import RollupVue from 'rollup-plugin-vue';
import pkg from './package.json';

const commonPlugins = [
  RollupVue(),
  RollupBabel({
    runtimeHelpers: true,
    extensions: ['.js', '.vue'],
    exclude: 'node_modules/**'
  }),
  RollupAlias({
    entries: []
  }),
  RollupNodeResolve(),
  RollupCommonJS()
];

const commonExternal = function(id) {
  return (
    /^vue/i.test(id) ||
    /^@vue\/composition-api/i.test(id) ||
    /^lodash/i.test(id) ||
    /^axios/i.test(id) ||
    /^@babel\/runtime-corejs3/i.test(id)
  );
};

const config = [
  // form-builder
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named'
      }
    ],
    plugins: [...commonPlugins],
    external: commonExternal
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.module,
        format: 'esm'
      }
    ],
    plugins: [...commonPlugins],
    external: commonExternal
  },

  // element-form-adaptor
  {
    input: 'src/el-form-adaptor.js',
    output: [
      {
        file: 'lib/adaptor/element.js',
        format: 'cjs',
        exports: 'named'
      }
    ],
    plugins: [...commonPlugins],
    external: commonExternal
  },
  {
    input: 'src/el-form-adaptor.js',
    output: [
      {
        file: 'lib/adaptor/element.esm.js',
        format: 'esm'
      }
    ],
    plugins: [...commonPlugins],
    external: commonExternal
  }
];

export default config;
