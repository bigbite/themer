/* eslint no-underscore-dangle: 0 */

import { set, merge } from 'lodash';
import ComponentMap from './ComponentMap';
import { useState } from '@wordpress/element';

/**
 * main component
 */
const SingleField = ({ value, parent, id, data }) => {
  /**
   * gets ID for global styles
   */
  const getGlobalStylesId = () => wp.data.select('core').__experimentalGetCurrentGlobalStylesId();
  const [text, setText] = useState(value);
  const context = { ...{} };

  /**
   * updates entity record on field edit
   */
  const edit = (path, newValue) => {
    const current = {
      ...wp.data.select('core').getEditedEntityRecord('root', 'globalStyles', getGlobalStylesId()),
    };
    const updated = set(context, path, newValue);
    const newObj = merge(current, updated);
    wp.data.dispatch('core').editEntityRecord('root', 'globalStyles', getGlobalStylesId(), {
      styles: newObj.styles || {},
      settings: newObj.settings || {},
    });
  };

  /**
   * gets field path and value and passes to edit
   */
  const onChange = (e) => {
    let path = `${parent}.${id}`;
    if (path.charAt(0) === '.') {
      path = path.substring(1);
    }
    setText(e);
    edit(path, e);
  };
  return (
    <>
      <div className="themer-nav-item">{id}</div>
      <ComponentMap
        label={id}
        value={text ? text : value}
        onChange={(val) => onChange(val)}
        parent={parent}
        data={data}
      />
    </>
  );
};;;;;;;;;;;;;;;;;;;;;;

export default SingleField;
