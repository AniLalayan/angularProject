import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Project} from '../../shared/model/project.model';
import {Sector} from '../../shared/model/sector.model';
import {MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectsService} from '../../shared/api/projects.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})

export class SectorsComponent implements OnInit {

  // public snackBar: MatSnackBar
  @Input() project: Project;
  isReady = false;

  constructor(private service: ProjectsService, private http: HttpClient) {
  }

  public sectorsList: Sector[] = [];
  public dataSource: MatTableDataSource<any>;
  public selectedSectorId;
  displayedColumns: string[] = ['name', 'percent'];


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
    this.dataSource.data = [...this.dataSource.data, newSector];
    this.selectedSectorId = null;
    this.sectorForm.controls.sectorPercentFormControl.setValue(null);
  }
}
