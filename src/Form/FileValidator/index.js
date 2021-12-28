import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';
import { Input } from 'reactstrap';
import "./index.css";

class FileValidator extends ValidatorComponent {
    render() {
        const { errorMessages, validators, requiredError, validatorListener, value, ...rest } = this.props;
        return (
            <div className="uploadfile">
                <Input
                    className="form-control"
                    type="file" {...rest} />
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

export default FileValidator;
