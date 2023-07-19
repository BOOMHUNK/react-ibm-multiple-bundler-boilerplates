# Carbon Component Dev

## A sample react project boilerplate, configured to corporate typescript, sass, babel, and vite.js while we develope some customized react components based on Carbon for React by IBM

## Requirements
- (recommended) pnpm to be installed using ```npm install -g pnpm```
- all dependencies to be installed using ```pnpm i``` or ```npm i```

## How to start the project (dev server)
- ```npm run dev```


## Components Structure:
- Within components, have separate folders for:

      atoms - Reusable "atomic" components like inputs, buttons, etc. Name these based on their purpose like TextInput, SelectInput, etc.

      molecules - Slightly more complex reusable components composed of atoms. Name these based on their purpose like SearchBox, DatePicker, etc.

      organisms - Even more complex reusable components composed of molecules and atoms. Name these based on their purpose like Header, Footer, etc.

      pages - Components that represent full pages and are composed of organisms, molecules, and atoms. Name these after the page name like HomePage, ContactPage, etc.

- Within each folder, have an index.js file that exports all the components in that folder.
Import components using relative paths like:

```import { TextInput } from '../atoms';```
```import { Header } from '../organisms';``` 


### Naming Conventions:
Use PascalCase for component names and filenames.

This provides a clean separation of components by complexity/reusability and makes it easy to locate and import components
