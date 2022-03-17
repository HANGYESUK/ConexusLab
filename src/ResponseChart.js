import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import survey from './survey';
import './ResponseChart.css';

function ResponseChart(props) {

    const localStorage = window.localStorage

    // 로컬스토리지 라디오 값
    let localRadio = [];

    // 로컬스토리지 체크 값   
    let localCheck = [];
    
    // 로컬스토리지 null체크 함수
    function nullCheck(item) {
        if(item.length == 0) {
            console.log(localStorage)
            return 0;
        }
        else {
            localRadio = item.getItem("radio")

            for(let i=0; i<item.length - 1; i++) {
                localCheck[i] = item.getItem(`check${i}`)
            }

            surveyResult.payload.push({value: { "1": [localRadio], "2": localCheck }})
        }
    }

    nullCheck(localStorage)


    // 리덕스
    let state = useSelector((state) => state);

    // 설문조사 리스트 데이터
    let surveyData = state.surveyReducer.payload;

    // 설문조사 완료 데이터
    let surveyResult = state.surveyResultReducer;

    console.log(surveyData)
    console.log(surveyResult)



    //라디오 개수
    let radio = [];
    radio.length = surveyData.blocks[0].option.items.length;
    NumAssignment(radio)

    //체크 개수
    let check = [];
    check.length = surveyData.blocks[1].option.items.length;
    NumAssignment(check)

    //라디오 퍼센트지
    let radioPercent = []
    radioPercent.length = radio.length
    NumAssignment(radioPercent)

    //체크박스 퍼센트지
    let checkPercent = [] 
    checkPercent.length = check.length
    NumAssignment(checkPercent)


    //배열에 number 할당
    function NumAssignment(item) {
        for(let i=0; i<item.length; i++) {
            item[i] = 0;
        }
    }
    

    //라디오 항목 갯수
    function countRadio() {
        for(let i=0; i<surveyResult.payload.length; i++) {
            //value가 비어져 있을때
            if(surveyResult.payload[i].value["1"] == null) {
                continue
            }
            // value가 string형태 일때
            else if(typeof(surveyResult.payload[i].value["1"][0]) == 'string') {
                let num = Number(surveyResult.payload[i].value["1"][0]) 
                radio[num] += 1
            }
            // 라디오 배열 null 일때
            else if(surveyResult.payload[i].value["1"][0] == null) {
                continue
            }
            // 나머지
            else {
                radio[ surveyResult.payload[i].value["1"][0] ] += 1
            }
        }
    }

    countRadio();

    console.log(radio)


    //체크박스 항목 갯수 
    function countCheck() {
        for(let i=0; i<surveyResult.payload.length; i++) {
            //value가 비어져 있을때
            if(surveyResult.payload[i].value["2"] == null) {
                continue
            }
            // 체크 배열 크기보다 클때
            else if(surveyResult.payload[i].value["2"].length > checkPercent.length) {
                console.log(surveyResult.payload[i].value["2"])
                continue
            }
            else {
                count(surveyResult.payload[i].value["2"])
            }
        }
    }

    countCheck();

    //value["2"] 배열 갯수
    function count(item) {
        for(let i=0; i<item.length; i++) {
            // value가 string형태 일때
            if(typeof(item[i]) == 'string') {
                let num = Number(item[i]) 
                check[num] += 1
            }
            // 나머지
            else {
                check[ item[i] ] += 1
            }
        }
    }

    console.log(check)


    // 퍼센트 구하는 함수
    function PerChange(item, item2) {

        let count = 0;

        for(let i=0; i<(item.length); i++) {
            count += item[i]
        }

        for(let i=0; i<item.length; i++) {
            item2[i] = (item[i]/count) * 100
        }

    }

    //라디오 퍼센트 
    PerChange(radio, radioPercent)

    //체크박스 퍼센트 
    PerChange(check, checkPercent)


    //소수점 첫번째로 변환 + number타입으로 변환
    function toFix(item) {
        for(let i=0; i<item.length; i++) {
            item[i] = item[i].toFixed(1)
            item[i] = Number(item[i])
        }

        console.log(item)
    }

    toFix(radioPercent)

    toFix(checkPercent)






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
                                                        <Radio props={item} radioPercent={radioPercent[i]} radio={radio[i]}/>
                                                    )
                                                })
                                            }
                                        </div>

                                    :   <div className='colum'>
                                            <h2>{item.option.title}</h2>
                                            {
                                                item.option.items.map((item, i)=>{
                                                    return(
                                                        <Checkbox props={item} checkPercent={checkPercent[i]} check={check[i]}/>
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

    let chart2 = {
        width: `${props.radioPercent}%`
    }

    return (
        <div className='chart'>
            <div className='chart2' style={chart2}>
            </div>
            <div className='chart2Box'>
                <p>{props.radioPercent}%</p>
                <p>{quest}</p>
                <p>{props.radio}</p>
            </div>
        </div>
    )
}

//체크박스 컴포넌트
function Checkbox(props) {

    let quest = props.props

    let chart2 = {
        width: `${props.checkPercent}%`
    }

    
    return (
        <div className='chart'>
            <div className='chart2' style={chart2}>
            </div>
            <div className='chart2Box'>
                <p>{props.checkPercent}%</p>
                <h2>{quest}</h2>
                <p>{props.check}</p>
            </div>
        </div>
        )
}


export default ResponseChart