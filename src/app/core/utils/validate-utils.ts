import { AbstractControl } from '@angular/forms';

export class ComboValidator {
  static do(control: AbstractControl) {
    if (!control.parent || !control) return null;
    if (control && control.value !== '0') return null;
    return {
      invalidCombo: true,
    };
  }
}

export class isTrueValidator {
  static do(control: AbstractControl) {
    if (!control.parent || !control) return null;
    if (control && control.value !== false) return null;
    return {
      invalidTrue: true,
    };
  }
}

export class PasswordMatchValidation {
  static do(control: AbstractControl) {
    if (!control.parent || !control) return null;
    const { parent } = control;
    const password = parent.get('password').value;
    const passwordConfirm = parent.get('passwordConfirm').value;
    if (!password || !passwordConfirm) return null;
    if (password === passwordConfirm) return null;
    return {
      passwordsNotMatching: true,
    };
  }
}
