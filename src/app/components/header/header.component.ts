import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Location} from '@angular/common';
import {ProjectsService} from '../../shared/api/projects.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})

export class HeaderComponent {
  // 3 hat output
  @Input() projectForm;
  @Input() project;

  constructor(private location: Location, private service: ProjectsService) {
  }

  cancel(): void {
    this.location.back();
  }

  saveAndClose() {
    this.service.saveAndCloseProject(this.project);
  }

}
