import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '../../shared/password.validator';
import * as crypto from 'crypto-js';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

    types=['Admin','User'];
    act=false;
    private key:any='#@QWERTY$!&/&!AZERTY@#';
    constructor(private fb : FormBuilder,private connectionService : ConnectionService) { }

    get username(){ return this.registerForm.get('username'); }
    get email(){ return this.registerForm.get('email'); }
    get confirm(){ return this.registerForm.get('confirm'); }
    get password(){ return this.registerForm.get('password'); }
    get type(){ return this.registerForm.get('type'); }

    registerForm:any = [];
    
    ngOnInit(): void {
        //this.registerForm.valueChanges.subscribe(console.log);

        this.registerForm = this.fb.group({
            username : ['',[Validators.required,Validators.minLength(5)]],
            email : ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
            password : ['',[Validators.required,Validators.minLength(8)]],
            confirm : ['',Validators.required],
            type : ['']
          },{ validator : PasswordValidator });
    }

    changing = (val:Event) =>  (val.target as any).value === "" ? this.act=false : this.act=true;

    onSubmit = () => {
        // console.log(this.registerForm.value);
        let email=this.email?.value;
        let password=this.password?.value;
        let confirmPass=this.confirm?.value;
        let username=this.username?.value;
        let type=this.type?.value;
        if(email && password && confirmPass && username){
            if(password === confirmPass){
                var passwordHash=crypto.AES.encrypt(confirmPass,this.key).toString();
                let map = new Map<string,string>(); 
                map.set('email', email);
                map.set('password', passwordHash);
                map.set('username', username);
                map.set('type', type);
                const result = Object.fromEntries(map);
                console.log(result);
                this.connectionService.register(result).subscribe(res => console.log(res),err => console.log(err));
                this.registerForm=[];
            }
        }
    };

}
