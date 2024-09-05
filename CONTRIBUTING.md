# Contributing to Themer

First off, thanks for taking the time to contribute! 

All types of contributions are encouraged and valued. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us to manage the project.

## Ways to contribute

Contributing to Themer involves more than just writing code; it includes any improvements to the project. All contributions are managed here on GitHub.

## I Have a Question

Before you ask a question, it is best to search for existing [Issues](https://github.com/bigbite/themer/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](https://github.com/bigbite/themer/issues/new).
- Provide as much context as you can about what you’re running into.
- Provide project and platform versions, depending on what seems relevant.

## I want to report a bug

### Before Submitting a Bug Report

A good bug report shouldn’t leave others needing to chase you up for more information. Therefore, we ask you to investigate carefully, collect information and describe the issue in detail in your report. Please complete the following steps in advance to help us fix any potential bug as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment/versions
- Collect information about the bug:
    - OS, Browser and Version
    - Can you reliably reproduce the issue? And can you also reproduce it with older versions?

### How Do I Submit a Good Issue?

We use GitHub issues to track Feature Requests, using the following template:

**Expected Behavior**

Describe what should happen.

**Actual Behavior**

Describe what actually happens.

**Step-by-step reproduction instructions**

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'

**Screenshots, screen recordings, code snippets**

If possible, please upload a screenshot or screen recording which demonstrates the bug.

**System Information**

- Device: <!-- e.g. iPhone 12 -->
- Operating System: <!-- e.g. iOS 16.6 -->
- Browser: <!-- e.g. Chrome 118 -->
<!-- Or paste a link from [https://www.whatsmybrowser.org](https://www.whatsmybrowser.org/) -->
- WordPress version: <!-- e.g. "5.8.0". Find this in Tools → Site Health → Info → WordPress -->
- PHP version: <!-- e.g. "8.2". Find this in Tools → Site Health → Info → Server -->

## Suggesting a Feature Request or Enhancement

This section guides you through submitting a feature request for Themer, including completely new features and minor improvements to existing functionality.

### Before Submitting a Feature Request

- Make sure that you are using the latest version.
- Perform a [search](https://github.com/bigbite/themer/issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.

### How Do I Submit a Good Feature Request?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/bigbite/themer/issues), using the following template:

**What problem does this address?**

**What is your proposed solution?**

## Workflow

### Branching

No code should be committed directly to primary branches. These branches are linked to specific environments, so processes such as code reviews **MUST** take place before working branches are merged into primary branches. 

 `main`

The "source of truth". Any and all branches should be created using `main` as a base. This is the branch against which new production releases are created. Only branches that meet all of the following criteria should be merged into `main`:

- Pull Request has been approved
- Internal Testing has passed

### Working branches

Branches that are used for any issues or contributions. They should be prefixed in one of three ways:

- `feature/*`
- `hotfix/*`
- `fix/*`

Where the asterisks represent placeholders for the actual branch name. The name **MUST** be a brief description of the branch's purpose, e.g. `feature/map-block`, `hotfix/map-block-fatal-error`, `fix/map-block-mobile-layout`.

A `feature/*` branch should be used when implementing a new feature, or an extension of a feature.

Both `hotfix/*` and `fix/*` branches are used when modifying an existing feature to correct its behaviour. The difference is the level of urgency. A `hotfix/*` is generally released outside of the usual release cycle, because it contains a critical, urgent, or high priority change. A `fix/*` is generally planned into the usual release cycle.