#!/usr/bin/env coffee

# clear terminal
process.stdout.write '\u001B[2J\u001B[0;0f'

{Remote} = require '..'

remote = new Remote
  host: 'hd2.freebox.fr'
  code: '97760494'

remote.press 'up', (err, result) ->
  console.log err, result

