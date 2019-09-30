import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopComponent } from './stop.component';
import { MzCollapsibleModule, MzIconModule, MzIconMdiModule, MzRadioButtonModule, MzInputModule } from 'ngx-materialize';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StopItemComponent } from './stop-item/stop-item.component';
import { StopService } from '../services/stop.service';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Stop } from '../model/stop';
describe('StopComponent', () => {
  let component: StopComponent;
  let fixture: ComponentFixture<StopComponent>;
  // let store: MockStore<{ loggedIn: boolean }>;
  const initialState = { loggedIn: false };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule,
        FormsModule, MzCollapsibleModule,
        ChartsModule,
        MzIconModule,
        MzIconMdiModule,
        MzRadioButtonModule,
        MzInputModule],
      declarations: [ StopComponent, StopItemComponent ],
      providers: [
        {provide: StopService},
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
    // store = TestBed.get<Station>(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
