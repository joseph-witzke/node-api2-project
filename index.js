// require your server and launch it here
const server = require('./api/server'); // commonjs

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});