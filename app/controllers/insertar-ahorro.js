import Controller from '@ember/controller';

export default Controller.extend({
    user: null,
    actions:{

        updateValue: function(value) {
            this.set('user', value);
          },
        
        insertarAhorro(){

            const usuario_ahorro = this.get('user');
            var fechaActual = new Date();            
            fechaActual=  fechaActual.getDate().toString() + '/' + (fechaActual.getMonth() + 1).toString() + '/' + fechaActual.getFullYear().toString()
          
            if(usuario_ahorro == null){                
                this.set('advertencia_usuario','Por favor seleccione un usuario válido');
            }else{
                this.set('advertencia_usuario',null);

                if(this.get('model').fecha){
                    var cuota_ahorro = this.get('store').createRecord('saving',{

                        solidarityFund: 1000,
                        baseFee: 30000,
                        bond: 20000,
                        date: fechaActual.toString(),
                        user: usuario_ahorro,
                    });
                    
                    this.store.findRecord('user',usuario_ahorro).then(function(socio_encontrado){
                        socio_encontrado.get('savings').addObject(cuota_ahorro);
                        cuota_ahorro.save().then(() =>{
                            return socio_encontrado.save().then(()=>{
                                    console.log('inserción exitosa');
                               })
                            })
                        });
                  
                 
                }else{
                    var cuota_ahorro = this.get('store').createRecord('saving',{

                        solidarityFund: 1000,
                        baseFee: 30000,
                        bond: 0,
                        date: fechaActual.toString(),
                        user: usuario_ahorro,
                    });

                    this.store.findRecord('user',usuario_ahorro).then(function(socio_encontrado){
                        socio_encontrado.get('savings').addObject(cuota_ahorro);
                        cuota_ahorro.save().then(() =>{
                            return socio_encontrado.save().then(()=>{                                
                                  console.log('inserción exitosa');
                               })
                            })
                        });               
                }
            }            
        }
    }    
});

