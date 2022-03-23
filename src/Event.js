import { useEffect, useState } from 'react';
import Qustion from './Component/Qustion';
import Survey from './survey';
import './Event.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Event(props) {

    //리덕스 모든 데이터
    let state = useSelector((state) => state);

    let dispatch = useDispatch();

    //설문 데이터
    const surveyData = state.surveyReducer

    //라디오, 체크박스 null체크 함수
    function nullCheck(radio, check) {
        if(radio.length == 0) {
            if(check.length == 0) {
                return null;
            }
            else {            
                let copy = [...check]
                for(let i=0; i<copy.length; i++) {
                    window.localStorage.setItem(`check${i}`,  copy[i]);
                }
            }
        }
        else {
            if(check.length == 0) {
                window.localStorage.setItem("radio", radio);
            }
            else {
                let copy = [...check]
                for(let i=0; i<copy.length; i++) {
                    window.localStorage.setItem(`check${i}`,  copy[i]);
                }
                window.localStorage.setItem("radio", radio);
            }
        }
        
    }


    

  return (
    <div className='surveyContainer colum'>
        <div className='surveyTitle'>
            <h1>{surveyData.payload.title}</h1>
            <img src={surveyData.payload.header_img}/>
        </div>
        {
            surveyData.payload.blocks.map((item, i)=>{
                return( 
                    <div key={i}>
                        {
                            item.option.items != null
                            ?  <div className='eventContainer colum'>
                                    <h3>{item.option.title}</h3>
                                    <Qustion props={item.option}/>
                               </div>
                            :null
                        }
                    </div>
                )
            })
        }
        <button type='submit' onClick={()=>{

            const data = async ()=>{
                const result = await axios.post("http://event.conexuslab.co.kr/survey/1/answers", {
                    user_id: "",
                    value: state
                })
                .then((result)=>{console.log(result)})
                .catch((Error)=>{console.log(Error)})
            }
              
            data()

            dispatch({ 
                type: "설문완료", 
                payload : { user_id : "한규석",
                            value: {"1": state.radioReducer,
                                    "2": state.checkReducer} } })
                                
            nullCheck(state.radioReducer, state.checkReducer)

            console.log(state)

            window.location.href = "/success"
            
        }} className="subBtn">보내기</button>
    </div>
  )
}


export default Event

