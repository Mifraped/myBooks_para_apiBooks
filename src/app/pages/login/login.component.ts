import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public usuario: User

  constructor(){
    this.usuario = new User()
  }

  public mandaForm(formulario: NgForm){
    console.log(this.usuario);
    
  }
}
