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
        ns = 'now.'+name,
        re = new RegExp('^'+ns),
        update = function(data) {
            for(var k in data) {
                if(re.test(k)) {
                    sub(now[name]);
                    break;
                }
            }
        };

    // Bind the update function to the appropriate events (update, delete)
    now.core.on('rv', update);
    now.core.on('del', update);

    // Initialize the data, nowjs will query the server
    now.ready(function() {
      if(now[name] !== undefined) sub(now[name]);
    });

    // Always return the observable
    return sub;
  }
})();
