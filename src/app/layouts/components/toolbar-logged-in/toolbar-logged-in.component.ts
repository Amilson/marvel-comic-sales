import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MarvelConfigService } from 'app/core/services/config/marvel-config.service';
import { MarvelConfig } from 'app/interfaces';
import { BaseComponent } from 'app/shared/components/base/base-component';

@Component({
  selector: 'app-toolbar-logged-in',
  templateUrl: './toolbar-logged-in.component.html',
  styleUrls: ['./toolbar-logged-in.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarLoggedInComponent extends BaseComponent implements OnInit {
  _config: MarvelConfig = null;

  constructor(public _router: Router, private marvelConfigService: MarvelConfigService) {
    super();
  }

  ngOnInit() {
    this.marvelConfigService.config().subscribe((_: MarvelConfig) => {
      this._config = _;
    });
  }
}
