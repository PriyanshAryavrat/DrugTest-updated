import React from 'react';
import './index.css'

const InputData = (props) => {
    return (
        <React.Fragment>
            <div className="form-group formbox signature-box m8">
                <label>Signature</label>
                <input onChange={(e)=> props.onChange(e)} type="file" id="formBasicCheckbox" className="form-check-input" 
                // validators={['isFile', 'maxFileSize:' + 1 * 1024 * 1024, 'allowedExtensions:image/png,image/jpeg']}
                // errorMessages={['File is not valid', 'Size must not exceed 1MB', 'Only png and jpeg']}
                />
            </div>
        </React.Fragment>
    )
}
export default InputData; 