import {Component, Input, OnInit} from '@angular/core';
import {ImplementationStatus} from '../../shared/model/implementation-status.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  }

  @Input() sampleForm: FormGroup;

  private _project;



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
