import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";


export function mustMatch(password: string, confirmPassword: string): ValidatorFn{
    return (ctrl: AbstractControl): ValidationErrors | null => {
        const passwordControl = ctrl.get(password);
        const confirmPasswordControl = ctrl.get(confirmPassword)

        if(confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']){
            return null
        }

        if(passwordControl.value != confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({mustMatch: true})
        }else{
            confirmPasswordControl.setErrors(null)
        }

        return null
    }
}

