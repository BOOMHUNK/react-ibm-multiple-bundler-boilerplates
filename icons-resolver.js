const { create } = require('enhanced-resolve')

const resolver = create()

const iconsResolver = (request, resolveContext, callback) => {
  const { path, request: iconRequest } = request
  if (path && path.includes('@carbon/icons-react') && !path.includes('@carbon/icons-react10')) {
    const newRequest = {
      ...request,
      path: path.replace('@carbon/icons-react', '@carbon/icons-react10')
    }
    resolver(newRequest, resolveContext, (err, result) => {
      if (err) {
        const fallbackRequest = {
          ...request,
          path: path.replace('@carbon/icons-react', '@carbon/icons-react10')
        }
        resolver(fallbackRequest, resolveContext, callback)
      } else {
        callback && callback(null, result)
      }
    })
  } else {
    callback()
  }
}

iconsResolver.apply = (resolver) => {
  resolver.hooks.describedResolve.tap(
    { name: 'IconsResolver' },
    (request, resolveContext, callback) => {
      iconsResolver(request, resolveContext, callback)
    }
  )
}

module.exports = iconsResolver
