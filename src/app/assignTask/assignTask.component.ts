import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '@app/_services/common.service';

// import custom validator to validate that password and confirm password fields match


@Component({ selector: 'app', templateUrl: 'assignTask.component.html' })
export class AssignTaskComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
  dataSource: Object;
  dataSourceById: Object;
  idSelectedVal:any;
  x=[];
  y: any;
  errorMessage: any;
    constructor(private formBuilder: FormBuilder,private service:CommonService,private http: HttpClient) { }


    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            memberId: ['', Validators.required],
            memberName: ['', Validators.required],
            deliverables: ['', Validators.required],
            taskName: ['', [Validators.required]],
            //projName: ['', Validators.required],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
           // alp: ['', [Validators.required, Validators.min(4)]],

        });
        this.getMemberDetails();
    }

    updateSelection(dataSource,idSelected){
      // this.dataSource.forEach(this.x => {
      //   this.x.controls.selectedValue.setValue(false)
      // })
      // let ctrl = this.dataSource.find(this.x => this.x.value.value === answer)
      // ctrl.controls.selectedValue.setValue(true)
      console.log("dataSource type", typeof(this.dataSource))
     // var str = "Abc: Lorem ipsum sit amet";
     idSelected = idSelected.split(":").pop().trim();
     console.log("idSelected",idSelected)
     this.populateTable(idSelected);
      this.idSelectedVal=idSelected;

    }

    populateTable(id){
      this.x.push(this.dataSource);
        console.log("this.x",this.x)
        console.log(typeof(this.x),this.x,id,this.x[0]);
       this.y= this.x[0]
      var obj=  this.y.find(o => o.Member_ID == id);


    console.log(obj);
    this.registerForm.controls['memberName'].setValue(obj.Member_Name);
    }
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        // if (this.registerForm.invalid) {
        //     return;
        // }
        this.http.post<any>('http://localhost:4000/taskDetails',{
          "Member_Name": this.registerForm.value.memberName,
          "Member_ID": this.registerForm.value.memberId,
          "Deliverables": this.registerForm.value.deliverables,
          "Task_Name": this.registerForm.value.taskName,
          "Task_Start_Date": this.registerForm.value.startDate,
          "Task_End_Date": this.registerForm.value.endDate,
          }).subscribe({
            next:data => {
              console.log("data",data)
            },
          error:error => {
              this.errorMessage = error.message;
              console.error('There was an error!', error);
          }
          });
          console.log(this.registerForm.value)
        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    getMemberDetails(){
      this.service.getMemberDetails()
      .subscribe( response => {
        //this.posts = response;
        this.dataSource = response;
        console.log((this.dataSource));

      });
    }

    getMemberDetailsById(id){
      this.service.getMemberDetailsById(id)
      .subscribe( response => {
        //this.posts = response;
        this.dataSourceById = response;
      });
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
}
