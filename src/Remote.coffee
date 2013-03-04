qs = require 'querystring'

class module.exports.Remote
  constructor: (@options = {}) ->
    do @parseOptions
    @http = require 'http'
    return @

  parseOptions: =>
    throw 'You must specify at least the remote code' unless @options.code?
    @options.host ?= 'hd1.freebox.fr'
    @options.port ?= 80
    @options.path ?= '/pub/remote_control'

  press: (options = {}, fn = (->)) =>
    options = key: options if typeof options is 'string'
    throw 'You must specify at least the key' unless options.key?
    options.basePath ?= @options.path
    options.args ?= {}
    options.args.key ?= options.key
    options.args.code ?= @options.code
    options.query ?= qs.stringify options.args
    options.path ?= "#{options.basePath}?#{options.query}"
    options.host ?= @options.host
    options.port ?= @options.port
    options.method ?= 'GET'
    req = @http.request options
    req.on 'error', (err) -> fn err, {}
    req.end()
    req.on 'response', (response) ->
      buffer = ''
      response.on 'data', (chunk) -> buffer += chunk
      response.on 'end', ->
        switch response.statusCode
          when 200 then fn null, buffer
          else          fn {"code": "BADSTATUSCODE", "message": response.statusCode}, buffer
