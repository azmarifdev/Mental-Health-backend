import { Buffer } from 'buffer';
import app from '../src/app';
import connectDatabase from '../src/shared/connectDatabase';

type BufferModuleWithSlowBuffer = typeof import('buffer') & {
   SlowBuffer?: typeof Buffer;
};

const bufferModule = require('buffer') as BufferModuleWithSlowBuffer;

if (!bufferModule.SlowBuffer) {
   bufferModule.SlowBuffer = Buffer;
}

export default async function handler(req: any, res: any) {
   await connectDatabase();
   return app(req, res);
}
