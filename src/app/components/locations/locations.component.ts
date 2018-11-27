import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {LocationPopupComponent} from './location-popup.component';
import {Country} from '../../shared/model/country.model';
import {District} from '../../shared/model/district.model';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {ProjectsService} from '../../shared/api/projects.service';
import {Project} from '../../shared/model/project.model';
import {FormGroup} from '@angular/forms';
import {Location} from '../../shared/model/location.model';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})

export class LocationsComponent implements OnInit {

  @Input() project: Project;
  @Input() locationForm: FormGroup;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['country', 'district', 'percent'];
  dataSource: MatTableDataSource<any>;
  countries: Country[];
  districts: District[];

  constructor(public dialog: MatDialog, private projectService: ProjectsService) {
  }

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
      height: '500px',
      data: {form: this.locationForm}
    });

    dialogRef.afterClosed().subscribe((data: Location) => {
      this.addNewLocation(data);
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
  addNewLocation(newLocation: Location) {
    if (newLocation.districtId && newLocation.countryId && newLocation.percent) {
      this.dataSource.data.push(newLocation);
      this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
    }
  }
}


