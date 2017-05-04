import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import { Http } from '@angular/http';

import{Page5} from '../page5/page5';
import {DetailsPage} from '../details/details';
import{Page1} from '../page1/page1';

@Component({
  templateUrl: 'page4.html'
})
export class Page4{
  public trip_id: number;
  public user_id: number;
  public username: string;
  public recentExpenses: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController)
  {
    this.trip_id = navParams.get('trip_id');
    this.user_id = navParams.get('user_id');
    this.username = navParams.get('username');
  }
  ionViewWillEnter()
  {
    this.http.get("https://turing.cs.olemiss.edu/~N_log_n/RecentExpenses.php?trip_id=" + this.trip_id)
    .map(res => res.json())
    .subscribe(response => {
      if(response.result == "SUCCESS")
        this.recentExpenses = response.data;
      else
        console.log(response.result);
    });
  }
  addExpense()
  {
    this.navCtrl.push(Page5, {user_id: this.user_id, username: this.username, trip_id: this.trip_id});
  }
  tripDetails()
  {
    this.navCtrl.push(DetailsPage, {user_id: this.user_id, username: this.username, trip_id: this.trip_id});
  }
  logoutButton()
  {
      let alert = this.alertCtrl.create({
        title: "Confirm",
        subTitle: "Are you sure you want to log out?",
        buttons: [
          {
            text: "Yes",
            handler: () =>{
              this.navCtrl.popToRoot();
            }
          },
          {
            text: "No",
            role: "cancel",
            handler: () => {console.log("canceled")}
          }
        ]
      });
      alert.present();
  }
}
