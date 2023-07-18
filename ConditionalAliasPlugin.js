class ConditionalAliasPlugin {
  constructor (options) {
    this.options = options
  }

  apply (resolver) {
    const target = resolver.ensureHook('resolve')
    resolver.getHook('before-resolve').tapAsync('ConditionalAliasPlugin', (request, resolveContext, callback) => {
      if (request.request === this.options.alias && request.context.issuer.includes(this.options.issuer)) {
        const newRequest = {
          ...request,
          request: this.options.target
        }
        return resolver.doResolve(target, newRequest, `Aliased ${request.request} to ${this.options.target}`, resolveContext, callback)
      }
      return callback()
    })
  }
}

module.exports = ConditionalAliasPlugin
