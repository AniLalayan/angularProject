import { ProjectsService } from '../../shared/api/projects.service';
import { District } from '../../shared/model/district.model';
import { Country } from '../../shared/model/country.model';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-location-popup',
  templateUrl: './location-popup.component.html',
  styleUrls: ['./location-popup.component.css']
})

export class LocationPopupComponent implements OnInit {

  selectedCountryId: number;
  countries: Country[] = [];
  allDistricts: District[] = [];
  districts: Array<any> = [];
  // @Input() locationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LocationPopupComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: LocationPopupData,
    private service: ProjectsService
  ) {
  }

  ngOnInit() {
    this.service.getCountries().subscribe(data => this.countries = data);
    this.service.getDistricts()
      .subscribe(
        data => {
          this.allDistricts = data;
          this.districts = this.allDistricts;
        }
      );
  }

  changeCountry(): void {
    this.districts = this.allDistricts.filter(district => district.countryId === this.selectedCountryId);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// export interface LocationPopupData {
//   countryId: number;
//   countries: Array<Country>;
//   dsitrictId: number;
//   districts: Array<District>;
//   percent: number;
// }

