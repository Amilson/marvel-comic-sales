import { Component, ViewEncapsulation, Input, Directive } from '@angular/core';

@Directive({
  selector: '[baseIcon]',
})
class BaseIconComponent {
  @Input() fillColor: string;

  @Input() size: string;
}

@Component({
  selector: 'marvel-icon-arrow-left',
  templateUrl: `../../../../assets/icons/arrow-left.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconArrowLeftClosedComponent extends BaseIconComponent {}

@Component({
  selector: 'marvel-icon-arrow-down',
  templateUrl: `../../../../assets/icons/arrow-down.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconArrowDownClosedComponent extends BaseIconComponent {}

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
  selector: 'marvel-icon-facebook-round',
  templateUrl: `../../../../assets/icons/facebook-round.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconFacebookRoundComponent extends BaseIconComponent {}

@Component({
  selector: 'marvel-icon-google',
  templateUrl: `../../../../assets/icons/google.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconGoogleComponent extends BaseIconComponent {}

@Component({
  selector: 'marvel-icon-heart',
  templateUrl: `../../../../assets/icons/heart.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconHeartComponent extends BaseIconComponent {}

@Component({
  selector: 'marvel-icon-instagram-round',
  templateUrl: `../../../../assets/icons/instagram-round.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconInstagramRoundComponent extends BaseIconComponent {}

@Component({
  selector: 'marvel-icon-mail',
  templateUrl: `../../../../assets/icons/mail.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconMailComponent extends BaseIconComponent {}

@Component({
  selector: 'marvel-icon-search',
  templateUrl: `../../../../assets/icons/search.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconSearchComponent extends BaseIconComponent {}

@Component({
  selector: 'marvel-icon-trash',
  templateUrl: `../../../../assets/icons/trash.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconTrashComponent extends BaseIconComponent {}

@Component({
  selector: 'marvel-icon-twitter-round',
  templateUrl: `../../../../assets/icons/twitter-round.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconTwitterRoundComponent extends BaseIconComponent {}

@Component({
  selector: 'marvel-icon-user',
  templateUrl: `../../../../assets/icons/user.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconUserComponent extends BaseIconComponent {}

@Component({
  selector: 'marvel-icon-x-circle',
  templateUrl: `../../../../assets/icons/x-circle.svg`,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconXCircleComponent extends BaseIconComponent {}
