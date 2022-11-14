import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  memberDetails = 'https://4yvcvf6lv2.execute-api.us-east-1.amazonaws.com/members';
  memberDetailsById = 'https://4yvcvf6lv2.execute-api.us-east-1.amazonaws.com/members/';
  taskDetailsId='https://4yvcvf6lv2.execute-api.us-east-1.amazonaws.com/tasks/';
  constructor(public httpClient: HttpClient) {}

  getMemberDetails(){
    return this.httpClient.get(this.memberDetails);
  }

  getMemberDetailsById(id){
    return this.httpClient.get(this.memberDetailsById+id);
  }

  getTaskDetailsById(id){
    return this.httpClient.get(this.taskDetailsId+id);
  }
}
