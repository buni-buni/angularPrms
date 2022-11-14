import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// import custom validator to validate that password and confirm password fields match


@Component({ selector: 'app', templateUrl: 'newMember.component.html' })
export class NewMemberComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
  errorMessage: any;

    constructor(private formBuilder: FormBuilder,private http: HttpClient) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
           // title: [''],
            memberName: [''],
            description: [''],
            // validates date format yyyy-mm-dd
            yoe: [''],
            skillSet: [''],
            projName: [''],
            startDate: [''],
            endDate: [''],
            alp: [''],

        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        ///this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.http.post<any>('https://4yvcvf6lv2.execute-api.us-east-1.amazonaws.com/members',{
        "Member_Name": this.registerForm.value.memberName,
        "Total_Exp": this.registerForm.value.yoe,
        "Skillset": this.registerForm.value.skillSet,
        "Project_start_date": this.registerForm.value.startDate,
        "Project_end_date": this.registerForm.value.endDate,
        "Project_name": this.registerForm.value.projName,
        "Allocation_percentage": this.registerForm.value.alp,
        "Description": this.registerForm.value.description,
        }).subscribe({
          next:data => {


          },
       error:error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
       }
        });

        let ar=[];

        for (const [key, value] of Object.entries(this.registerForm.value)) {
          if(value==''){
            ar.push(key);
          }
        }

        if(ar.length>0){
          alert('Ui Response: Please enter the following missing values: '+ ar.join(', '));
          return;
        }

        if(this.registerForm.value.yoe<4) {
          alert('UI Response: Years Of Experience must be more than 4years');
          return;
        }

        if(this.registerForm.value.skillSet.split(',').length<3) {
          alert('UI Response: Please enter minimum 3 skills');
          return;
        }
        if(this.registerForm.value.startDate > this.registerForm.value.startDate) {
          alert('UI Response: End date is less than start date');
          return;
        }
        if(this.registerForm.value.alp > 100) {
          alert('UI Response: Please enter allocation in %');
          return;
        }
       // this.registerForm.value.Member_ID= Number(new Date());
       //
        if(this.registerForm.value.memberName==""||this.registerForm.value.yoe==""||this.registerForm.value.skillSet==""||this.registerForm.value.startDate==""||this.registerForm.value.endDate==""||this.registerForm.value.projName==""||this.registerForm.value.alp==""||this.registerForm.value.description=="") {
          alert('UI Response: Please enter all details. All fields are mandetory');
          return;
        }

        alert("Project & Member have been successfully added !!")
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
}
