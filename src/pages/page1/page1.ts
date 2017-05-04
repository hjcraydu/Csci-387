import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import {Page2} from '../page2/page2'
import {NewUserPage} from '../new-user/new-user';
import { Http, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController) {
  }

  public username: string;
  public password: string;

  Login() {
    let headers = new Headers({"Content-Type": "application/json"});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify({username: this.username, password: this.password});
    this.http.post("https://turing.cs.olemiss.edu/~N_log_n/login.php", body, options)
    .map(res => res.json())
    .subscribe(response =>  {
      if(response.result == "SUCCESS")
        this.navCtrl.push(Page2, {user_id: response.id, first_name: response.first_name, username: this.username});
      else {
        let alert = this.alertCtrl.create({
          title: "Incorrect login",
          subTitle: "Incorrect username or password!",
          buttons: ['Retry']});
        alert.present();
      }
    })
  }
  newUser()
  {
    this.navCtrl.push(NewUserPage);
  }
  ionViewWillEnter()
  {
    this.password = '';
  }

}
