import { Component,OnInit } from '@angular/core';
import { CommonService } from '@app/_services/common.service';

export interface PeriodicElement {
  Member_Name: string;
  Member_ID: number;
  Total_Exp: number;
  Skillset: string;
  Description: string;
  projectName: string;
  Project_start_date: string;
  Project_end_date:string;
}
/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'my-app',
  styleUrls: ['memberDetails.component.css'],
  templateUrl: 'memberDetails.component.html',
})
export class MemberDetailsComponent implements OnInit {
  posts: Object;
  dataSource: Object;

  constructor(private service:CommonService) {}

  ngOnInit() {
    this.service.getMemberDetails()
      .subscribe( response => {
        //this.posts = response;
        this.dataSource = response;
      });
}
  displayedColumns: string[] = ['Member_ID', 'Member_Name', 'Total_Exp', 'Skillset','Description', 'projectName','Project_start_date','Project_end_date'];
  //dataSource = ELEMENT_DATA;


}
