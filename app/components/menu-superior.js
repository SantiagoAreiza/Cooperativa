import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default Component.extend({
    session: service(),
    router: service(),
    actions: {
        signOut() {
            this.get('session').close();
            this.get('router').transitionTo('iniciar-sesion');
        }
    }
    
});
