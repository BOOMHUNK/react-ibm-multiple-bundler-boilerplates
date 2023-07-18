# react-ts-sass-webpack5 + ibdotcom-react

A sample react project boilerplate, configured to use typescript, sass, and babel, using webpack 5
Trying to add ibdotcom-react into this project while it has dependancies on @carbon/icons-react@10.49.1 and conflicting with our currently installed @carbon/icons-react version 11+.
+ fixed undefined process by providing a simple custom plugin inside webpack.config.js:
   ```new webpack.DefinePlugin({
      process: { env: {} }
    }),```

## Work In Progress:

Installed the older version under alias "@carbon/icons-react10" using ```pnpm add @carbon/icons-react10@npm:@carbon/icons-react@10.49.1```

and replaced use cases by the 'carbon-components-react' to use the aliased one by running the ```force-compatible.js``` script.

all errors gone except an undefined type error...


