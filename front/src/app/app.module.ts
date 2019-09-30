import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MzCollapsibleModule, MzIconModule, MzIconMdiModule } from 'ngx-materialize';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StopEffects } from './effects/stop.effects';
import { StopComponent } from './stop/stop.component';
import { MapModule } from './modules/map/map.module';
import { StopReducer } from './reducers/stop.reducer';
import { StopService } from './services/stop.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { MzRadioButtonModule } from 'ngx-materialize';
import { StopItemComponent } from './stop/stop-item/stop-item.component';
import { FormsModule } from '@angular/forms';
import { MzInputModule } from 'ngx-materialize';
@NgModule({
  declarations: [
    AppComponent, StopComponent, StopItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MzCollapsibleModule,
    ChartsModule,
    MzIconModule,
    MzIconMdiModule,
    MzRadioButtonModule,
    MzInputModule,
    StoreModule.forRoot({Stations: StopReducer}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([StopEffects]),
    MapModule
  ],
  providers: [StopService],
  bootstrap: [AppComponent]
})
export class AppModule { }
