import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MarvelHttpConfigLoadingInProgressInterceptor } from './marvel-http-config-loading-in-progress.interceptor';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';

@NgModule({
  imports: [MarvelCoreCommonModule, OverlayModule, A11yModule],
})
export class MarvelHttpConfigInterceptorModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MarvelHttpConfigInterceptorModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MarvelHttpConfigLoadingInProgressInterceptor,
          multi: true,
        },
      ],
    };
  }
}
