import { useState } from '@wordpress/element';
import CanvasSpinner from '@wordpress/edit-site/build-module/components/canvas-spinner';
import { mergeWith, isEmpty } from 'lodash';
import {
  Button,
  __experimentalNavigatorProvider as NavigatorProvider,
  __experimentalNavigatorScreen as NavigatorScreen,
  __experimentalNavigatorButton as NavigatorButton,
  __experimentalNavigatorToParentButton as NavigatorToParentButton,
} from '@wordpress/components';
import Preview from './Preview';
import SingleField from './Field';

/** main component */
const ThemerComponent = () => {
  const [con, setCon] = useState();

  /** Gets global Styles ID */
  const getGlobalStylesId = () => wp.data.select('core').__experimentalGetCurrentGlobalStylesId();

  /** Gets base configuration (theme.json) */
  const getBaseConfig = () =>
    wp.data.select('core').__experimentalGetCurrentThemeBaseGlobalStyles();

  /** Gets user configuration from db */
  const getUserConfig = () =>
    wp.data.select('core').getEditedEntityRecord('root', 'globalStyles', getGlobalStylesId());

  const baseConfig = getBaseConfig();
  const userConfig = getUserConfig();

  wp.data.subscribe(() => {
    const newUserConfig = getUserConfig();
    if (userConfig !== newUserConfig) {
      setCon(newUserConfig);
    }
  });

  /** merges base and user configs */
  const mergeBaseAndUserConfigs = (base, user) => mergeWith({}, base, user);

  /** returns theme config */
  const getBase = () => {
    if (!userConfig) {
      return;
    }

    const baseOptions = {
      styles: baseConfig.styles,
      // render only layout from settings
      settings: (({ layout }) => ({ layout }))(baseConfig.settings),
    };
    const userOptions = {
      styles: userConfig.styles,
      // render only layout from settings
      settings: (({ layout }) => ({ layout }))(userConfig.settings),
    };
    const merged = mergeBaseAndUserConfigs(baseOptions, userOptions);
    return merged;
  };

  /** returns base config settings for preset values */
  const dataToPass = () => {
    const base = {
      settings: baseConfig.settings,
    };

    return base;
  };
  /** loops over theme config and returns fields */
  const renderInputs = (data, path = '', child) => {
    const inputs = Object.entries(data).map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        const currentPath = `${path}.${key}`;
        return (
          <div className={`themer-nav-${child}`}>
            <NavigatorProvider initialPath="/">
              <NavigatorScreen path="/">
                <NavigatorButton className="themer-nav-item" path={`/${key}`}>
                  {key}
                </NavigatorButton>
              </NavigatorScreen>
              <NavigatorScreen path={`/${key}`}>
                <span className="nav-top">
                  <NavigatorToParentButton>{`<`}</NavigatorToParentButton>
                  <p className="themer-nav-title">{key}</p>
                </span>
                {renderInputs(value, currentPath, `child`)}
              </NavigatorScreen>
            </NavigatorProvider>
          </div>
        );
      }
      if (typeof value === 'string') {
        const currentPath = path;
        return <SingleField parent={currentPath} id={key} value={value} data={dataToPass()} />;
      }
      return value;
    });
    return inputs;
  };
  /** saves edited entity data  */
  const save = async () => {
    wp.data.dispatch('core').undo();
    try {
      await wp.data
        .dispatch('core')
        .saveEditedEntityRecord('root', 'globalStyles', getGlobalStylesId());
    } catch (err) {
      console.log(err);
    }
  };
  /** resets updated theme db data back to original theme.json */
  const reset = () => {
    wp.data
      .dispatch('core')
      .editEntityRecord('root', 'globalStyles', getGlobalStylesId(), getBaseConfig());
  };

  if (isEmpty(con))
    return (
      <>
        <CanvasSpinner />
      </>
    );

  return (
    <div className="themer-container">
      <div className="themer-preview-container">
        <Preview
          color={con?.styles?.color}
          font={con?.styles?.typography}
          elements={con?.styles?.elements}
        />
      </div>
      <div className="themer-nav-container">
        <Button
          isPrimary
          onClick={() =>
            console.log(
              wp.data
                .select('core')
                .getEditedEntityRecord('root', 'globalStyles', getGlobalStylesId()),
            )
          }
          text="getEntity"
        />
        <Button isPrimary onClick={() => console.log(getBaseConfig())} text="getBase" />
        {renderInputs(getBase(), '', 'parent')}
        <Button isPrimary onClick={() => save()} text="Save to db" />
        <Button isPrimary onClick={() => reset()} text="reset to theme.json" />
      </div>
    </div>
  );
};

export default ThemerComponent;
