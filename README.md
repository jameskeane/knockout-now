Knockout-Now
============

What?
----------
Knockout-Now is a plugin for [Knockout.js](http://knockoutjs.com/) that adds automatic synchronization between client views and server variables using [Now.js](http://nowjs.com/).  It is amazingly amazing, and awesomely awesome.

Usage:
----------
In your Knockout ViewModel:
```javascript
this.clicks = ko.observable().now('clicks');
```
and that's it ... **really**!  Now your data-bound views will automagically update; whenever ``` now.clicks ``` is changed from the server.
i.e.
```javascript
everyone.now.clicks += 1;
```

Is it any good?
---------------
Yes!

Prove it!
---------
Okie Dokie, check it out:
 * [Chat Example](http://calm-hollows-8884.herokuapp.com/)

Notes:
---------
Due to a bug, in the *last* release of Now.js (0.8.1).  You must use my branch, this can be done by adding a dependency to your package.json file like this:
```javascript
"now": "git://github.com/jameskeane/now.git",
```