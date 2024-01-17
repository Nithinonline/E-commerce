const app = require("./App");
const connectDatabase = require("./DB/Database");

//3.handling uncaught errors
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`)
    console.log('shutting down the server for handling uncaught exception')
});



//2.Config

if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({
        path: 'Config/.env'
    });

}

//5.connect DB

connectDatabase()


//1.create server

const server = app.listen(process.env.PORT,
    () => {
        console.log(`server is running on http://localhost:${process.env.PORT}`);
       
    });


//4.unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`shutting down the server for ${err.message}`)
    console.log(`shutting down  the server for unhandled promise rejection`);

    server.close(() => {
        process.exit(1)
    });
})


