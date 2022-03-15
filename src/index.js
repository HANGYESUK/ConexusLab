import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import surveyResult from './surveyResult';

// 라디오버튼 내용
let isradio = "";

function radioReducer(state=isradio, action) {

  let Copy = state

  if(action.type === "라디오 추가") {
    console.log(action.isradio)
    Copy = action.isradio
  }
  else {
    console.log(isradio)
  }
  return Copy 
}

// 체크박스 내용
let checkedItems = [];

function checkReducer(state=checkedItems, action) {

  let Copy = state;

  if(action.type === "체크추가") {
    console.log(action.checkedItems)
    Copy = action.checkedItems
    return Copy
  }
  else {
    return Copy
  }

}

//설문조사 데이터
let surveyData = surveyResult;

function surveyReducer(state=surveyData, action) {

  if(action.type === "체크추가") {
    console.log(action.checkedItems)
    checkedItems = action.checkedItems
    return state
  }
  else {
    console.log(state)
  }

  return state

}

let store = createStore(combineReducers({radioReducer, checkReducer, surveyReducer}));



ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
