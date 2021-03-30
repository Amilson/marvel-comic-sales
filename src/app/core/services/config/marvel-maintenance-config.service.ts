import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MarvelConfigBoostrap } from 'app/interfaces/marvel-config-boostrap';

@Injectable({
  providedIn: 'root',
})
export class MarvelMaintenanceConfigService {
  constructor(private router: Router) {
    // not to do
  }

  private handleValidation(config: MarvelConfigBoostrap) {
    if (config.maintenance.closed) {
      localStorage.clear();
      this.router.navigate(['']);
    }
  }

  public apply(config: MarvelConfigBoostrap) {
    this.handleValidation(config);
  }
}
