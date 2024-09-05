# themer
WordPress plugin that presents the user with a UI to edit the theme.json from the currently active theme.

## Installing
When installing to your site, add the following to you `composer.json` file. This will ensure that installation will use the build version of the package and allow it to be loaded using composer in the preferred path.
```json
{
  "repositories": [
    {
      "type": "vcs",
      "url": "git@github.com:@big-bite/themer.git"
    }
  ],
  "require": {
    "@big-bite/themer": "dev-main-built"
  },
  "extra": {
    "installer-paths": {
      "plugins/{$name}/": [
        "type:wordpress-plugin"
      ]
    }
  }
}

```

## Local Development or Manual Install
Clone the repository into your `plugins` or `client-mu-plugins` directory.
```
git clone git@github.com:@big-bite/themer.git && cd themer
```

Install JS packages.
```
npm install
```

Build all assets
```
npm run build:prod
```

Install PHP packages and create autoloader for the plugin.
```
composer update
```

# Installation

## Prerequisites

- **WordPress:** 6.2
- **PHP:** 8.0

# Features

## Obtaining data
Similar to how the core WP full site editor obtains data, the themer plugin uses experimental core functions to achieve this.
```
const getGlobalStylesId = () => wp.data.select('core').__experimentalGetCurrentGlobalStylesId();
```
```
const getBaseConfig = () => wp.data.select('core').__experimentalGetCurrentThemeBaseGlobalStyles();
```
```
const getUserConfig = () => wp.data.select('core').getEditedEntityRecord(
	'root',
	'globalStyles',
	getGlobalStylesId()
);
```

BaseConfig provides the basic empty object where userConfig is any edited values.


## Saving data
On edit, the state is updated using `editEntityRecord('root', 'globalStyles', getGlobalStylesId(), { (value) })` then on save, these changes are published to the DB
using `wp.data.dispatch('core').saveEditedEntityRecord('root', 'globalStyles', getGlobalStylesId())`.

A revision is also created in the DB for each save. 


## Issues

 We welcome bug reports, feature requests, questions, and pull requests. If you spot any mistakes or have an idea to make the plugin better, just [open an issue](https://github.com/bigbite/themer/issues/new/choose).

## Contributing

Please read [Code of Conduct](./CODE_OF_CONDUCT.md) for details on our code of conduct and [Contributing](./CONTRIBUTING.md) for details on the process for submitting pull requests to us.