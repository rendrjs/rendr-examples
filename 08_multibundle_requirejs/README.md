## Introduction

This example shows how to leverage requirejs bundling for a rendr app. 

This allows the javascript code and the handlebars templates to be packaged together in different bundles to be loaded through requirejs.  The advantage of this approach is optimal performance for only loading bundled portions of the code on demand.

### How to Run

To run the example app:

1) Run `npm install`
2) Run `grunt server`
3) The app should run on localhost:3030.  You can inspect the Network to see how the bundles are loaded on demand when navigating.

## Global Define

This example uses the global-define NPM package to include/define dependencies: https://www.npmjs.com/package/global-define

**TODO: Change this to use https://www.npmjs.com/package/rjs-commonjs to support a better development experience**

Note: this is used instead of browserify and vanilla CommonJs requires.

## Bundling

### Relative Paths and Views/Models/Collections

To make bundling easier to specify with a glob syntax, it's best to have bundles separated by folders.

Currently, the easiest way in Rendr to break up a multibundle RequireJS project is to adopt the following structure:

```
├─┬ app
│ ├─┬ collections
│ │ ├─┬ bundle1
│ │ │ ├── collection_a
│ │ │ └── collection_b
│ │ └─┬ bundle2
│ │   ├── collection_c
│ │   └── collection_d
│ ├── controllers
│ │ ├─┬ bundle1
│ │ │ ├── controller_a
│ │ │ └── controller_b
│ │ └─┬ bundle2
│ │   ├── controller_c
│ │   └── controller_d
│ ├── lib
│ ├─┬ models
│ │ ├─┬ bundle1
│ │ │ ├── model_a
│ │ │ └── model_b
│ │ └─┬ bundle2
│ │   ├── model_c
│ │   └── model_d
│ ├─┬ templates
│ │ ├─┬ bundle1
│ │ │ ├── templates_a
│ │ │ └── templates_b
│ │ └─┬ bundle2
│ │   ├── templates_c
│ │   └── templates_d
│ ├─┬ views
│ │ ├─┬ bundle1
│ │ │ ├── views_a
│ │ │ └── views_b
│ │ └─┬ bundle2
│ │   ├── views_c
│ │   └── views_d
│ │

```

There are better structures (see https://github.com/rendrjs/rendr/issues/493), but they have yet to be incorporated into Rendr.

One change for accessing models and collections with this approach is to specify the path to the model and collection. In a normal example, you might have: 

```js
      var spec = {
        model: {model: 'User', params: params},
        repos: {collection: 'Repos', params: {user: params.login}}
      };
```

But with the extra path, it should specified snake-cased and relative:

```js
      var spec = {
        model: {model: 'users_bundle/user', params: params},
        repos: {collection: 'repos_bundle/repos', params: {user: params.login}}
      };
```

This model and collection naming should both correspond to the folder structure AND to the `exports.id` of the model or collection, eg `exports.id = 'users_bundle/user';`

### Templates

Templates are compiled in this example through Handlebars and are included in the appropriate bundle.  This is specified in the Gruntfile.

### Javascript files

Javascript files are bundled with `multibundle-requirejs`.

There is a common module which should have all the base functionality needed to optimize the user experience.

Then, the rest of the code should be in bundles, normally by logical function.  In this example, we have users and repos as separate bundles.  This is probably not what you would want in a real-world app.

## Mapping the bundles

RequireJS knows how to load the bundle asynchronously through a mapping that is generated which maps all the different resources to a file.  

In this example, we use the `multibundle-mapper` npm module to create this and in this example, we create it into a config file which is compatible with the [node-config module](https://www.npmjs.com/package/config).

## index.js

 In `index.js`, we use `node-config` to write the common path and the into the requireJs bundle mapping into the `app`.

## __layout.hbs

Include the common script here.

## Main file

The main file, specified in `Gruntfile.js`'s `multibundle-requirejs`'s config, accesses the `app`s requireJsBundles (which was written in `index.js`) and sets that into the requireJs config. 

In this example, the requireJsMain file is located in `assets/js/requireJsMain`.

## License

MIT
