import {Component, OnInit} from '@angular/core';
import {Project} from '../../shared/model/project.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
    if (!this.service.projects) {
      this.service.getProjects().subscribe();
    }    this.activatedRoute.params.subscribe(params => {
      if (params['id'] > 0) {
        this.service.getProjectById(params['id'])
          .subscribe(
            res => {
              this.project = res;
              this.initForm();
              this.isReady = true;
            },
            err => {
              console.error(err);
            }
          );
      } else {
        this.project = new Project();
        this.initForm();
        this.isReady = true;
      }
    });
  }

  initForm() {
    this.projectForm = new FormGroup({
      sampleForm: new FormGroup({
        projectCodeFormControl: new FormControl(this.project.code, [Validators.required]),
        projectTitleFormControl: new FormControl(this.project.title, [Validators.required]),
        projectDescription: new FormControl(this.project.description),
        projectImplementationStatusId: new FormControl(this.project.implementationStatusId),
        projectPlannedStartDate: new FormControl(this.project.plannedStartDate),
        projectPlannedEndDate: new FormControl(this.project.plannedEndDate)
      }),
      sectorForm: new FormGroup({
        sectorNameFormControl: new FormControl(''),
        sectorPercentFormControl: new FormControl(null)
      }),
      locationForm: new FormGroup({
        locationCountryFormControl: new FormControl('', [Validators.required]),
        locationDistrictFormControl: new FormControl('', [Validators.required]),
        locationPercentFormControl: new FormControl(null)
      }),
    });
  }

  submit() {
    this.project.code = this.projectForm.controls.sampleForm.controls.projectCodeFormControl.value;
    this.project.title = this.projectForm.controls.sampleForm.controls.projectTitleFormControl.value;
    this.project.description = this.projectForm.controls.sampleForm.controls.projectDescription.value;
    this.project.implementationStatusId = this.projectForm.controls.sampleForm.controls.projectImplementationStatusId.value;
    this.project.plannedStartDate = this.projectForm.controls.sampleForm.controls.projectPlannedStartDate.value;
    this.project.plannedEndDate = this.projectForm.controls.sampleForm.controls.projectPlannedEndDate.value;
    this.service.saveProject(this.project);
  }

  // saveAndClose() {
  //   this.service.saveAndCloseProject(this.project);
  // }
}
