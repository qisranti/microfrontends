import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostServiceService {

  setHostValue(host:string){
    console.log("Status set to : " + host);
  }

}
