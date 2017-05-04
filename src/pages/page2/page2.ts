

import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import{Page3} from '../page3/page3';
import{Page4} from '../page4/page4';
import{Page1} from '../page1/page1';
import{AllTripsPage} from '../all-trips/all-trips';
import { Http } from '@angular/http';
import {AlertController} from 'ionic-angular';
@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'

})
export class Page2
{
      public username: string;
      public user_id: number;
      public first_name: string;
      public trips: any[];
      constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl:AlertController)
      {
        this.username = navParams.get("username");
        this.user_id = navParams.get("user_id");
        this.first_name = navParams.get("first_name");
      }
      ionViewWillEnter()
      {
        this.http.get("https://turing.cs.olemiss.edu/~N_log_n/RecentTrips.php?id=" + this.user_id)
        .map(res => res.json())
        .subscribe(response => {
          if(response.result == "SUCCESS")
            this.trips = response.data;
          else
            console.log(response.result);
        });
      }
      addTrip()
      {
        this.navCtrl.push(Page3, {user_id: this.user_id, username: this.username})
      }
      selectPreviousTrip(id: number)
      {
        this.navCtrl.push(Page4, {user_id: this.user_id, username: this.username, trip_id: id});
      }
      viewAllTrips()
      {
        this.navCtrl.push(AllTripsPage, {user_id: this.user_id, username: this.username});
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
