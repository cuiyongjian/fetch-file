import path from 'path'
import os from 'os'


let getTmpDir = os.tmpdir
let randomString = (size = 6, chars = 'abcdefghijklmnopqrstuvwxyz0123456789') => {
	let randomRange = chars.length + 1
	let rel = ''
	while(size) {
		// 从0 到 chars.length+1 之间取随机整数
		rel += chars.charAt(Math.floor(0 + Math.random() * randomRange))
		size--
	}
	return rel
}

export function randomFileName(tmpDir = getTmpDir()) {
	return path.resolve(tmpDir, randomString(20))
}

export function isURL(url) {
	if (url.slice(0, 7) === 'http://' || url.slice(0, 8) === 'https://') return true
	return false
}


export function callbackify(fn) {
  let argc = fn.length;
  return (...args) => {
    let callback = args[argc];
    if (typeof callback !== 'function') callback = null;
    return fn(...args)
      .then(ret => {
        callback && callback(null, ret);
        return Promise.resolve(ret);
      })
      .catch(err => {
        callback && callback(err);
        return Promise.reject(err);
      });
  }
}



export function noop() {}
