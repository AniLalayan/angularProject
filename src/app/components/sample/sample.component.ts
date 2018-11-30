import {Component, Input, OnInit} from '@angular/core';
import {ImplementationStatus} from '../../shared/model/implementation-status.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectsService} from '../../shared/api/projects.service';
import {Project} from '../../shared/model/project.model';


@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})

export class SampleComponent implements OnInit {

  get project() {
    return this._project;
  }

  @Input()
  set project(value) {
    this._project = value;
  }
  private _project;

  // @Input() project: Project;
  @Input() sampleForm: FormGroup;

  constructor(private service: ProjectsService) {
  }

  public statuses: ImplementationStatus[] = [];


  ngOnInit() {
    this.service.getImplementationStatuses().subscribe(data => this.statuses = data);
  }

  public duration() {
    if ((this._project.plannedEndDate && this._project.plannedStartDate)
      && (this.sampleForm.controls.projectPlannedEndDate.value.getTime() - this.sampleForm.controls.projectPlannedStartDate.value.getTime()) / (24 * 60 * 60 * 1000) >= 0) {
      return (this.sampleForm.controls.projectPlannedEndDate.value.getTime() - this.sampleForm.controls.projectPlannedStartDate.value.getTime()) / (24 * 60 * 60 * 1000);
    } else {
      return null;
    }
  }
}
