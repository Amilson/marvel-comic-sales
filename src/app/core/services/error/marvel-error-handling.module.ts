import { ErrorHandler, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { MarvelErrorHandlingService } from './marvel-error-handling.service';

@NgModule({
  imports: [MarvelCoreCommonModule],
})
export class MarvelErrorHandlingModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MarvelErrorHandlingModule,
      providers: [
        {
          provide: ErrorHandler,
          useClass: MarvelErrorHandlingService,
        },
      ],
    };
  }
}
