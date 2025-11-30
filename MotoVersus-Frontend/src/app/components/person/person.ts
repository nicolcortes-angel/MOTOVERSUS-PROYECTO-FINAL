import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-person',
  imports: [],
  templateUrl: './person.html',
  styleUrl: './person.css'
})
export class Person implements OnInit {
  baseUrl: string = environment.appUrl;
  @Input() foto: string = '';
  @Input() nombre: string = '';
  @Input() description: string = '';
  @Input() linkedin: string = '';
  @Input() github: string = '';

  ngOnInit() {
  }
}
