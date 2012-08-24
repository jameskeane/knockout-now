var nowjs = require('now'),
	fs = require('fs'),
	express = require('express'),
	mime = require('mime'),
	path = require('path'),
	markdown = require('node-markdown').Markdown,
	sanitizer = require('sanitizer');

var renderStatic = function(relpath) {
	var apath = path.join(__dirname, relpath),
		type = mime.lookup(apath);

	return function (req, res) {
		fs.readFile(apath, 'utf8', function(err, text){
			res.type(type);
        	res.send(text);
    	});
    };
}

app = express()
app.get('/', renderStatic('index.html'));
app.get('/ko.now.js', renderStatic('../../ko.now.js'));
app.get('/style.css', renderStatic('style.css'));

var server = app.listen(5000),
	everyone = nowjs.initialize(server);

// Defaults
everyone.now.users = [];
everyone.now.chats = [];
everyone.now.memoryUsage = process.memoryUsage().rss;
everyone.now.upTime = 0;

// every 10 seconds poll for the memory.
setInterval(function () {
  //everyone.now.memoryUsage = process.memoryUsage().rss;
}, 10*1000);
// every second update uptime, this is unneccessary but good for demostration
setInterval(function() {
	//everyone.now.upTime += 1;
}, 1000);

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
	console.log(message);
	if(this.user.name) {
		everyone.now.chats.push({
			user: this.user.name,
			message: markdown(sanitizer.escape(message)),
			time: (new Date()).toTimeString()
		});
	}
}

// When they disconnect, remove them from the users lists
// TODO: now.js could use a way to do this
nowjs.on('disconnect', function () { 
	if(this.user.name !== undefined && everyone.now.users.indexOf(this.user.name) != -1 ) {
		delete everyone.now.users[everyone.now.users.indexOf(this.user.name)];
	}
});