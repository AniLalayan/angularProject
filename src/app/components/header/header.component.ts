import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {ProjectsService} from '../../shared/api/projects.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})

export class HeaderComponent implements OnInit {
  @Input() projectForm;
  @Input() project;

  constructor(private location: Location, private service: ProjectsService) {
  }

  ngOnInit() {
  }

  cancel(): void {
    this.location.back();
  }

  saveAndClose() {
    this.service.saveAndCloseProject(this.project);
  }
}
