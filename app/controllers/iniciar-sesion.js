import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  autenticacion: service(),
  error: false,
  errorMessage: null,

  camposInvalidos(arregloComponentes){
    for (var i = 0; i < arregloComponentes.length; i++) {
      if(arregloComponentes[i] === "" ||typeof(arregloComponentes[i])=="undefined"){
        return true;
      }
    }
  },

  actions: {
    signIn() {
      this.set('error', false);
      var Email = this.get('email');
      var Password = this.get('Contrasena');
      var Regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if(this.camposInvalidos([Email,Password])){
        this.set('error', true);
        this.set('errorMessage' , 'Campos incompletos');
      }else if(!(Regex.test(Email))){
        this.set('error', true);
        this.set('errorMessage' , 'Formato del correo invalido');
        this.set('email','');
        this.set('Contrasena','');
      }else if(Password.length < 6){
        this.set('error', true);
        this.set('errorMessage' , 'La contraseña debe ser más de 6 digitos');
        this.set('Contrasena','');
      }else{
        this.get('session').open('firebase', {
          provider: 'password',
          email: Email,
          password: Password
        }).then(() => {
          this.store.query('usuario', {
            orderBy: 'correo',
            equalTo: Email
          }).then((users)=> {
            users.forEach(user => {
              this.get('autenticacion').setRol(user.get('rol'));
              this.transitionToRoute('mensajes');
              this.set('Contrasena','');
              this.set('Email','');
            });
          }).catch((error) => {
            this.set('error', true);
            this.set('errorMessage' , error.message);
          });
        }).catch((error) => {
          this.set('error', true);
          switch(error.code) {
            case "auth/user-not-found":
                this.set('errorMessage' , 'Ese correo no está registrado');
                this.set('email','');
                this.set('Contrasena','');
                break;
            case "auth/wrong-password":
                this.set('errorMessage' , 'Contraseña incorrecta');
                this.set('Contrasena','');
                break;
            default:
              this.set('errorMessage' , error.message);
          }
        });
      }
    },
  }
});
