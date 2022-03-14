import { useEffect, useState } from 'react';
import Qustion from './Component/Qustion';
import Survey from './survey';
import './Event.css';
import { useDispatch, useSelector } from 'react-redux';

function Event(props) {

    //리덕스 모든 데이터
    let state = useSelector((state) => state);

    let dispatch = useDispatch();

    //설문 데이터
    let surveyData = Survey
    

  return (
    <div className='surveyContainer'>
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
            window.localStorage.setItem("test", "Hello World");
            console.log("보내기 버튼 : ", state)
        }}>보내기</button>
    </div>
  )
}

export default Event

