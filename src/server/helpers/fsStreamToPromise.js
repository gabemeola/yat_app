import fs from 'fs';


/**
 * Returns a Promise from createReadStream pipe.
 * Resolves Promise when end of data event fires.
 * Rejects Promise when error occurs in stream.
 *
 * @param {String} filePath - File Path to create readable stream from
 * @param {Stream} writableStream - Writable Stream to write to
 * @return {Promise}
 */
const streamToPromise = (filePath, writableStream) => new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
        .on('error', reject)
        .on('end', resolve)
        .pipe(writableStream, { end: false });
});


export default streamToPromise;
