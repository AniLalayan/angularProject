import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Project} from '../../shared/model/project.model';
import {Sector} from '../../shared/model/sector.model';
import {MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectsService} from '../../shared/api/projects.service';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})

export class SectorsComponent implements OnInit {

  @Input() project: Project;
  isReady = false;

  constructor(private service: ProjectsService, private http: HttpClient) {
  }

  public sectorsList: Sector[] = [];
  public dataSource: MatTableDataSource<any>;
  public selectedSectorId;
  displayedColumns: string[] = ['name', 'percent', 'deleteIcon'];


  @ViewChild(MatSort) sort: MatSort;
  @Input() sectorForm: FormGroup;

  ngOnInit() {
    this.service.getSectors().subscribe(data => {
      this.sectorsList = data;
      this.isReady = true;
    });
    this.dataSource = new MatTableDataSource(this.project.sectors);
    this.dataSource.sort = this.sort;
  }

  getSectorName(id: number): string {
    return this.sectorsList.find(value => value.id === id).name;
  }

  addNewSector() {
    const newSector = {
      'id': this.selectedSectorId,
      'percent': +this.sectorForm.controls.sectorPercentFormControl.value
    };
    let sum = 0;
    if(this.dataSource.data) {
      this.dataSource.data.forEach((value: any) => sum += value.percent);
    }
    if (sum < 100 && (this.selectedSectorId && this.sectorForm.controls.sectorPercentFormControl.value) && +this.sectorForm.controls.sectorPercentFormControl.value + sum <= 100) {
      this.dataSource.data.push(newSector);
      this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
      this.selectedSectorId = null;
    }
    this.sectorForm.controls.sectorPercentFormControl.setValue(null);
  }

  deleteSector(id) {
    const index = this.project.sectors.findIndex(el => el.id === id);
    if (index > -1) {
      this.project.sectors.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.project.sectors);
      this.dataSource.sort = this.sort;
    }
  }
}
