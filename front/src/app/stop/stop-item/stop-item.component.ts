import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { Stop } from 'src/app/model/stop';
import { Refresh } from '@ngrx/store-devtools/src/actions';
@Component({
  selector: 'app-stop-item',
  templateUrl: './stop-item.component.html',
  styleUrls: ['./stop-item.component.css']
})
export class StopItemComponent implements OnInit, OnChanges {
  @Input() stop: Stop;
  @Input() category: string;
  @Input() average: number;
  public doughnutChartLabels: Label[] = ['On', 'Off'];
  public doughnutChartData: MultiDataSet;
  public doughnutChartType: ChartType = 'doughnut';
  public colors: Color[] = [{ backgroundColor: ['blue', 'olive'] }];
  constructor() { }

  ngOnInit() {
    this.refresh();

  }
  ngOnChanges(changes: SimpleChanges) {
    this.refresh();
  }
  refresh() {
    switch (this.category) {

      case 'off':
        this.doughnutChartLabels = ['Off', 'Average'];
        this.doughnutChartData = [[this.stop.people_off, this.average]];
        break;
      case 'walk':
        this.doughnutChartLabels = ['Walk', 'Average walk'];
        this.doughnutChartData = [[this.stop.reach_pop_30_walk, this.average]];
        break;
      case 'bike':
        this.doughnutChartLabels = ['Use Bike', 'Average Bike'];
        this.doughnutChartData = [[this.stop.reach_pop_30_bike, this.average]];
        break;
      default:
        this.doughnutChartLabels = ['On', 'Average'];
        this.doughnutChartData = [[this.stop.people_on, this.average]];
        break;
    }
  }

}
