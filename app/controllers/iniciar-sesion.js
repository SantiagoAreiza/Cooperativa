import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';

export default Controller.extend({
  session: service(),
  error: { error: false, message: ""},

  camposInvalidos(arregloComponentes){
    for (var i = 0; i < arregloComponentes.length; i++) {
      if(arregloComponentes[i] === "" || typeof(arregloComponentes[i])=="undefined"){
        return true;
      }
    }
  },

  actions: {
    signIn() {
      var Email = this.get('Email');
      var Password = this.get('Contrasena');
      var MError = this.get('error');
      if(this.camposInvalidos([Email,Password])){
        set(MError,'error',true);
        set(MError,'message',"Campos incompletos");
      }else{
        this.get('session').open('firebase', {
          provider: 'password',
          email: Email,
          password: Password
        }).catch(function(error){
          set(MError,'error',true);
          set(MError,'message',error.message);
        });
        if(!get(MError,'error')){
          this.transitionToRoute('mensajes');
        }
      }
    },

    signOut() {
      this.get('session').close();
    }
  }
});
