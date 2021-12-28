import React from 'react';
import './index.css'

const InputData = (props) => {
    return (
        <React.Fragment>
            <div className="bottom-btn-group pull-right">
                <button type="submit" className="bluebg margin-right5">Save</button>
                <button type="button" className="bluebg">Save &amp; Print</button>
            </div>
        </React.Fragment>
    )
}
export default InputData; 