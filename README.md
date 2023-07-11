# react-ts-sass-webpack5

A sample react project boilerplate, configured to use typescript, sass, and babel, using webpack 5

The order in which loaders are specified in the Webpack configuration file does matter. However, in the case of TypeScript and Babel, it is more common to use babel-loader before ts-loader. This is because Babel can handle certain features and optimizations that TypeScript does not, such as polyfills and a wide range of plugins
By using babel-loader first, you can take advantage of these features and optimizations before the TypeScript code is compiled to JavaScript by ts-loader.
