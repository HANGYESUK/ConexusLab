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

    let dispatch = useDispatch();

    //라디오버튼 체크 여부 확인
    function checked() {
        let check = document.querySelectorAll('input[name="radio"]')
        for(let i=0; i<check.length; i++) {
            if(check[i].checked == true) {
                check[i].parentElement.classList.add('checked')
            }
            else {
                check[i].parentElement.classList.remove('checked')
            }
        }
    }


    return (
        <>
            {
                props.qustion.items.map((item, i)=>{
                    return (
                        <label>
                            <div className='radioContainer low'>
                                <input type="radio" name="radio" id={i} value={item} onChange={
                                    (e)=>{ 
                                        console.log(e.target.id)
                                        checked()
                                        dispatch({type : "라디오 추가", isradio : e.target.id})
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

    //체크박스 체크배열 상태
    let state = useSelector((state) => state.checkReducer);

    let dispatch = useDispatch();

    let [ischeck, setIscheck] = useState(true);
    let [checkedItems, setCheckedItems] = useState(new Set());

    const checkHandler = (e)=>{
        setIscheck(!ischeck);
        console.log(e.name)
        checkItemHandler(e.name, e.checked)
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


    return(
        props.qustion.items.map((item, i)=>{
            return (
                <label>
                    <div className='checkContainer low'>
                        <input type="checkbox" name={i} value={item} onChange={
                            (e)=>{
                                checkHandler(e.target)
                                // 체크배열 상태를 redux 로 보냄
                                dispatch({type : "체크추가", checkedItems : checkedItems})
                                console.log("체크추가 : ", state)
                                e.currentTarget.parentElement.classList.toggle('checked')
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