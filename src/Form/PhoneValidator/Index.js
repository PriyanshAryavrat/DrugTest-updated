import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';
import { Input } from 'reactstrap';
import PhoneInput from "react-phone-input-2";

class TextValidator extends ValidatorComponent {

    render() {
        const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;

        return (
            <div>
                <PhoneInput
                    country={"us"}
                    disableCountryCode="true"
                    maxLength={15}
                    onlyCountries={["us"]}
                    buttonStyle={{ display: "none" }}
                    placeholder="eg: (123) 121-4444"
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
