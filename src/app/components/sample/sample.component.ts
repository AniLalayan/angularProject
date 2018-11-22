import {Component, Input, OnInit, Output} from '@angular/core';
import {ImplementationStatus} from '../../shared/model/implementation-status.model';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ProjectsService} from '../../shared/api/projects.service';


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
    this.initializeForm();
  }

  private _project;
  projectForm: any;


  constructor(private service: ProjectsService) {
  }

  public statuses: ImplementationStatus[] = [];


  ngOnInit() {
    this.service.getImplementationStatuses().subscribe(data => this.statuses = data);
  }

  public duration(): number {
    if ((this._project.plannedEndDate && this._project.plannedStartDate)
      && (this._project.plannedEndDate.getTime() - this._project.plannedStartDate.getTime()) / (24 * 60 * 60 * 1000) >= 0) {
      return (this._project.plannedEndDate.getTime() - this._project.plannedStartDate.getTime()) / (24 * 60 * 60 * 1000);
    } else {
      return null;
    }
  }

  private initializeForm() {
    this.projectForm = new FormGroup({
      projectCodeFormControl: new FormControl(this._project.code, [Validators.required]),
      projectTitleFormControl: new FormControl(this._project.title, [Validators.required]),
      projectDescription: new FormControl(this._project.description),
      projectImplementationStatusId: new FormControl(this._project.implementationStatusId, [Validators.required]),
      projectPlannedStartDate: new FormControl(this._project.plannedStartDate, [Validators.required]),
      projectPlannedEndDate: new FormControl(this._project.plannedEndDate),
    });
  }

  // ProjectCodeErrorMessage() {
  //   return this.projectCodeFormControl.hasError('required') ? 'You must enter a value' :
  //     this.projectCodeFormControl.hasError('') ? 'Not a valid input' : '';
  // }
  //
  // ProjectTitleErrorMessage() {
  //   return this.projectTitleFormControl.hasError('required') ? 'You must enter a value' :
  //     this.projectTitleFormControl.hasError('') ? 'Not a valid input' :
  //       '';
  // }

}
