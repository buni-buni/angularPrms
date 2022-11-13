import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  memberDetails = 'http://localhost:3000/memberdetails';
  memberDetailsById = 'http://localhost:3000/memberdetails/:id'
  constructor(public httpClient: HttpClient) {}

  getMemberDetails(){
    return this.httpClient.get(this.memberDetails);
  }

  getMemberDetailsById(id){
    return this.httpClient.get(this.memberDetailsById);
  }
}
