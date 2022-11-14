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
  taskSource: Object;
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
            projStartDate: [''],
            projEndDate: [''],
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

      
     // var str = "Abc: Lorem ipsum sit amet";
     idSelected = idSelected.split(":").pop().trim();

     this.populateTable(idSelected);
      this.idSelectedVal=idSelected;
      this.getTaskDetails(idSelected);
    }

    populateTable(id){
      this.x.push(this.dataSource);


       this.y= this.x[0]
      var obj=  this.y.find(o => o.Member_ID == id);



    this.registerForm.controls['memberName'].setValue(obj.Member_Name);
    }
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.http.post<any>('https://4yvcvf6lv2.execute-api.us-east-1.amazonaws.com/tasks',{
          "Member_Name": this.registerForm.value.memberName,
          "Member_ID": this.registerForm.value.memberId,
          "Deliverables": this.registerForm.value.deliverables,
          "Task_Name": this.registerForm.value.taskName,
          "Task_Start_Date": this.registerForm.value.startDate,
          "Task_End_Date": this.registerForm.value.endDate,
          }).subscribe({
            next:data => {

            },
          error:error => {
              this.errorMessage = error.message;
              console.error('There was an error!', error);
          }
          });



        // display form values on success
        if(this.registerForm.value.endDate < this.taskSource["Project_end_date"]) {
          alert('Task End Date should be less than project end date');
          return;
        }
        if(this.registerForm.value.endDate < this.registerForm.value.startDate) {
          alert('Task End Date should be less than task start date');
          return;
        }
        alert('SUCCESS!! DAta has been saved successfully');
    }
    getTaskDetails(id){
      this.service.getTaskDetailsById(id)
      .subscribe( async re => {
        this.taskSource = re;
        //
        //this.taskSource.push(re);

        //
        this.registerForm.controls['projEndDate'].setValue(this.taskSource["Project_end_date"]);
        this.registerForm.controls['projStartDate'].setValue(this.taskSource["Project_start_date"]);
        //await this.populateTask(this.taskSource);

      });

    }
    getMemberDetails(){
      this.service.getMemberDetails()
      .subscribe( response => {
        //this.posts = response;
        this.dataSource = response;


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
