import Route from '@ember/routing/route';

export default Route.extend({

    model: function() {
        
        return this.store.findAll('mensaje');
      },
      setupController(controller,model){
        this._super(...arguments);
        controller.set('solutionTypes',model);
      }
});
