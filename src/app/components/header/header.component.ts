import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})

export class HeaderComponent {
  // 3 hat output
  @Input() projectForm;

  constructor(private location: Location) {
  }

  cancel(): void {
    this.location.back();
  }

}
