import React from 'react';
import { useSelector } from 'react-redux';

function Success() {

    const state = useSelector((state)=>state)

    // 설문조사 리스트의 블럭들
    let survey= state.surveyReducer.payload.blocks

    // 설문조사 리스트 블럭 배열 마지막
    const surveyData = survey[survey.length - 1]

    console.log(state)

    const colum = {
        width: `${surveyData.option.width}%`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }

    const btn = {
        width: '200px',
        height: '50px',
        border: 'none',
        backgroundColor: 'rgb(59, 128, 255)',
        color: 'white',
        borderRadius: '10px',
        cursor: 'pointer'
    }

  return (

        <div style={colum}>
            <div style={colum}>
                <h1>{ surveyData.option.submitMsg }</h1>
                <img src={ surveyData.option.btnImg }/>
                <button style={btn} onClick={()=>{
                    window.location.href = "/chart"
                }}>응답자 통계 보기</button>
            </div>
        </div>

  )
}

export default Success