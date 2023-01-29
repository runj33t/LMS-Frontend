// Next.js CUSTOM SERVER SETUP for development environment
// to implement cookie based authentication system, both client and server running on same domain
// but in development environment client is running on 3000 and server is running on 8000
// so we need to use proxy
// for that we have installed one package http-proxy-middleware

// to use proxy in nextjs, we need to create custom server, this is for development mode only!
// since in production mode we will use same domain for client and server 

// after we have this file we will run this server file to run the frontend i.e. 
// in package.json file in the script, we need to do the following changes
// "dev":"next dev" to "dev" : "node server.js"

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const next = require('next');

// setting dev environment as dev,,, i.e. when NODE_ENV is not equal to production, means we are in
// development mode
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    // checking dev environment
    if (dev) {
        server.use(
            "/api",
            createProxyMiddleware({
                target: "http://localhost:8000",    // i.e. anywhere in the front, we can use /api it will target the http://localhost:8000
                changeOrigin: true,
            })
        );
    }

    // any request coming to the server, we are going to handle those req and res
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    // finally listening to the server at 3000 (i.e. frontend server)
    server.listen(3000, (err) => {
        if (err) throw err;
        console.log("Ready on http://localhost:8000");
    });
})
    .catch((err) => {
        console.log("ERROR ", err);
    })