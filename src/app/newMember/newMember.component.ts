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
        // if (this.registerForm.invalid) {
        //     return;
        // }
        console.log("this.registerForm.value",this.registerForm.value);
        this.http.post<any>('http://localhost:3000/memberdetails',{
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

            console.log("data",data)
          },
       error:error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
       }
        });


        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    onReset() {
        // this.submitted = false;
        // this.registerForm.reset();
    }
}
