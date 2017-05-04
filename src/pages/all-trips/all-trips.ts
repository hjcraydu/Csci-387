import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Page4 } from '../page4/page4';
import{Page1} from '../page1/page1';

@Component({
  selector: 'page-all-trips',
  templateUrl: 'all-trips.html'
})
export class AllTripsPage {
  public trips: any[];
  public user_id: number;
  public username: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController)
  {
    this.user_id = navParams.get("user_id");
    this.username = navParams.get("username");
  }

  ionViewWillEnter()
  {
    this.http.get("https://turing.cs.olemiss.edu/~N_log_n/AllTrips.php?id=" + this.user_id)
    .map(res => res.json())
    .subscribe(response => {
      if(response.result == "SUCCESS")
        this.trips = response.data;
      else
        // TODO: Maybe output an error message or something
        console.log(response.result);
    });
  }

  selectTrip(id: number)
  {
    this.navCtrl.push(Page4, {trip_id: id, username: this.username, user_id: this.user_id});
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
