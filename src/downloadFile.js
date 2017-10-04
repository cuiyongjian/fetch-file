import fs from 'fs'
import request from 'request'


export default function downloadFile(url, target, progress) {
  return new Promise((resolve, reject) => {
    let targetStream = fs.createWriteStream(target)
    targetStream.on('error', reject)

    let downloadedSize = 0
    let totalSize = 0
    let req = request.get({
      url: url,
      encoding: null
    }).on('response', res => {
      if (res.statusCode !== 200) {
        return reject(new Error(`status # ${res.statusCode}`))
      }

      totalSize = res.headers['content-length'] || null
      res.on('data', data => {
        downloadedSize += data.length
        totalSize && progress && progress(downloadedSize, totalSize)
      })
      res.on('end', () => { resolve(target) })


    }).pipe(targetStream)

  })
}
