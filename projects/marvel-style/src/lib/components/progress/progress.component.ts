import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'marvel-progress',
  template: `
    <div class="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelProgressComponent {}
