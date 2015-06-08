# Rendr App Template
## GitHub Browser

The purpose of this little app is to demonstrate one way of using Rendr to build a web app that runs on both the client and the server.

![Screenshot](http://cl.ly/image/062d3S2D1Y38/Screen%20Shot%202013-04-09%20at%203.14.31%20PM.png)

## Running the example

First, make sure to have Node >= 0.8.0 [installed on your system](http://nodejs.org/). Also, make sure to have `grunt-cli` installed globally.

    $ npm install -g grunt-cli

If you see an error on startup that looks [like this](https://github.com/rendrjs/rendr-app-template/issues/2), then you may need to un-install a global copy of `grunt`:

    $ npm uninstall -g grunt

Run `npm install` to install dependencies:

    $ npm install

Then, use `grunt server` to start up the web server. Grunt will recompile and restart the server when files change.

    $ grunt server

    Running "runNode" task

    Running "handlebars:compile" (handlebars) task
    11 Dec 17:40:30 - [nodemon] v0.7.10
    11 Dec 17:40:30 - [nodemon] to restart at any time, enter `rs`
    11 Dec 17:40:30 - [nodemon] watching: /Users/spike/code/rendr/examples/00_simple
    File "app/templates/compiledTemplates.js" created.

    Running "browserify:basic" (browserify) task
    11 Dec 17:40:30 - [nodemon] starting `node index.js`
    connect.multipart() will be removed in connect 3.0
    visit https://github.com/senchalabs/connect/wiki/Connect-3.0 for alternatives
    connect.limit() will be removed in connect 3.0
    server pid 86724 listening on port 3030 in development mode
    >> Bundled public/mergedAssets.js

    Running "stylus:compile" (stylus) task
    File public/styles.css created.

    Running "watch" task
    Waiting...

    11 Dec 17:40:32 - [nodemon] starting `node index.js`
    server pid 86728 listening on port 3030 in development mode

Now, pull up the app in your web browser. It defaults to port `3030`.

    $ open http://localhost:3030

You can choose a different port by passing the `PORT` environment variable:

    $ PORT=80 grunt server

### GitHub API rate limit

GitHub [rate limits](http://developer.github.com/v3/#rate-limiting) unauthenticated requests to its public API to 60 requests per hour per IP. This should be enough for just playing with the sample app, but if you pull it down and start developing off it you may run up against the rate limit.

**You've been warned.** Your best bet may be to alter the project to read from your favorite RESTful API.

## Overview

At times, it's useful to have certain contextual data checked on each route request (traditional page request) to determine access to that page or to determine what to show on that page.  This example shows one way of accomplishing this in Rendr.

## License

MIT
