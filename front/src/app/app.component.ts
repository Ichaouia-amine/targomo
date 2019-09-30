import { Component , isDevMode} from '@angular/core';
import { environment } from './../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    this.size = window.screen.width;
  }
  public size: number;
  onResize(event) {
    this.size = window.screen.width;
}
}
