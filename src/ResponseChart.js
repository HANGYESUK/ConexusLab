import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import survey from './survey';
import './ResponseChart.css';

function ResponseChart(props) {
    
    
    //라디오 개수
    let radio = [0,0,0,0,0];

    //체크 개수
    let check = [0,0,0,0];

    //퍼센트지
    let radioPercent = [0,0,0,0,0]

    let surveyData = survey.payload;

    console.log(surveyData)

    let state = useSelector((state) => state.surveyReducer);

    // console.log(radio);

    // console.log(typeof(state.payload[102].value["1"][0]));

    // if(state.payload[102].value["1"] == null) {
    //     console.log(true)
    // }

    function countRadio() {
        for(let i=0; i<state.payload.length; i++) {
            //value가 비어져 있을때
            if(state.payload[i].value["1"] == null) {
                continue
            }
            // value가 string형태 일때
            else if(typeof(state.payload[i].value["1"][0]) == 'string') {
                let num = Number(state.payload[i].value["1"][0]) 
                radioPercent[num] += 1
            }
            // 라디오 배열 크기보다 클때
            else if(state.payload[i].value["1"][0] >= radioPercent.length) {
                continue
            }
            // 나머지
            else {
                radioPercent[ state.payload[i].value["1"][0] ] += 1
            }
        }
    }

    countRadio();

    console.log(radio)


    // 퍼센트 구하는 함수
    function PerChange(item) {

        let count = 0;

        for(let i=0; i<(item.length - 1); i++) {
            count += item[i]
            console.log(item[i])
        }

        for(let i=0; i<item.length; i++) {
            item[i] = (item[i]/count) * 100
        }

        console.log(radioPercent)
    }

    //라디오 퍼센트 
    PerChange(radioPercent)


    //소수점 첫번째로 변환 + number타입으로 변환
    function toFix(item) {
        for(let i=0; i<item.length; i++) {
            item[i] = item[i].toFixed(1)
            item[i] = Number(item[i])
        }

        console.log(item)
    }

    toFix(radioPercent)






    // state의 데이터 길이(i)만큼 반복해주세요
        //  payload의 i 번째 의 value중에서 1번으 

  return (
    <div>
        <h1>차트</h1>

        {
            surveyData.blocks.map((item, key)=>{
                return( 
                    <div className='low'>
                        {
                            item.option.items != null
                            
                            ?  (item.option.limit == 1

                                    ?  <div className='colum'>
                                            <h2>{item.option.title}</h2>
                                            {
                                                item.option.items.map((item, i)=>{
                                                    return(
                                                        <Radio props={item} i={i} radioPercent={radioPercent}/>
                                                    )
                                                })
                                            }
                                        </div>

                                    :   <div className='colum'>
                                            <h2>{item.option.title}</h2>
                                            {
                                                item.option.items.map((item)=>{
                                                    return(
                                                        <Checkbox props={item}/>
                                                    )
                                                })
                                            }
                                        </div>

                                ) 

                            :   null
                        }
                    </div>
                )
            })
        }
    </div>
  )
}


//라디오 버튼 컴포넌트
function Radio(props) {

    let quest = props.props

    console.log(props.i)

    let chart2 = {
        width: `${props.radioPercent[props.i]}%`
    }

    return (
        <div className='chart low'>
            <p>{props.radioPercent[props.i]}</p>
            <div className='chart2' style={chart2}>
                <p>{quest}</p>
            </div>
        </div>
    )
}

//체크박스 컴포넌트
function Checkbox(props) {

    let quest = props.props
    console.log(quest)
    return (
        <div className='chart'>
            <div className='chart2'>
                <h2>{quest}</h2>
            </div>
        </div>
        )
}


export default ResponseChart