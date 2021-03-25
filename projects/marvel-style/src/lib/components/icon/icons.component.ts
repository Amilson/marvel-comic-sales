import { Component, ViewEncapsulation, Input, Directive } from '@angular/core';

@Directive({
  selector: '[baseIcon]',
})
class BaseIconComponent {
  @Input() fillColor: string;

  @Input() size: string;
}

@Component({
  selector: 'marvel-icon-eye-closed',
  templateUrl: `../../../../assets/icons/eye-closed.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconEyeClosedComponent extends BaseIconComponent {}

@Component({
  selector: 'marvel-icon-eye',
  templateUrl: `../../../../assets/icons/eye.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconEyeComponent extends BaseIconComponent {}

@Component({
  selector: 'marvel-icon-facebook',
  templateUrl: `../../../../assets/icons/facebook.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconFacebookComponent extends BaseIconComponent {}

@Component({
  selector: 'marvel-icon-google',
  templateUrl: `../../../../assets/icons/google.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconGoogleComponent extends BaseIconComponent {}

@Component({
  selector: 'marvel-icon-mail',
  templateUrl: `../../../../assets/icons/mail.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconMailComponent extends BaseIconComponent {}

@Component({
  selector: 'marvel-icon-user',
  templateUrl: `../../../../assets/icons/user.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconUserComponent extends BaseIconComponent {}
