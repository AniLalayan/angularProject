import {Component, OnInit} from '@angular/core';
import {Project} from '../../shared/model/project.model';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ProjectsService} from '../../shared/api/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {
  public project: Project = new Project();
  isReady = false;
  public projectForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private service: ProjectsService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.service.getProjectById(params['id'])
        .subscribe(
          res => {
            this.project = res;
            this.projectForm = new FormGroup({
              sampleForm: new FormGroup({ projectCodeFormControl: new FormControl(this.project.code, [Validators.required]),
                projectTitleFormControl: new FormControl(this.project.title, [Validators.required]),
                projectDescription: new FormControl(this.project.description),
                projectImplementationStatusId: new FormControl(this.project.implementationStatusId, [Validators.required]),
                projectPlannedStartDate: new FormControl(this.project.plannedStartDate, [Validators.required]),
                projectPlannedEndDate: new FormControl(this.project.plannedEndDate)}),
              sectorForm: new FormGroup({
                sectorNameFormControl: new FormControl(''),
                sectorPercentFormControl: new FormControl(null)
              }),
              locationForm: new FormGroup({
                locationCountryFormControl: new FormControl('', [Validators.required]),
                locationDistrictFormControl: new FormControl('', [Validators.required]),
                locationPercentFormControl: new FormControl('')
              }),
            });
            this.isReady = true;
          },
          err => {
            console.error(err);
          }
        );

    });
  }
}
