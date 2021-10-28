import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation';
import { IValidation } from '../../presentation/helpers/validators/validation';
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite';
import { makeSignUpValidation } from './signup-validation';

jest.mock('../../presentation/helpers/validators/validation-composite');

describe('SignUpValidation Factory', () => {
    test('should call ValidationComposite with all validations', () => {
        makeSignUpValidation();
        const validations: IValidation[] = [];
        for (const field of [
            'name',
            'email',
            'password',
            'passwordConfirmation',
        ]) {
            validations.push(new RequiredFieldValidation(field));
        }
        expect(ValidationComposite).toHaveBeenCalledWith(validations);
    });
});