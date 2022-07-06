import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  message: string = "";
  status: string = "";
  error: string = "";

  constructor(private route: ActivatedRoute, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation !== null) {
      console.log(navigation.extras.state);
      const state = navigation.extras.state as
        {
          message: string;
          status: string;
          error: string;
        }
      this.message = state.message;
      this.status = state.status;
      this.error = state.error;
    }



  }

  ngOnInit(): void {
    let self = this;
    this.route.params.subscribe(params => {


    });
  }

}
