import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class MarvelSplashScreenService {
  private splashScreenEl: any;

  private player: AnimationPlayer;

  constructor(private animationBuilder: AnimationBuilder, @Inject(DOCUMENT) private document: any) {
    this.splashScreenEl = this.document.body.querySelector('#marvel-splash-screen');
  }

  show(): void {
    this.player = this.animationBuilder
      .build([
        style({
          opacity: '0',
          zIndex: '99999',
        }),
        animate(
          '400ms ease',
          style({
            opacity: '1',
          })
        ),
      ])
      .create(this.splashScreenEl);

    setTimeout(() => {
      this.player.play();
    }, 0);

    this.document.body.style.pointerEvents = 'none';
  }

  hide(): void {
    this.player = this.animationBuilder
      .build([
        style({
          opacity: '1',
        }),
        animate(
          '400ms ease',
          style({
            opacity: '0',
            zIndex: '-10',
          })
        ),
      ])
      .create(this.splashScreenEl);

    setTimeout(() => {
      this.player.play();
    }, 0);

    this.document.body.style.pointerEvents = 'all';
  }
}
