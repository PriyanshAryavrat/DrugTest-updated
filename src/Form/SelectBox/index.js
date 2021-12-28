import React from 'react';
import './index.css'

const SelectBox = () => {
    return (
        <React.Fragment>
             <div className="form-group formbox selectbox">
                <label>Driver Type</label>
                <select>
                  <option value="OD">Owner</option>
                  <option value="LM">LLC Member</option>
                  <option value="CO">Corporate Officer</option>
                  <option value="DR">Driver</option>
                </select>
              </div>
        </React.Fragment>
    )
}
export default SelectBox; 