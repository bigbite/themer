# Themer

Themer is a WordPress plugin that provides a UI for users to edit the [theme.json](https://developer.wordpress.org/themes/global-settings-and-styles/) file of your currently active theme. It was built as a companion to the [Site Editor](https://wordpress.org/documentation/article/site-editor/) allowing for even more granular control over your site styles through a dedicated UI.

## Features

-   Edit and add new styles to your theme.json file through the UI
-   Edit global styles, block styles and element styles
-   Edit pseudo-class styles on elements
-   Edit elements and pseudo-class styles within specific blocks
-   Built in accessibility checker for colour contrast
-   Contextual view of theme.json code whilst editing styles
-   Option to export theme.json file for inclusion in your theme

![86068](https://github.com/user-attachments/assets/b036dc73-4252-407c-bdf8-75dd46fc2606)

## Installing

### Prerequisites

-   **WordPress:** 6.2
-   **PHP:** 8.0

### Via Composer

When installing to your site, add the following to you `composer.json` file. This will ensure that installation will use the build version of the package and allow it to be loaded using composer in the preferred path.

```json
{
	"repositories": [
		{
			"type": "vcs",
			"url": "git@github.com:@bigbite/themer.git"
		}
	],
	"require": {
		"@bigbite/themer": "^1.0.0"
	},
	"extra": {
		"installer-paths": {
			"plugins/{$name}/": [ "type:wordpress-plugin" ]
		}
	}
}
```

## Local Development or Manual Install

Clone the repository into your `plugins` or `client-mu-plugins` directory.

```
git clone git@github.com:@bigbite/themer.git && cd themer
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

## Issues

We welcome bug reports, feature requests, questions, and pull requests. If you spot any mistakes or have an idea to make the plugin better, just [open an issue](https://github.com/bigbite/themer/issues/new/choose).

## Contributing

Please read [Code of Conduct](./CODE_OF_CONDUCT.md) for details on our code of conduct and [Contributing](./CONTRIBUTING.md) for details on the process for submitting pull requests to us.
