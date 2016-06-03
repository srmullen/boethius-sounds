const koa = require('koa');
const router = require('koa-router')();
const serve = require('koa-static');

const app = koa();

app.use(serve('.'));

app.use(router.routes());

const PORT = 3000;

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
