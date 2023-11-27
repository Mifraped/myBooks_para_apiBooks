import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RespuestaUser } from 'src/app/models/respuesta-user';
import { User } from 'src/app/models/user';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public usuarioActual: User

  constructor(private usuarioService: UsuarioService, private toaster: ToastrService){
    this.usuarioActual = this.usuarioService.user
  }
  public imprimeNombre(): void{
    console.log(this.usuarioActual.name);
  }
  public editaUsuario(nomInput: HTMLInputElement, apelInput: HTMLInputElement, corrInput: HTMLInputElement, fotoInput: HTMLInputElement): void{
    let newUser = new User(
      nomInput.value ? nomInput.value : null,
      apelInput.value ? apelInput.value : null,
      corrInput.value ? corrInput.value : null,
      fotoInput.value ? fotoInput.value : null
    )
    newUser.id_user = this.usuarioService.user.id_user
    nomInput.value = ""
    apelInput.value = ""
    corrInput.value = ""
    fotoInput.value = ""
    this.usuarioService.edit(newUser).subscribe((respuesta: RespuestaUser) => {
      if(respuesta.error){
        this.toaster.error(respuesta.message)
      }else{
        this.toaster.success(respuesta.message)
        this.usuarioService.user = respuesta.data
        this.usuarioActual = this.usuarioService.user
      }
    })
  }
}