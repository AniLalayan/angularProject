import { Component } from '@angular/core';
import {ImpProjectsService} from './shared/services/imp-projects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ImpProjectsService]
})
export class AppComponent {
}
