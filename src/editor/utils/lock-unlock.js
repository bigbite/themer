import { __dangerousOptInToUnstableAPIsOnlyForCoreModules } from '@wordpress/private-apis';
export const { lock, unlock } =
    __dangerousOptInToUnstableAPIsOnlyForCoreModules(
        'I know using unstable features means my plugin or theme will inevitably break on the next WordPress release.',
        '@wordpress/block-editor' // Name of the package calling __dangerousOptInToUnstableAPIsOnlyForCoreModules,
        // (not the name of the package whose APIs you want to access)
    );