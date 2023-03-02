const { useState, useRef, useEffect, useReducer, useContext, createContext } = wp.element;
import TextInput from './fields/TextInput';
import { dispatchContexts, showContexts } from './ThemeSettings';

const ComponentWrapper = () => {
  const dispatch = dispatchContexts();

  const showDialog = () => {
    console.log('kkk');
    dispatch({ type: 'showDialog', value: true });
  };

  return (
    <>
      <div className="App">
        <TextInput />
        <button onClick={showDialog}>show Dialog</button>
      </div>
    </>
  );
};

export default ComponentWrapper;
