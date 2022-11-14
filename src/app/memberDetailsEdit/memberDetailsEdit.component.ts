import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '@app/_services/common.service';

// import custom validator to validate that password and confirm password fields match


@Component({ selector: 'app', templateUrl: 'memberDetailsEdit.component.html' })
export class MemberDetailsEditComponent implements OnInit {
  //   registerForm: FormGroup;
  //   submitted = false;
  // errorMessage: any;
  // dataSource: any;
  // idSelectedVal: any;
  // y: any;
  // x: any;

  registerForm: FormGroup;
  submitted = false;
dataSource: Object;
dataSourceById: Object;
idSelectedVal:any;
x=[];
y: any;
errorMessage: any;
enableSubmit= true;

    constructor(private formBuilder: FormBuilder,private http: HttpClient,private service:CommonService) { }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
          memberId: [''],
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
        this.getMemberDetails();
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        // if (this.registerForm.invalid) {
        //     return;
        // }


        this.http.put<any>('https://4yvcvf6lv2.execute-api.us-east-1.amazonaws.com/members',{
        "Member_Name": this.registerForm.value.memberName,
        "Total_Exp": this.registerForm.value.yoe,
        "Skillset": this.registerForm.value.skillSet,
        "Project_start_date": this.registerForm.value.startDate,
        "Project_end_date": this.registerForm.value.endDate,
        "Project_name": this.registerForm.value.projName,
        "Allocation_percentage": this.registerForm.value.alp,
        "Description": this.registerForm.value.description,
        })
        .subscribe({
          next:data => {


           }
      //,
      //  error:error => {
      //     this.errorMessage = error.message;
      //     console.error('There was an error!', error);
      //  }
        });


        // display form values on success
       // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
        //if(this.registerForm.value.endDate<)
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        if(this.registerForm.value.endDate < date && this.registerForm.value.alp!=0) {

          alert('If project end date is lesser than the current date, then the allocation percentage must be updated as 0.');

          return;
        }

        if(this.registerForm.value.endDate > date && this.registerForm.value.alp!=100) {

          alert(' If the project end date is greater than the current date, then the allocation percentage must be 100%');
          return;
        }

        // if(this.registerForm.value.endDate < date && this.registerForm.value.alp!=0) {
        //
        //   alert('If project end date is lesser than the current date, then the allocation percentage must be updated as 0.');
        //   return;
        // }

        alert("Data has been successfully updated")
    }

    updateSelection(dataSource,idSelected){
      // this.dataSource.forEach(this.x => {
      //   this.x.controls.selectedValue.setValue(false)
      // })
      // let ctrl = this.dataSource.find(this.x => this.x.value.value === answer)
      // ctrl.controls.selectedValue.setValue(true)

     // var str = "Abc: Lorem ipsum sit amet";
     idSelected = idSelected.split(":").pop().trim();

     this.populateTable(idSelected);
      this.idSelectedVal=idSelected;
      this.enableSubmit=false
    }

    getMemberDetails(){
      this.service.getMemberDetails()
      .subscribe( response => {
        //this.posts = response;
        this.dataSource = response;


      });
    }
    populateTable(id){
      this.x.push(this.dataSource);


       this.y= this.x[0]
      var obj=  this.y.find(o => o.Member_ID == id);



    this.registerForm.controls['memberName'].setValue(obj.Member_Name);
    this.registerForm.controls['description'].setValue(obj.Description);
    this.registerForm.controls['yoe'].setValue(obj.Total_Exp);
    this.registerForm.controls['skillSet'].setValue(obj.Skillset);
    this.registerForm.controls['projName'].setValue(obj.Project_name);
    this.registerForm.controls['startDate'].setValue(obj.Project_start_date);
    this.registerForm.controls['endDate'].setValue(obj.Project_end_date);
    this.registerForm.controls['alp'].setValue(obj.Allocation_percentage);

    }
    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
}

