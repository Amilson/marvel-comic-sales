import { AfterViewInit, Component } from '@angular/core';
import { MarvelConfigService } from './core/services/config/marvel-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'marvel-comic-sales';

  constructor(private marvelConfigService: MarvelConfigService) {
    //not to do
  }

  ngAfterViewInit() {
    this.marvelConfigService.init();
  }
}
