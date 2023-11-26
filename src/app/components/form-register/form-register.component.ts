import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms'
import { User } from 'src/app/models/user';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent {

  public formulario: FormGroup

  constructor(private formBuilder: FormBuilder, public usuarioService: UsuarioService){
    this.buildForm()
  }

public registrar(){
  let user = this.formulario.value
  let newUser = new User(user.nombre, user.apellidos, user.email, user.url, user.contraseña)
  this.usuarioService.register(newUser).subscribe((respuesta) => console.log(respuesta))
}

private buildForm(){

  this.formulario = this.formBuilder.group({
    nombre: [, Validators.required],
    apellidos: [, Validators.required],
    email: [, [Validators.required, Validators.email]],
    url: [, Validators.required],
    contraseña: [, [Validators.required, Validators.minLength(8)]],
    confirmacion: [, [Validators.required, this.confirmaContraseña]]
  })
}

public confirmaContraseña(control: AbstractControl){

  let resultado = {noCoincide: true}

  if(control.parent?.value.contraseña === control.value) resultado = null

  return resultado
}

}
