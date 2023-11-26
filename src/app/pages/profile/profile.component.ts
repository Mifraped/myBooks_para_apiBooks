import { Component } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public defaultUser: User

  constructor(){
    this.defaultUser = new User(1,"Pepe", "Perez Rodriguez", "pepeperez@gmail.com", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVreRpQts-EFHcz_tP9nA28prohIR-WT5Y1A&usqp=CAU", "pepepassword")
  }
  public imprimeNombre(): void{
    console.log(this.defaultUser.name);
  }
  public editaUsuario(nomInput: HTMLInputElement, apelInput: HTMLInputElement, corrInput: HTMLInputElement, fotoInput: HTMLInputElement): void{
    this.defaultUser.name = nomInput.value
    this.defaultUser.last_name = apelInput.value
    this.defaultUser.email = corrInput.value
    this.defaultUser.photo = fotoInput.value    
  }
}