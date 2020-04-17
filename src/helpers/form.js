import validator from 'validator';

const validateValue = (field) => {
    const {
        value, required, length, validation,
    } = field;
    let valid = true;

    if (required) {
        switch (validation) {
        case 'string':
            valid = value ? !validator.isEmpty(value, { ignoreWhitespace: true }) : false;
            break;
        default:
            valid = true;
        }

        if (length && valid) {
            valid = validator.isLength(value, length);
        }
    }

    return valid;
};

const validateField = (field) => {
    const newField = { ...field };

    newField.error = !validateValue(newField);

    return newField;
};

export const handleValidate = (form, inputName) => {
    const newForm = { ...form };

    if (inputName) {
        newForm.fields[inputName] = validateField(newForm.fields[inputName]);
    } else {
        newForm.meta.submitted = true;
    }

    newForm.meta.valid = Object.keys(newForm.fields).every((key) => (!newForm.fields[key].error));

    return newForm;
};
