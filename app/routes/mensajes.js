import Route from '@ember/routing/route';

export default Route.extend({

    model: function() {
        console.log(this.store.findAll('mensaje'));
        return this.store.findAll('mensaje');
      }
});
