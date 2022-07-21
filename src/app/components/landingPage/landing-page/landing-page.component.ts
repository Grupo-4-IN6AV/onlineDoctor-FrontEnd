import { Component, OnInit } from '@angular/core';
import { ScriptsLandingPageService } from '../../../services/cargarScripts/scripts-landing-page.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(
    private _ScriptsLandingPage: ScriptsLandingPageService,
    ) { 
    }

  ngOnInit(): void {
  }

}
