var nowjs = require('now'),
express = require('express'),
markdown = require('node-markdown').Markdown;

app = express()
app.get('/', function(req, res) { res.render('index.html'); });
app.use('/', express.static(__dirname))

var server = app.listen(8000),
	everyone = nowjs.initialize(server);

// Defaults
everyone.now.users = []
everyone.now.chats = []

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

everyone.now.sendMessage = function(message) {
	if(this.user.name) {
		everyone.now.chats += {
			user: this.user.name,
			message: markdown(message)
		}
	}
}