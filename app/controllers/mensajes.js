import Controller from '@ember/controller';

const mensajes = Ember.A(["Santiago trabaje mijo haha","sexo"  ]);

export default Controller.extend({
    

    inputData:{hola:"sexo"},
    country : null,
    countrySource : function(query, syncResults, asyncResults) {
      const regex = new RegExp(`.*${query}.*`, 'i');
      const results = mensajes.filter((item, index, enumerable) => {
        return regex.test(item);
      })
      syncResults(results);
    },

    actions: {
        publicarMensaje() {
            var nuevoMensaje = this.store.createRecord('mensaje', {
                texto: 'My awesome new comment',
                fecha: 123233
            });


            var   administrador = this.store.createRecord('administrador', {
                nombre: 'Simon',
                correo: 'szeag2@aa.com'
            });

                administrador.get('mensajes').addObject(nuevoMensaje)

            // Save the comment, then save the post
            nuevoMensaje.save().then(function () {
                return administrador.save();
            });
        },
        mostrar(){
            console.log(this.get('person'))
        }
    }

});
