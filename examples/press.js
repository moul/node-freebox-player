// Generated by CoffeeScript 1.4.0
(function() {
  var Remote, remote;

  process.stdout.write('\u001B[2J\u001B[0;0f');

  Remote = require('..').Remote;

  remote = new Remote({
    host: 'hd2.freebox.fr',
    code: '97760494'
  });

  remote.press('up', function(err, result) {
    return console.log(err, result);
  });

}).call(this);
