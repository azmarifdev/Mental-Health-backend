import { Buffer } from 'buffer';

type BufferModuleWithSlowBuffer = typeof import('buffer') & {
   SlowBuffer?: typeof Buffer;
};

const bufferModule = require('buffer') as BufferModuleWithSlowBuffer;

// Node 25 removed SlowBuffer, but jsonwebtoken -> jwa still references it.
if (!bufferModule.SlowBuffer) {
   bufferModule.SlowBuffer = Buffer;
}

require('./server');
