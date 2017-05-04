import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page3 } from '../pages/page3/page3';
import { Page4 } from '../pages/page4/page4';
import { Page5 } from '../pages/page5/page5';
import { quickAdd } from '../pages/quickAdd/quickAdd';
import { DetailsPage } from '../pages/details/details';
import { AllTripsPage } from '../pages/all-trips/all-trips';
import { NewUserPage } from '../pages/new-user/new-user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;
  rootPage2: any = Page4;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Login', component: Page1 },
      { title: 'Welcome', component: Page2 },
      { title: 'Create Trip', component: Page3 },
      { title: 'Overview', component: Page4 },
      { title: 'Add Expense', component: Page5 },
      { title: 'Quick Add', component: quickAdd },
      { title: 'Details', component: DetailsPage },
      { title: 'All Trips', component: AllTripsPage },
      { title: 'New User', component: NewUserPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
