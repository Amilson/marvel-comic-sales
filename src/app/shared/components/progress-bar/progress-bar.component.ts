import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MarvelProgressBarService } from './progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MarvelProgressBarComponent implements OnInit {
  visible: boolean = false;

  constructor(private marvelProgressBarService: MarvelProgressBarService) {
    //not to do
  }

  ngOnInit() {
    this.marvelProgressBarService.visibleConfig().subscribe((visible: boolean) => {
      this.visible = visible;
    });
  }
}
