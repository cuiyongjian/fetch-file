import mkdirp from 'mkdirp'
import path from 'path'
import {callbackify, noop, randomFileName, isURL} from './utils'
import downloadFile from './downloadFile'
import copyFile from './copyFile'


let fetchFile = function fetch(source, target, progress) {
	// 允许调用者设置fetch.tmpDir来改变临时目录
	target = target || randomFileName(fetch.tmpDir)
	// 空函数判断
	progress = progress || noop
	return new Promise((resolve, reject) => {
		mkdirp(path.dirname(target), err => {
			if (err) return reject(err)
			resolve((isURL(source) ? downloadFile : copyFile)
				(source, target, progress))
		})
	})

}

export default callbackify(fetchFile)
