import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{
    constructor(private http: Http){

    }

    registerUser(registerData){
        this.http.post('http://localhost:30000/register', registerData).subscribe(res => {
        })
    }

    loginUser(loginData){
        this.http.post('http://localhost:30000/login', loginData).subscribe(res => {
            console.log(res);
            localStorage.setItem('token', res.json().token);
        })
    }
}