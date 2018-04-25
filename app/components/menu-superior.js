import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';


export default Component.extend({
    session: service(),
    router: service(),
    Admin: computed(function(){
		return localStorage.rol == "Admin";
    }),
    
    actions: {
        signOut() {
            this.get('session').close();
            this.get('router').transitionTo('iniciar-sesion');
            localStorage.rol = null;
        }
    }
    
});
