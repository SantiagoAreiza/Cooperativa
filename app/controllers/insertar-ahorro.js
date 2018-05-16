import Controller from '@ember/controller';

export default Controller.extend({
	user: null,
	error: false,
	errorMessage: "Campos incompletos",

	actions:{
		updateValue: function(value) {
			this.set('user', value);
		},
			
		insertarAhorro(){
			const usuario_ahorro = this.get('user');
			var fechaActual = new Date();            
			fechaActual =  fechaActual.getDate().toString() + '/' + (fechaActual.getMonth() + 1).toString() + '/' + fechaActual.getFullYear().toString()
			var cuota_ahorro;
			if(usuario_ahorro == null){
					this.set('errorMessage', 'Por favor seleccione un usuario válido');
					this.set('error', true);
			}else{
				this.set('advertencia_usuario',null);
				if(this.get('model').fecha){
					cuota_ahorro = this.get('store').createRecord('saving',{
						solidarityFund: 1000,
						baseFee: 30000,
						bond: 20000,
						date: fechaActual.toString()
					});
					this.store.findRecord('user',usuario_ahorro).then((socio_encontrado) => {
						cuota_ahorro.set('user', socio_encontrado);
						socio_encontrado.get('savings').addObject(cuota_ahorro);
						cuota_ahorro.save().then(() =>{
							return socio_encontrado.save().then(()=>{                                
								this.set('error',true);
								this.set('errorMessage',"Exito: Mensaje publicado con éxito");
								});
							})
						})
				}else{
					cuota_ahorro = this.get('store').createRecord('saving',{
						solidarityFund: 1000,
						baseFee: 30000,
						bond: 0,
						date: fechaActual.toString(),
					});
					this.store.findRecord('user',usuario_ahorro).then((socio_encontrado) => {
						cuota_ahorro.set('user', socio_encontrado);
						socio_encontrado.get('savings').addObject(cuota_ahorro);
						cuota_ahorro.save().then(() =>{
							return socio_encontrado.save().then(()=>{                                
								this.set('error',true);
								this.set('errorMessage',"Exito: Mensaje publicado con éxito");
							})
						})
					});
				}
			}
		}
	}
});

