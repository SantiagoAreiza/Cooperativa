import Controller from '@ember/controller';

export default Controller.extend({

	actions:{
		solicitarPrestamo(){
			var estadoPrestamo = false;
			var valorSolicitado = document.getElementById('valorSolicitado').value;
			var fechaActual = new Date();
			this.store.findRecord('user', this.get('session').get('currentUser').uid).then((usuario)=>{
				usuario.get('loans').then((prestamos)=>{
					prestamos.forEach((prestamo)=>{
						if(prestamo.get('state')){
							estadoPrestamo = true;
						}
					})					
					if(estadoPrestamo){
						this.set('notificacionSolicitud','Usted ya tiene un préstamo activo, la solicitud no puede ser realizada');
					}else{
						if(valorSolicitado<=0){
							this.set('notificacionSolicitud','El monto solicitado debe ser mayor a 0');
			
						}else if(fechaActual.getMonth() > 9){
							this.set('notificacionSolicitud','Fecha no válida para solicitar préstamos');
						}else if(valorSolicitado > 1200000){
							this.set('notificacionSolicitud',"El monto solicitado debe ser menor a $1'200.000");
						}else{
								var solicitudPrestamo = this.get('store').createRecord('loan',{
								value: parseInt(valorSolicitado),
								state: false,
								date: fechaActual.getDate().toString() + '/' + (fechaActual.getMonth() + 1).toString() + '/' + fechaActual.getFullYear().toString(),
								
						});

						this.store.findRecord('user',this.get('session').get('currentUser').uid).then((usuarioEncontrado) => {
							solicitudPrestamo.set('user',usuarioEncontrado);
							usuarioEncontrado.get('loans').addObject(solicitudPrestamo);
							solicitudPrestamo.save().then(() =>{
								return usuarioEncontrado.save().then(()=>{								
									this.set('notificacionSolicitud',"Exito: Préstamos solicitado exitósamente");
								});
							})
						})
						}
					}
				})
			});
		}
	}
});
