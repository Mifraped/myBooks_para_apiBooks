import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent {

  public formulario: FormGroup

  constructor(private formBuilder: FormBuilder){
    this.buildForm()
  }

public registrar(){
  const user = this.formulario.value
  console.log(user);
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
