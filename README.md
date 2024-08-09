# themer

# Installation

## Prerequisites

-   **WordPress:** 6.2
-   **PHP:** 8.0

## Local Development or Manual Install

Clone the repository into your `plugins` or `client-mu-plugins` directory.

```
git clone git@github.com:bigbite/themer.git && cd themer
```

Install JS packages.

```
npm install
```

Install PHP packages and create autoloader for the plugin.

```
composer update
```

Build all assets

```
npm run build:prod
```

Or run in watch mode

```
npm run watch:dev
```

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

## Using experimental APIs

There are 280 experimental APIs in WordPress core that shouldn't have been merged with the experimental prefix. By it's nature this plugin needs to use some of the latest APIs as full site editing is still in constant development. The guidance is to check the API still exists in core (don't check in the Gutenberg plugin as it could be removed). The core team now discourage the experimental prefix and all existing APIs are being converted so risk should be low. [Further reading](https://make.wordpress.org/core/2022/08/10/proposal-stop-merging-experimental-apis-from-gutenberg-to-wordpress-core/)

### Please ensure the following when using experimental APIs

1. Make sure we’re using the stable alias on experimental imports, for example

`import { __experimentalVStack as VStack } from '@wordpress/components';`

2. Only use \_\_experimental that have been merged to core, to ensure this DO NOT USE THE GUTENBERG PLUGIN , if an experimental API is merged to core then it will gradually get handled in future core releases.
