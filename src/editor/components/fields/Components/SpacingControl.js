import { useState } from '@wordpress/element';

import {
  Button,
  RangeControl,
  __experimentalUnitControl as UnitControl,
} from '@wordpress/components';

/** renders component for managing spacing elements */
const SpacingControl = (props) => {
  const { value, data } = props;
  const [toggle, setToggle] = useState(isNaN(Array.from(value)[0]));

  /** returns default markers for spacing component */
  const getRangeMarks = (val) => {
    const marks = data?.settings?.spacing?.spacingSizes?.theme;
    const result = [];
    marks.forEach((item) => {
      result.push({
        value: item.size,
        label: item.name,
      });
    });
    if (val) {
      return result[val].value;
    }

    return result;
  };

  return (
    <>
      <Button icon="menu" onClick={() => setToggle(!toggle)} isPressed={!toggle} />
      {toggle && (
        <>
          <RangeControl
            min={1}
            max={getRangeMarks().length - 1}
            marks={getRangeMarks}
            onChange={(val) => props.onChange(getRangeMarks(val))}
          />
        </>
      )}
      {!toggle && (
        <>
          <UnitControl
            value={props.value}
            onChange={(val) => {
              props.onChange(val);
            }}
          />
        </>
      )}
    </>
  );
};

export default SpacingControl;
