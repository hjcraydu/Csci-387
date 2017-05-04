import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http'

@Component({
  selector: 'page-page5',
  templateUrl: 'page5.html'
})
export class Page5 {



  public event = {
    name: '',
    type: '',
    date: '',
    price: ''
  }
  public trip_id: number;
  public user_id: number;
  public username: string;
  public result: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public http: Http)
  {
     this.trip_id = navParams.get('trip_id');
     this.user_id = navParams.get('user_id');
     this.username = navParams.get('username');
  }
  createExpense()
  {
    // We should probably add a warning for if someone forgets to fill in a field
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify({date: this.event.date,
                               price: this.event.price,
                               expense_name: this.event.name,
                               trip_id: this.trip_id,
                               expense_type: this.event.type});
    this.http.post("https://turing.cs.olemiss.edu/~N_log_n/AddExpense1.php", body, options)
    .map(res => res.json())
    .subscribe(response => {
      if(response.result == "SUCCESS"){
        this.result = response.data;
        this.navCtrl.pop()
      } else
        console.log(response.result);
    });
  }
  createAnotherExpense()
  {
    let active = this.navCtrl.getActive();
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify({
      date: this.event.date,
      price: this.event.price,
      expense_name: this.event.name,
      trip_id: this.trip_id,
      expense_type: this.event.type
    });
    this.http.post("https://turing.cs.olemiss.edu/~N_log_n/AddExpense1.php", body, options)
    .map(res => res.json())
    .subscribe(response => {
      if(response.result == "SUCCESS")
        this.result = response.data;
      else
        console.log(response.result);
    });
    this.navCtrl.push(Page5, {
      trip_id: this.trip_id,
      user_id: this.user_id,
      username: this.username
    })
    .then(() => this.navCtrl.remove(this.navCtrl.indexOf(active)));
  }
  cancelExpense()
  {
    this.navCtrl.pop()
  }


}
