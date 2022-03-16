import React from 'react';
import Survey from './survey';

function Success() {
    
    console.log(Survey)

    const survey = Survey.payload.blocks

    const surveyData = survey[survey.length -1]

    console.log(surveyData)

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