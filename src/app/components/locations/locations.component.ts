import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {LocationPopupComponent} from './location-popup.component';
import {Country} from '../../shared/model/country.model';
import {District} from '../../shared/model/district.model';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {ProjectsService} from '../../shared/api/projects.service';
import {Project} from '../../shared/model/project.model';
import {Location} from '../../shared/model/location.model';
import {zip} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {selectValueAccessor} from '@angular/forms/src/directives/shared';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})

export class LocationsComponent implements OnInit {

  @Input() project: Project;

  constructor(public dialog: MatDialog, private projectService: ProjectsService) {
  }

  displayedColumns: string[] = ['country', 'district', 'percent'];
  dataSource: MatTableDataSource<Location>;
  countries: Country[];
  districts: District[];

  selectedPopupCountryId: number;
  selectedDistrictId: number;
  selectedPercent: number;


  @ViewChild(MatSort) sort: MatSort;
  @Input() locationForm: FormGroup;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.project.location);
    this.dataSource.sort = this.sort;
    this.projectService.getCountries().subscribe(
      res => {
        this.countries = res;
      }
    );
    this.projectService.getDistricts().subscribe(
      res => {
        this.districts = res;
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LocationPopupComponent, {
      width: '330px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  getCountryName(id: number): string {
    if (this.countries) {
      return this.countries.find(value => value.id === id).name;
    }
  }

  getDistrictName(id: number): string {
    if (this.districts) {
      return this.districts.find(value => value.id === id).name;
    }
  }
  addNewLocation() {
    const newLocation = {
      'id': null,
      'countryId': this.selectedPopupCountryId,
      'districtId': this.selectedDistrictId,
      'percent': this.selectedPercent
    };
    if (this.selectedPopupCountryId && this.selectedDistrictId && this.selectedPercent) {
      this.dataSource.data = [...this.dataSource.data, newLocation];
      this.selectedPopupCountryId = null;
      this.selectedDistrictId = null;
      this.selectedPercent = null;
    }
  }
}


