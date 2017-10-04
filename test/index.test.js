import assert from 'assert'
import fetchFile from '../lib'
import {randomFileName} from '../lib/utils'
import fs from 'fs'


let readFileText = f => fs.readFileSync(f).toString();
let getFileSize = f => fs.statSync(f).size


describe('fetch-file API的测试', function() {
	// 由于这个是下载操作的套件，所以增长timeout时间
	this.timeout(10000);
	
	it('复制当前测试文件自身应该成功', done => {
		let source = __filename
		let target = randomFileName()
		let onProgress = false
		
		fetchFile(source, target, (size, total) => {
			onProgress = true
			assert.equal(total, getFileSize(source))
		}).then(filename => {
			assert.equal(onProgress, true)
			assert.equal(target, filename)
			assert.equal(readFileText(source), readFileText(target))
			done()
		}).catch(err => {
			throw err
		})
	})

	it('复制一个在线网址网页应该成功', function(done) {
		let url = 'https://www.cuiyongjian.com/index.html'
		let target = randomFileName()
		let onProgress = false
		let contentLength = 0

		fetchFile(url, target, (size, total) => {
			onProgress = true
			contentLength = total
		}).then(filename => {
			assert.equal(onProgress, true)
			assert.equal(getFileSize(target), contentLength)
			done()
		}).catch(err => {
			throw err
		})
	})

	it('复制当前测试文件自身[callback模式]应该成功', done => {
		let source = __filename
		let target = randomFileName()
		let onProgress = false

		fetchFile(source, target, (size, total) => {
			onProgress = true
			assert.equal(total, getFileSize(source))
		}, (err, filename) => {
			console.log('err了没', err, filename, source);
			if (err) throw err
			else {
				assert.equal(filename, target)
				assert.equal(onProgress, true)
				assert.equal(readFileText(source), readFileText(target))
				done()
			}
		})
	})
})

