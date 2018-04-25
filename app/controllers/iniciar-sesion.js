import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Controller.extend(FindQuery, {
  session: service(),
  error: false,
  errorMessage: "Campos invalidos",
  firebaseApp: service(),

  camposInvalidos: function(arregloComponentes){
    for (var i = 0; i < arregloComponentes.length; i++) {
      if(arregloComponentes[i] === "" ||typeof(arregloComponentes[i])=="undefined"){
        return true;
      }
    }
  },

  init() {
    this._super(...arguments);
		if(localStorage.rol!=='null'||typeof(localStorage.rol)!=='undefined'){
      this.transitionToRoute('mensajes');
		}
	},

  actions: {
    async signIn() {
      this.set('error', false);
      this.set('errorMessage' , 'Campos invalidos');
      var Email = this.get('Email');
      var Password = this.get('Contrasena');
      var MError = { error: false, message: "Campos invalidos"};
      if(this.camposInvalidos([Email,Password])){
        this.set('error', true);
      }else{
        await this.get('session').open('firebase', {
          provider: 'password',
          email: Email,
          password: Password
        }).catch(function(error){
          set(MError,'error',true);
          set(MError,'message',error.message);
        });
        this.set('error', MError.error);
        this.set('errorMessage', MError.message);
        if(!this.get('error')){
          this.transitionToRoute('mensajes');
          this.filterEqual(this.store, 'usuario', {'Correo':this.get('firebaseApp').auth().currentUser.email}, function(administradores){
            administradores.forEach(administrador => {
              localStorage.rol = administrador.get('Rol');
            });
          });
        }
      }
    },
  }
});
