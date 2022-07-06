import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  constructor(private router: Router, private http: HttpClient) { }

  // Get 1 or more documents from database (GET)
  fetchData(endpoint: string, self: any, callback: any) {


    let observer = this.http.get(endpoint);
    observer.subscribe({
      next: (info: any) => {
        console.log("====== results from host =======");
        console.log(info);
        callback(info);
      },

      error: (e) => {
        console.log("ERROR RESULTS");
        console.log(e);
        console.log(e.message);
        console.log(e.error);

        let navigationExtras: NavigationExtras = {
          state: {
            'message': e.message,
            'status': e.status,
            'error': e.error
          }
        };

        this.router.navigate(['/error'], navigationExtras);
      },
      complete: () => {
        console.info('complete')


      }


    });

  }

  // Import initial data into database (POST)
  executeImport(endpoint: string, self: any) {
    self.status = "";
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let payload = {};
    let observable = this.http.post(endpoint, payload, httpOptions);

    observable.subscribe({
      next: (info: any) => {
        console.log("====== results from host =======");
        console.log(info);
        self.status = info;
      },

      error: (e) => {
        console.log(e);
        console.log(e.status);
        console.log(e.message);
        self.status = e.error;
        self.color = "red";

      },
      complete: () => {
        console.info('complete');
        self.status = "Completed Successfully";


      }


    });
  }

}
