"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
const bufferModule = require('buffer');
// Node 25 removed SlowBuffer, but jsonwebtoken -> jwa still references it.
if (!bufferModule.SlowBuffer) {
    bufferModule.SlowBuffer = buffer_1.Buffer;
}
require('./server');
