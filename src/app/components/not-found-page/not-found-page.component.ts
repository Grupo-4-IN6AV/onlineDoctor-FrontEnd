import { Component, OnInit } from '@angular/core';
import {ScriptsError404Service} from '../../services/cargarScripts/scripts-error404.service'

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent implements OnInit {

  constructor(
  ) { 
  }

  ngOnInit(): void {
  }

}
