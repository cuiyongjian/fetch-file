console.log('currentFile', __filename)

import copyFile from '../src/copyFile'
console.log('module is ', copyFile)

copyFile(__filename, '/tmp/copy.js', (size, total) => console.log(`进度${size}/${total}`))
  .then(filename => console.log(`已保存到${filename}`))
  .catch(err => console.log(`出错：${err}`));
