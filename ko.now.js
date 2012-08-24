// Knockout Now.js Integration
// (c) James Keane <james.keane.github@gmail.com>
// License: MIT (http://www.opensource.org/licenses/mit-license.php)
(function() {
  // We need this to detect if it is an observable array
  ko.observableArray.fn.__ko_now_isObservableArray = true;

  // All there is, really! now.js is pretty cool
  ko.observable.fn.now = function(name) {
    var sub = this,
        cb = function() {},
        ns = 'now.'+name;

    // Initialize the data, nowjs will query the server
    sub(now[name]);

    // Check if we have an observable array, we need to handle it differently
    if(this.__ko_now_isObservableArray) {
      // now.js sends array updates as 'now.array.%index', so
      // we have to song and dance this
      var re = new RegExp(ns+'.\\d+');
      cb = function(data) {
        for(var k in data) {
          if(re.test(k)) {
            var i = k.substring(k.lastIndexOf('.')+1);
            var v = sub();
            v[i] = data[k];
            sub(v);
          }
        }
      }
    } else {
      // simple update, key -> value
      cb = function(data) {
        if(data[ns] !== undefined ) sub(data[ns]);
      }
    }

    // Hook into the read variable event, that gets fired on every update
    now.core.on('rv', cb);

    // Always return the observable
    return sub;
  }
})();