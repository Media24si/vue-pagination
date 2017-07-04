import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import path from 'path';
import fs from 'fs';

const pack = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'));

export default {
  entry: 'src/index.js',
  targets: [
    { format: 'es', dest: `dist/${pack.name}.esm.js` },
    { format: 'cjs', dest: `dist/${pack.name}.common.js` }
  ],
  plugins: [
    vue({
        compileTemplate: true,
        standalone: true
    }),
    buble()
  ],
  useStrict: false
};
