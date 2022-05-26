import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as crypto from 'crypto-js';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  constructor(private fb : FormBuilder, private connectionService : ConnectionService) { }
  private key:any='#@QWERTY$!&/&!AZERTY@#';
//   loginForm=new FormGroup({
//       email : new FormControl(''),
//       password : new FormControl(''),
//   });
    get email(){ return this.loginForm.get('email'); }
    get password(){ return this.loginForm.get('password'); }
    get remember(){ return this.loginForm.get('remember'); }
    loginForm:any = []
    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email : ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
            password : ['',[Validators.required,Validators.minLength(8)]],
            remember : [false]
        });
    // var CryptoJS = require("crypto-js");
    //   let md5=new Md5();
    //    let myObj:any = { "name":"John", "age":30, "car":null };
    //   var hash1:any = md5.appendStr(JSON.stringify(myObj)).end();
    //   var hash2 = md5.appendStr(hash1).end();
    //   console.log(hash1);
    // var txt=crypto.AES.encrypt(JSON.stringify(myObj),'342##$%%*--/+!@###$$%^^&**').toString();
    // console.log(txt)
    // var dec = crypto.AES.decrypt(txt,'342##$%%*--/+!@###$$%^^&**').toString(crypto.enc.Utf8);
    // console.log(dec)
  }
  onSubmit = () => {
    let email=this.email?.value;
    let password=this.password?.value;
    if(email && password){
        var passwordHash=crypto.AES.encrypt(password,this.key).toString();
        let map={
            email:email,
            password:passwordHash,
        }
        this.connectionService.login(map).subscribe(res => console.log(res), err => console.log(err));
        this.ngOnInit();
    }
  }
}
