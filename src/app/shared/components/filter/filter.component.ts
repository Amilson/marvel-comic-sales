import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MarvelConfigService } from 'app/core/services/config/marvel-config.service';
import { MarvelConfig } from 'app/interfaces';
import { BaseComponent } from 'app/shared/components/base/base-component';

@Component({
  selector: 'shared-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedFilterComponent extends BaseComponent implements OnInit {
  _config: MarvelConfig = null;

  constructor(private marvelConfigService: MarvelConfigService) {
    super();
  }

  ngOnInit() {
    this.marvelConfigService.config().subscribe((_: MarvelConfig) => {
      this._config = _;
    });
  }
}
