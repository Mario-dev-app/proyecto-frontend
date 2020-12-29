import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

declare var M : any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit, AfterViewInit {

  constructor(public ls: LoginService) { }

  ngAfterViewInit(): void {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }

  ngOnInit(): void {
  }

}
