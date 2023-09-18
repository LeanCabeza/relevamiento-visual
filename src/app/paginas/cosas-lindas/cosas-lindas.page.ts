import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {

  user: any = null;
  cosasLindasList: any = [];
  like: boolean = true;
  pressedButton: boolean = false;

  constructor() { }

  ngOnInit() {

  }

}
