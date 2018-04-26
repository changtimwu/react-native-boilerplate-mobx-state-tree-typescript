global.Buffer = require('buffer').Buffer;
global.process = require('process');
global.btoa = (b) => Buffer.from(b).toString('base64')
// Needed so that 'stream-http' chooses the right default protocol.
global.location = {
    protocol: 'file:'
}
// Some modules expect userAgent to be a string
global.navigator.userAgent = 'React Native';
