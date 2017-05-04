import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import{Page4} from '../page4/page4';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  templateUrl: 'page3.html'

})
export class Page3{
  public event = {
    name: '',
    budget: '',
    timeStarts: '',
    timeEnds: ''
  }
  public user_id: number;
  public username: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http)
  {
    this.user_id = navParams.get('user_id');
    this.username = navParams.get('username');
  }
  createTrip()
  {
    let active = this.navCtrl.getActive();
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify({
      id: this.user_id,
      trip_name: this.event.name,
      start_date: this.event.timeStarts,
      end_date: this.event.timeEnds,
      budget: this.event.budget
    });
    this.http.post("https://turing.cs.olemiss.edu/~N_log_n/AddTrip.php", body, options)
    .map(res => res.json())
    .subscribe(response => {
      if(response.result == "SUCCESS")
        this.navCtrl.push(Page4, {
          user_id: this.user_id,
          username: this.username,
          trip_id: response.id
        })
        .then(() => this.navCtrl.remove(this.navCtrl.indexOf(active)));
      else
        console.log(response.result);
      });
   }
}
