import React,{useState,useEffect} from 'react';

const InputRow =(props)=>{
    return(
        <React.Fragment>
            <input 
            className="form-group formbox"
            type={props.type}
            onChange={(e)=> props.onChange(e.target.value)} 
            placeholder={props.placeholder}
            value={props.value} />
        </React.Fragment>
    )
}
export default InputRow;