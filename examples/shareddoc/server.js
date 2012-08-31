var nowjs = require('now'),
	express = require('express'),
	path = require('path'),
    fs = require('fs');

app = express()
app.use("/", express.static(path.join(__dirname, 'static')));

var server = app.listen(8080),
	everyone = nowjs.initialize(server);

// Defaults
everyone.now.pad = fs.readFileSync( __filename, 'utf8');

nowjs.on('connect', function(user) {
    user.on('change: now.pad', function(data) {
        // TODO: better sync, maybe diff's and access control
        everyone.now.pad = data;
    });
});
