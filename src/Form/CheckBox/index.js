import React from 'react';
import './index.css'

const InputData = (props) => {
    return (
        <React.Fragment>
           <input type="checkbox" onChange={(e)=> props.onChange(e.target.value)}  id="formBasicCheckbox" checked={props.checked} className="form-check-input" />
        </React.Fragment>
    )
}
export default InputData; 