var nowjs = require('now'),
	fs = require('fs'),
	express = require('express'),
	mime = require('mime'),
	path = require('path'),
	markdown = require('node-markdown').Markdown,
	sanitizer = require('sanitizer');

app = express()
app.use("/", express.static(__dirname + '/static'));

var server = app.listen(8080),
	everyone = nowjs.initialize(server);

// Defaults
everyone.now.users = [];
everyone.now.chats = [];
everyone.now.memoryUsage = process.memoryUsage().rss;

// every 10 seconds poll for the memory.
setInterval(function () {
  everyone.now.memoryUsage = process.memoryUsage().rss;
}, 10*1000);

// User requests to join the chat room
everyone.now.join = function(name, cb) {	
	if(everyone.now.users.indexOf(name) == -1) {
		// Add user
		this.user.name = name;
		everyone.now.users.push(name);
		cb(true);
	} else {
		cb(false);
	}
}

// The user sends the message, we parse it and pass it around
everyone.now.sendMessage = function(message) {
	if(this.user.name) {
		everyone.now.chats.push({
			user: this.user.name,
			message: markdown(sanitizer.escape(message)),
			time: (new Date()).toTimeString()
		});
	}
}

// When they disconnect, remove them from the users lists
nowjs.on('disconnect', function (conn) { 
	if(conn.user.name !== undefined && everyone.now.users.indexOf(conn.user.name) != -1 ) {
        
        // TODO: This is pretty bad, but now forces us to splice this way. 
        var clone = everyone.now.users.slice(0);
        clone.splice(everyone.now.users.indexOf(conn.user.name), 1);
	    everyone.now.users = clone;
    }
});
