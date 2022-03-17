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
    

  return (
    <div className='surveyContainer colum'>
        <div className='surveyTitle'>
            <h1>{surveyData.payload.title}</h1>
            <img src={surveyData.payload.header_img}/>
        </div>
        {
            surveyData.payload.blocks.map((item, key)=>{
                return( 
                    <div>
                        {
                            item.option.items != null
                            ?  <div className='eventContainer colum' key={key}>
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

            window.localStorage.setItem("radio", state.radioReducer);
            let copy = [...state.checkReducer]
            console.log("보내기 버튼 : ", state)
            for(let i=0; i<copy.length; i++) {
                window.localStorage.setItem(`check${i}`,  copy[i]);
            }

            window.location.href = "/success"
            
        }} className="subBtn">보내기</button>
    </div>
  )
}


export default Event

