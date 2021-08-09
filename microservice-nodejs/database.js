// const databaseFunction = () => {
//   const config = {test: "welcome to the config"};
//   const data = [{ title: 'Title of the microservice', content: 'content of the microservice' }];


//   if (config.hasData) {
//     return data;
//   } else {
//     process.exit(1);
//   }
// }

// module.exports = {
//   databaseFunction
// }
const expressServer = require('express')();

expressServer.get('/db', (req, res) => {
    // res.send('db route is here');
    console.log("database service");
    const data = [{title: 'title', content: 'content whatsoever'}];
    res.send(data);
})

expressServer.listen(4000, () => {
  console.log(`server listens to the port 4000`);
});