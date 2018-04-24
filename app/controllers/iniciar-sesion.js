import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Controller.extend({
  session: service(),
  error: false,
	errorMessage: "Campos invalidos",

  camposInvalidos: function(arregloComponentes){
    for (var i = 0; i < arregloComponentes.length; i++) {
      if(arregloComponentes[i] === "" ||typeof(arregloComponentes[i])=="undefined"){
        return true;
      }
    }
  },

  actions: {
    async signIn() {
      var Email = this.get('Email');
      var Password = this.get('Contrasena');
      var MError = { error: false, message: "Campos invalidos"};
      if(this.camposInvalidos([Email,Password])){
        this.set('error', true);
      }else{
        var promesa = await this.get('session').open('firebase', {
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
        }
      }
    },

    signOut() {
      this.get('session').close();
    }
  }
});
