import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Confirmation, ChangeEmail } from './confirmation.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  email:any = localStorage.getItem('email');

  formValue!: FormGroup;

  pass:string = './';

  confirmationModelObj : Confirmation = new Confirmation;
  changeEmailModeObj: ChangeEmail = new ChangeEmail;

  constructor(private router: Router,private formbuilder: FormBuilder, private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      code1: [''],
      code2: [''],
      code3: [''],
      code4: [''],
      code5: [''],
      code6: [''],
    })
  }

  ChangeEmail(){

    this.api.changeEmail(this.confirmationModelObj)
    .subscribe(res=>{

      console.log(this.confirmationModelObj);
      localStorage.removeItem('email');
      
      console.log(res);
      alert("UserRegister")
    },
    err=>{
      alert('err')
    })
  }

  ConfirmCode(){
    this.confirmationModelObj.email = this.email;
    this.confirmationModelObj.confirmCode =  this.formValue.value.code1 + this.formValue.value.code2 + this.formValue.value.code3 + this.formValue.value.code4 + this.formValue.value.code5 + this.formValue.value.code6;
    this.api.confirmCode(this.confirmationModelObj)
    .subscribe(res=>{

      this.router.navigate(['/terms']);
      
      console.log(this.confirmationModelObj);
      
      console.log(res);
    },
    err=>{
      alert('err')
    })
  }

  ChangeCode(){
    this.confirmationModelObj.email = this.email;
    this.confirmationModelObj.confirmCode =  this.formValue.value.code1 + this.formValue.value.code2 + this.formValue.value.code3 + this.formValue.value.code4 + this.formValue.value.code5 + this.formValue.value.code6;
    
    this.api.changeCode(this.confirmationModelObj)
    .subscribe(res=>{
      
      console.log(this.confirmationModelObj);
      
      console.log(res);
    },
    err=>{
      console.log(err);
    })
  }

}