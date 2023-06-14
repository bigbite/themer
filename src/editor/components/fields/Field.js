/* eslint no-underscore-dangle: 0 */

import { set, merge } from 'lodash';
import ComponentMap from './ComponentMap';

const { useState } = wp.element;

/** main component */
const SingleField = (props) => {
  /** gets ID for global styles */
  const getGlobalStylesId = () => wp.data.select('core').__experimentalGetCurrentGlobalStylesId();
  const [text, setText] = useState(props.value);
  const context = { ...{} };

  /** updates entity record on field edit */
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

  /** gets field path and value and passes to edit */
  const onChange = (e) => {
    let path = `${props.parent}.${props.id}`;
    if (path.charAt(0) === '.') {
      path = path.substring(1);
    }
    setText(e);
    /** passes object values to edit */
    function updateObject(newValue, newPath) {
      edit(newPath, newValue);
    }
    updateObject(e, path);
  };
  return (
    <>
      <div className="themer-nav-item">{props.id}</div>
      <ComponentMap
        label={props.id}
        value={text ? text : props.value}
        onChange={(val) => onChange(val)}
        parent={props.parent}
        data={props.data}
      />
    </>
  );
};

export default SingleField;
