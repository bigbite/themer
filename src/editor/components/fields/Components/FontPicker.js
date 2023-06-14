/* eslint-disable no-param-reassign */

import {
  FontSizePicker,
  SelectControl,
  Button,
  __experimentalInputControl as InputControl,
  __experimentalToggleGroupControl as ToggleGroup,
  __experimentalToggleGroupControlOptionIcon as ToggleIcon,
} from '@wordpress/components';

/** returns component for font options */
const FontPicker = (props) => {
  /** returns preset font sizes from theme.json */
  const getFontSizes = () => {
    const sizes = props?.data?.settings?.typography?.fontSizes?.theme;
    return sizes;
  };

  /** returns preset font families from theme.json */
  const getFontFamilies = () => {
    const fonts = props?.data?.settings?.typography?.fontFamilies?.theme;
    const result = [];
    fonts.forEach((item) => {
      item.slug = item.slug.replace(/\s+/g, '-');
      result.push({
        value: item.slug,
        label: item.name,
      });
    });
    return result;
  };

  /** handles line height incremental input */
  const getLineHeight = (val, dir) => {
    let increment;
    if (dir === 'minus') {
      increment = -0.1;
    } else increment = 0.1;
    const number = parseFloat(val);
    const result = parseFloat(number + increment)
      .toFixed(1)
      .toString();
    return result;
  };

  switch (props.id) {
    case 'fontSize':
      return (
        <FontSizePicker
          fontSizes={getFontSizes()}
          value={props.value}
          onChange={(val) => props.onChange(val)}
        />
      );
    case 'fontFamily':
      return (
        <SelectControl
          options={getFontFamilies()}
          value={props.value}
          onChange={(val) => props.onChange(val)}
        />
      );
    case 'lineHeight':
      return (
        <InputControl
          value={props.value}
          onChange={(val) => props.onChange(val)}
          suffix={
            <>
              <Button
                text="+"
                onClick={() => {
                  props.onChange(getLineHeight(props.value, 'plus'));
                }}
              />
              <Button
                text="-"
                onClick={() => {
                  props.onChange(getLineHeight(props.value, 'minus'));
                }}
              />
            </>
          }
        />
      );
    case 'textDecoration':
      return (
        <>
          <ToggleGroup
            onChange={(val) => {
              props.onChange(val);
            }}
          >
            <ToggleIcon value="none" label="none" icon="minus" />
            <ToggleIcon value="underline" label="Underline" icon="editor-underline" />
            <ToggleIcon value="line-through" label="Strikethrough" icon="editor-strikethrough" />
          </ToggleGroup>
        </>
      );
    default:
      return null;
  }
};

export default FontPicker;
