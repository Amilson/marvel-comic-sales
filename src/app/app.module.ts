import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MarvelConfigModule } from './core/services/config/marvel-config.module';
import { HttpClientModule } from '@angular/common/http';
import { MarvelCoreCommonModule } from './shared/modules/marvel-core-common.module';
import { TranslateModule } from '@ngx-translate/core';
import { MarvelStyleModule } from '../../projects/marvel-style/src/public-api';
import { AngularFireModule } from '@angular/fire';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MarvelCoreCommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MarvelStyleModule,
    TranslateModule.forRoot(),
    MarvelConfigModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
