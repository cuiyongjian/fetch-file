import fs from 'fs'

export default function copyFile(source, target, progress) {
	return new Promise((resolve, reject) => {
		fs.stat(source, (err, states) => {
			if (err) return reject(err)

			let sourceStream = fs.createReadStream(source)
			let targetStream = fs.createWriteStream(target)
			
			sourceStream.on('error', reject)
			targetStream.on('error', reject)
			
			let copyedSize = 0
			sourceStream.on('data', (data) => {
				copyedSize += data.length
				progress && progress(copyedSize, states.size)
			})
			sourceStream.on('end', () => resolve(target))

			sourceStream.pipe(targetStream)

		})	
	})
}
