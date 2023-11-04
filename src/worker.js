const { parentPort } = require('worker_threads')


parentPort.on('message', (message) => {
    console.log(`${message} --- worker resieved the message`)
    let count = null
    for (let i = 0; i < 1000000000; i++) {
        count = i
    }
    parentPort.postMessage(`Counted to: ${count}`)
    parentPort.postMessage('close')
})