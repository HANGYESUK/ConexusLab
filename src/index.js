import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

// 라디오버튼 내용
let isradio = "";

function radioReducer(state=isradio, action) {

  if(action.type === "라디오 추가") {
    console.log(action.isradio)
    isradio = action.isradio
  }
  else {
    console.log(isradio)
  }
  return isradio
}

// 체크박스 내용
let checkedItems = [];

function checkReducer(state=checkedItems, action) {

  if(action.type === "체크추가") {
    console.log(action.checkedItems)
    checkedItems = action.checkedItems
    return state
  }
  else {
    return checkedItems
  }

}

let store = createStore(combineReducers({radioReducer, checkReducer}));



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
