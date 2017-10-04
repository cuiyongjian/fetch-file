import fetchFile from '../src/index'


fetchFile(__filename, '/tmp/copy.js', (size, total) => console.log(`进度: ${size}/${total}`))
	.then(filename => console.log('看下resolve的是啥', filename))
	.catch(err => console.log(`出错: ${err}`))
