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
import {
  MarvelButtonModule,
  MarvelModalModule,
  MarvelStyleModalService,
  MarvelStyleModule,
} from 'marvel-style';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MarvelHttpConfigInterceptorModule } from './core/interceptors';
import { SharedVersionChangedComponent } from './shared/components';

@NgModule({
  declarations: [AppComponent, SharedVersionChangedComponent],
  imports: [
    BrowserModule,
    MarvelCoreCommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MarvelStyleModule,
    TranslateModule.forRoot(),
    MarvelConfigModule.forRoot(),
    MarvelHttpConfigInterceptorModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MarvelModalModule,
    MarvelButtonModule,
  ],
  providers: [MarvelStyleModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
