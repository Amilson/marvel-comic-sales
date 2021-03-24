import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { MarvelConfigService } from './marvel-config.service';

@NgModule()
export class MarvelConfigModule {
  constructor(@Optional() @SkipSelf() parentModule: MarvelConfigModule) {
    if (parentModule) {
      throw new Error('MarvelConfigModule is already loaded. Import it in the AppModule only!');
    }
  }

  static forRoot(): ModuleWithProviders<MarvelConfigModule> {
    return {
      ngModule: MarvelConfigModule,
      providers: [MarvelConfigService],
    };
  }
}
