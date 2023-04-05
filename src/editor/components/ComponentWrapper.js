const { useState, useRef, useEffect, useReducer, useContext, createContext } = wp.element;
import TextInput from './fields/TextInput';
import { dispatchContexts, showContexts } from './ThemeSettings';
import Fields from './fields/Fields';

const ComponentWrapper = () => {
  const dispatch = dispatchContexts();

  const showDialog = () => {
    dispatch({ type: 'showDialog', value: true });
  };

  const hideDialog = () => {
    dispatch({ type: 'hideDialog', value: false });
  };

  return (
    <>
      <div className="App">
        {/* <TextInput /> */}
        <Fields />
        {/* <button onClick={showDialog}>show Dialog</button>
        <button onClick={hideDialog}>hide Dialog</button> */}
      </div>
    </>
  );
};

export default ComponentWrapper;
