import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {LocationPopupComponent} from './location-popup.component';
import {Country} from '../../shared/model/country.model';
import {District} from '../../shared/model/district.model';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {ProjectsService} from '../../shared/api/projects.service';
import {Project} from '../../shared/model/project.model';
import {Location} from '../../shared/model/location.model';
import {zip} from 'rxjs';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})

export class LocationsComponent implements OnInit {

  // countries: Country[] = [
  //   {
  //     'id': 1,
  //     'name': 'Armenia'
  //   },
  //   {
  //     'id': 2,
  //     'name': 'Artsakh'
  //   }
  // ];
  //
  // districts: District[] = [
  //   {
  //     'id': 1,
  //     'name': 'Shirak',
  //     'countryId': 1
  //   },
  //   {
  //     'id': 2,
  //     'name': 'Ararat',
  //     'countryId': 1
  //   },
  //   {
  //     'id': 3,
  //     'name': 'Armavir',
  //     'countryId': 1
  //   },
  //   {
  //     'id': 4,
  //     'name': 'Askeran',
  //     'countryId': 2
  //   },
  //   {
  //     'id': 5,
  //     'name': 'Hadrut',
  //     'countryId': 2
  //   },
  //   {
  //     'id': 6,
  //     'name': 'Martuni',
  //     'countryId': 2
  //   }
  // ];

  @Input() project: Project;
  // @Input() countries: Country[];
  // @Input() districts: District[];

  constructor(public dialog: MatDialog, private projectService: ProjectsService) {
  }

  displayedColumns: string[] = ['country', 'district', 'percent'];
  dataSource: MatTableDataSource<Location>;
  countries: Country[];
  districts: District[];

  @ViewChild(MatSort) sort: MatSort;

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
      width: '250px',
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
}

// export interface LocationPopupData {
//   countryId: number;
//   countries: Array<Country>;
//   districtId: number;
//   districts: Array<District>;
//   percent: number;
// }

