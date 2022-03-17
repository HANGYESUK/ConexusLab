import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import surveyResult from './surveyResult';
import Survey from './survey';


// 설문조사 리스트(라디오, 체크박스)
const data = async ()=>{
  const result = await axios.get("http://event.conexuslab.co.kr/survey/1")
  .then((result)=>{console.log(result)})
  .catch((Error)=>{console.log(Error)})
}


let survey = Survey

function surveyReducer(state=survey, action) {
  let Copy = state
  
  return Copy;
}





// 라디오버튼 내용
let isradio = [];

function radioReducer(state=isradio, action) {

  let Copy = state

  if(action.type === "라디오추가") {
    console.log(action.isradio)
    if(action.isradio == null)
    {
      return Copy 
    }
    else{
      Copy[0] = action.isradio
      return Copy
    }

  }
  else {
    return Copy 
  }
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

//설문조사 완료 데이터
let surveyData = surveyResult;

function surveyResultReducer(state=surveyData, action) {

  let Copy = state;

  if(action.type === "설문완료") {
    Copy.payload.push(action.payload)
    return Copy
  }
  else {
    return Copy
  }

}

let store = createStore(combineReducers({surveyReducer, radioReducer, checkReducer, surveyResultReducer}));



ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
