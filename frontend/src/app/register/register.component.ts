import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Register } from './register.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  formValue!: FormGroup;
  registerModelObj : Register = new Register;

  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name : [''],
      email: [''],
      password: ['']
    })
  }


  registerUser(){
    this.registerModelObj.name = this.formValue.value.name;
    this.registerModelObj.email = this.formValue.value.email;
    this.registerModelObj.password = this.formValue.value.password;

    
    localStorage.setItem('email', this.formValue.value.email);

    console.log(this.registerModelObj);

    this.api.registerUser(this.registerModelObj)
    .subscribe(res=>{
      console.log(res);
    },
    err=>{

      console.log(err);
    })
  }
}
