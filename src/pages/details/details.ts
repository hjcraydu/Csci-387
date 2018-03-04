import { Component } from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import { Http } from '@angular/http';
import{Page5} from '../page5/page5';

@Component({
  templateUrl: 'details.html'
})
export class DetailsPage{
  public tripId: number;
  public recentExpenses: any[];
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public http: Http)
  {
    this.tripId = navParams.get('trip_id');
  }
  ionViewWillEnter()
  {
    this.http.get("https://turing.cs.olemiss.edu/~N_log_n/AllExpenses.php?trip_id=" + this.tripId)
    .map(res => res.json())
    .subscribe(response => {
      if(response.result == "SUCCESS")
        this.recentExpenses = response.data
      else {
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: "Database retrieval failed with message: " + response.result,
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }
  addExpense()
  {
    this.navCtrl.push(Page5, {trip_id: this.tripId});
  }
  delete(id: number)
  {
    let active = this.navCtrl.getActive();
    let alert = this.alertCtrl.create({
      title: "Confirm",
      subTitle: "Do you really want to delete this expense?",
      buttons: [
        {
          text: "Yes",
          handler: () =>{
            this.http.get("https://turing.cs.olemiss.edu/~N_log_n/RemoveExpense.php?id=" + id)
            .map(res => res.json())
            .subscribe(response => {
              if(response.result == "SUCCESS"){
                this.navCtrl.push(DetailsPage, {trip_id: this.tripId})
                .then(() => this.navCtrl.remove(this.navCtrl.indexOf(active)));
              } else
                console.log(response.result);
            });
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
  home()
  {
    this.navCtrl.pop();
  }
}
