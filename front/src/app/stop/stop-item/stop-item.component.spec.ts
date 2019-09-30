import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopItemComponent } from './stop-item.component';
import { ChartsModule } from 'ng2-charts';

describe('StopItemComponent', () => {
  let component: StopItemComponent;
  let fixture: ComponentFixture<StopItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartsModule],
      declarations: [ StopItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopItemComponent);
    component = fixture.componentInstance;
    component.stop = {
      stop_id: 'cca80ef6-8948-444d-af74-580da16f0177',
      name: 'U Osloer Str. (Berlin)',
      people_off: 150,
      people_on: 0,
      prev_stop_id: 'null',
      next_stop_id: '94ff93c4-bcd5-44b2-9630-b92fb1dcdfc3',
      reach_pop_30_walk: 565,
      reach_pop_30_bike: 6590,
      lat: 52.557107,
      lng: 13.373279,
      geom: {
        type: 'Point',
        coordinates: []
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
