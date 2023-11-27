import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { Respuesta } from 'src/app/models/respuesta';
import { RespuestaUser } from 'src/app/models/respuesta-user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public usuario: User

  constructor(private usuarioService: UsuarioService, private router: Router, private toaster: ToastrService){
    this.usuario = new User()
  }

  public mandaForm(formulario: NgForm){
    this.usuarioService.login(this.usuario).subscribe((respuesta: RespuestaUser) => {
      
      if(respuesta.error){
        this.toaster.error(respuesta.message)
      }else{
        this.usuarioService.logueado = true
        this.usuarioService.user = respuesta.data
        this.router.navigate(["books"])
      }
    })
  }
}
