import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
// import {LocationPopupData} from './locations.component';
import {Country} from '../../shared/model/country.model';
import {District} from '../../shared/model/district.model';
import {Location} from '../../shared/model/location.model';

import {ProjectsService} from '../../shared/api/projects.service';


@Component({
  selector: 'app-location-popup',
  templateUrl: './location-popup.component.html',
  styleUrls: ['./location-popup.component.css']
})

export class LocationPopupComponent implements OnInit {

  // public country = new Country();
  // public district = new District();
  // public location = new Location();

  // locationForms = new FormGroup({
  //   locationPopupCountry: new FormControl(this.country.name, [Validators.required]),
  //   locationPopupDistrict: new FormControl(this.district.name, [Validators.required]),
  //   locationPopupPercent: new FormControl(this.location.percent)
  // })

  selectedCountryId: number;
  countries: Country[] = [];
  allDistricts: District[] = [];
  districts:  Array<any> = [];



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

