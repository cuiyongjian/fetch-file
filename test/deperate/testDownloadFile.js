import downloadFile from '../../lib/downloadFile'
let url = 'https://www.cuiyongjian.com/index.html'

downloadFile(url, '/tmp/downloadFile.html', (size, total) => console.log(`进度: ${size}/${total}`))
	.then(filename => console.log(`已保存到 ${filename}`))
	.catch(err => console.log(`出错: ${err}`))
