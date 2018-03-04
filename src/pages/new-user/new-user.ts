import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'page-new-user',
  templateUrl: 'new-user.html'
})
export class NewUserPage {
  public email: string;
  public password: string;
  public password_reenter: string;
  public sap: string;
  public first_name: string;
  public last_name: string;
  public phone_number: string;
  public department: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController)
  {
  }

  createUser()
  {
    if(this.password == '' || this.password_reenter == '' ||
       this.password != this.password_reenter){
      let alert = this.alertCtrl.create({
        title: "Password required",
        subTitle: "You have not entered your password the same way twice.",
        buttons: ["OK"]
      });
      alert.present();
      return;
    }
    // check that the phone number and SAP numbers are all digits
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify({
      username: this.email,
      password: this.password,
      sap: this.sap,
      fname: this.first_name,
      lname: this.last_name,
      phone: this.phone_number,
      department: this.department
    });
    this.http.post("https://turing.cs.olemiss.edu/~N_log_n/NewUser.php", body, options)
    .map(res => res.json())
    .subscribe(data => {
      if(data.result == "SUCCESS"){
        let alert = this.alertCtrl.create({
          title: 'User created',
          subTitle: 'New user created successfully.',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.pop();
      } else {
        console.log(data.result);
        let alert = this.alertCtrl.create({
          title: 'User creation failed',
          subTitle: 'The username you entered is already in use.',
          buttons: ['Retry']
        });
        alert.present();
      }
    });
  }
}
