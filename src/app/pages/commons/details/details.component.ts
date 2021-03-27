import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  HostBinding,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MarvelConfig } from 'app/interfaces';
import { BaseComponent } from 'app/shared/components/base/base-component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsComponent extends BaseComponent implements AfterViewInit, OnDestroy {
  _isSubmitting: boolean = false;

  _loginForm: FormGroup;

  _config: MarvelConfig = null;

  constructor(private elRef: ElementRef) {
    super();
  }

  ngAfterViewInit() {
    document.documentElement.style.setProperty(
      '--mc-details-image',
      `url(${'http://i.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/portrait_uncanny.jpg'})`
    );
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
