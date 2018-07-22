const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
// 默认赋值
const {
  PORT = 3000,
  PWD = __dirname,
} = process.env;
const app = express();

// data schema with graphqlHTTP configuration
app.use('/q', graphqlHTTP(req => ({
  schema,
  context: req.session,
})));

// 将静态资源放进public中, 防止通过HTTP访问到server等后端程序和数据
app.use('/dist', express.static(path.resolve(PWD, 'build', 'public')));
// 等同于
// app.use('/dist/:file', (req, res) => {
//   res.sendFile(req.param.file, {
//     root: path.resolve(PWD, 'build', 'public'),
//   });
// });


app.use('*', (req, res) => {
  res.sendFile('index.html', {
    root: PWD,
  });
});

// 用于命令行: PORT=3000 node ./build/server.js
app.listen(PORT, () => console.log(`Server is Running port ${PORT}`));
