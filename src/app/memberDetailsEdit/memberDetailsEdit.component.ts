import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match


@Component({ selector: 'app', templateUrl: 'memberDetailsEdit.component.html' })
export class MemberDetailsEditComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            title: ['', Validators.required],
            memberName: ['', Validators.required],
            description: ['', Validators.required],
            // validates date format yyyy-mm-dd
            yoe: ['', [Validators.required, Validators.min(4)]],
            skillSet: ['', [Validators.required]],
            projName: ['', Validators.required],
            startDate: ['', Validators.required],
            endtDate: ['', Validators.required],
            alp: ['', [Validators.required, Validators.min(4)]],

        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
}

