import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';
import { Input } from 'reactstrap'
import CountrySelector from "../../Component/CountrySelector";

class TextValidator extends ValidatorComponent {

    render() {
        const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;

        return (
            <div>
                <CountrySelector
                    className="form-control"
                    {...rest}
                    ref={(r) => { this.input = r; }}
                />
                {this.errorText()}
            </div>
        );
    }

    errorText() {
        const { isValid } = this.state;

        if (isValid) {
            return null;
        }

        return (
            <div className="text-danger">
                {this.getErrorMessage()}
            </div>
        );
    }
}

export default TextValidator;
