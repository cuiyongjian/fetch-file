import fetch-file from '../index'

let source = "https://www.cuiyongjian.com/index.html"
let target = "~/Desktop/index.html"

let progress = (size, total) => console.log(`进度${(size/total*100).toFixed(2)}%: ${size}/${total}`)

fetch-file(source, target, progress).then(filename => console.log(`已保存到: ${filename}`))
	.catch(err=>console.log(`出错了: ${err}`))


/*
 也可以使用callback模式
 fetch-file(source, target, progress, (err, filename) => {
	if (err) console.log(`出错了: ${err}`)
	else console.log(`已保存到: ${filename}`)
 })
 *
 */
