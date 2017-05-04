import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import{Page4} from '../page4/page4'
import{Page5} from '../page5/page5'

@Component({
  selector: 'page-quickAdd',
  templateUrl: 'quickAdd.html'
})
export class quickAdd {



  types: string = 'Types';



  public event = {
    name: '',
    type: '',
    date: '',
    price: ''
  }
  public tripId: number;
  public result: any;

  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams)
  {
    this.tripId = navParams.get('trip_id');
  }
  createExpense()
  {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify({date: this.event.date,
                               price: this.event.price,
                               expense_name: this.event.name,
                               trip_id: this.tripId,
                               expense_type: this.event.type});
    this.http.post("https://turing.cs.olemiss.edu/~N_log_n/AddExpense1.php", body, options)
    .map(res => res.json())
    .subscribe(data =>
      {this.result = data;});
    this.navCtrl.setRoot(Page4, {trip_id: this.tripId})
  }
  createAnotherExpense()
  {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify({date: this.event.date,
                               price: this.event.price,
                               expense_name: this.event.name,
                               trip_id: this.tripId,
                               expense_type: this.event.type});
    this.http.post("https://turing.cs.olemiss.edu/~N_log_n/AddExpense1.php", body, options)
    .map(res => res.json())
    .subscribe(data =>
      {this.result = data;});
    this.navCtrl.setRoot(Page5, {trip_id: this.tripId})
  }
  cancelExpense()
  {
    this.navCtrl.setRoot(Page4, {trip_id: this.tripId})
  }



}
