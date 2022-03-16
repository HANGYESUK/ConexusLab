import React, { useState } from 'react';
import './Qustion.css';
import { useDispatch, useSelector } from 'react-redux';

function Qustion(props) {

    let qustion = props.props;


  return (
    <div className='questionContainer'>
        {
            // 리미트 1이면 라디오버튼으로 출력
            qustion.limit == 1
            ?   <Radio qustion={qustion}/>
            
            // 아니면 체크박스로 출력
            :   <Checkbox qustion={qustion}/>
        }
    </div>
  )
}

//라디오 버튼 컴포넌트
function Radio(props) {

    let state = useSelector((state) => state.radioReducer);

    console.log(state)

    let dispatch = useDispatch();


    return (
        <>
            {
                props.qustion.items.map((item, i)=>{
                    return (
                        <label>
                            <div className='radioContainer low'>
                                <input type="radio" key={i} value={item} name="radio" onChange={
                                    (e)=>{ 
                                        dispatch({type : "라디오 추가", isradio : e.target.value})
                                    }
                                }></input>
                                {item}
                            </div>
                        </label>
                    )
                })
            }
        </>
    )
}

//체크박스 컴포넌트
function Checkbox(props) {

    let state = useSelector((state) => state.checkReducer);

    let dispatch = useDispatch();

    let [ischeck, setIscheck] = useState(true);
    let [checkedItems, setCheckedItems] = useState(new Set());

    const checkHandler = (e)=>{
        setIscheck(!ischeck);
        checkItemHandler(e.value, e.checked)
    }

    const checkItemHandler = (value, ischeck)=>{
        if(ischeck) {
            let Copy = checkedItems
            Copy.add(value);
            setCheckedItems(Copy);
        }
        else if(!ischeck && checkedItems.has(value)) {
            let Copy = checkedItems
            Copy.delete(value);
            setCheckedItems(Copy);
        }
    }

    console.log(checkedItems)

    return(
        props.qustion.items.map((item, i)=>{
            return (
                <label>
                    <div className='checkContainer low'>
                        <input type="checkbox" key={i} value={item} onChange={
                            (e)=>{
                                checkHandler(e.currentTarget)
                                dispatch({type : "체크추가", checkedItems : checkedItems})
                                console.log("체크추가 : ", state)
                            }
                        }></input>
                        <p>{item}</p>
                    </div>
                </label>
            )
        })
    )
}

export default Qustion