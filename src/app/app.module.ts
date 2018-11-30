import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import { SampleComponent} from './components/sample/sample.component';
import {SectorsComponent} from './components/sectors/sectors.component';
import {LocationsComponent} from './components/locations/locations.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule, MatNativeDateModule, MatSelectModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {HttpClientModule} from '@angular/common/http';
import {LocationPopupComponent} from './components/locations/location-popup.component';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ProjectListComponent} from './components/project_list/project-list.component';
import {ProjectsService} from './shared/api/projects.service';
import {ImpProjectsService} from './shared/services/imp-projects.service';
import {RouterModule, Routes} from '@angular/router';
import {ProjectComponent} from './components/project/project.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const appRoutes: Routes = [
  { path: 'projects', component: ProjectListComponent},
  { path: 'projects/:id', component: ProjectComponent },
  { path: '**', redirectTo: 'projects' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SampleComponent,
    SectorsComponent,
    LocationsComponent,
    ProjectListComponent,
    LocationPopupComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatNativeDateModule,
    MatTableModule,
    MatInputModule,
    HttpClientModule,
    MatDialogModule,
    MatSortModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatSnackBarModule
  ],
  providers: [
    {provide: ProjectsService, useClass: ImpProjectsService}],
  entryComponents: [LocationPopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
