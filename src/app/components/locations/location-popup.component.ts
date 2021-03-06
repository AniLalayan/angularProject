import {ProjectsService} from '../../shared/api/projects.service';
import {District} from '../../shared/model/district.model';
import {Country} from '../../shared/model/country.model';
import {Location} from '../../shared/model/location.model';
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-location-popup',
  templateUrl: './location-popup.component.html',
  styleUrls: ['./location-popup.component.css']
})

export class LocationPopupComponent implements OnInit {

  selectedCountryId: number;
  selectedDistrictId: number;
  percent: number = null;

  countries: Country[] = [];
  allDistricts: District[] = [];
  districts: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<LocationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProjectsService
  ) {
  }

  ngOnInit() {
    this.service.getCountries().subscribe(data => {
      this.countries = data;
    });
    this.service.getDistricts()
      .subscribe(
        data => {
          this.allDistricts = data;

        });
  }

  changeCountry(): void {
    this.districts = this.allDistricts.filter(district => district.countryId === this.selectedCountryId);
  }

  confirm(): void {
    const loc = new Location();
    loc.countryId = this.selectedCountryId;
    loc.districtId = this.selectedDistrictId;
    loc.percent = this.data.form.controls.locationPercentFormControl.value;
    this.dialogRef.close(loc);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}


