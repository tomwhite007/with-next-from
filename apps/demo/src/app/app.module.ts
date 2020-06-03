import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDummy from './+state/dummy.reducer';
import { DummyEffects } from './+state/dummy.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forFeature(fromDummy.DUMMY_FEATURE_KEY, fromDummy.reducer),
    EffectsModule.forFeature([DummyEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
