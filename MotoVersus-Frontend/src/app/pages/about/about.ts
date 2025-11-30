import { Component } from '@angular/core';
import { Person } from '../../components/person/person';

@Component({
  selector: 'app-about',
  imports: [Person],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

}
