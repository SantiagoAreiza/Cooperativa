import Controller from '@ember/controller';

export default Controller.extend({
	user: null,
	error: false,
	errorMessage:"Campos incompletos",
	verCuota: false,
	multa: false,
	objetoPrestamo:null,
	valAdministracion:0,
	valMulta:0,
	valInteres:0,
	valAbono:0,
	valorTotalMulta:0,
	valorTotal:0,
	estadoAhorroMes:false,
	estadoCuotaMes:false,

	actions:{

		updateValue: function(value) {

			this.set('user', value);
			const usuarioSeleccionado = this.get('user');

			this.set('detalleCuota',null);
			this.set('sinCuotas',null);
			this.set('valorAbono',null);
			this.set('valorInteres',null);
			this.set('valorMulta',null);
			this.set('valorAdministracion',null);
			this.set('valorPrestamo',null);
			this.set('fechaPrestamo',null);
			this.set('montoParcial',null);
			this.set('valorTotalMulta',null);
			this.set('valorTotal',null);
			
			


			if(usuarioSeleccionado != 'vacio'){
				this.set('verCuota',true);

				this.store.findRecord('user',usuarioSeleccionado).then((usuarioEncontrado)=> {
					usuarioEncontrado.get('loans').then((prestamos)=>{
						prestamos.forEach((prestamo)=>{

							if(prestamo.get('state')==true){
								this.objetoPrestamo = prestamo;
								const valorPrestamo = parseInt(prestamo.get('value'));
								
								this.set('valorPrestamo',('Valor del préstamo: ' + ('$' + Number(valorPrestamo).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))));
								this.set('fechaPrestamo',('Fecha del préstamo: ' + prestamo.get('date')));
								var montoParcial = 0;

								prestamo.get('fees').then((cuotas)=>{									
									
									if(cuotas.length == 0){
										var fecha = new Date();
										if((fecha.getMonth()+1) == prestamo.get('date').split("/")[1]){										
											this.set('sinCuotas','El socio aún no ha pagado ninguna cuota');
											this.set('valorAbono',('Valor abono: 0'));
											this.valAbono = 0;

											this.set('valorInteres',('Valor interés: 0'));
											this.valInteres = 0;

											this.set('valorAdministracion',('Valor administracion: '+ ('$' + Number(valorPrestamo*(0.01)).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))));
											this.valAdministracion = valorPrestamo*(0.01);

											if(this.get('multa')==true){
												this.set('valorMulta','Valor multa: $10.000');
												this.valMulta = 10000;
											}
										}
									}else{
										cuotas.forEach((cuota)=>{
										montoParcial = montoParcial + parseInt(cuota.get('payment'));
										})
										this.set('montoParcial',('El socio ha pagado del préstamo: ' + ('$' + Number(montoParcial).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))));

										if((valorPrestamo-montoParcial)<=0){
											this.set('sinCuotas','El socio ya ha pagado el préstamo');
										}else{
											
											this.set('detalleCuota','Detalles de la cuota a pagar: ');

											if((valorPrestamo-montoParcial)>valorPrestamo*(0.12)){
												this.set('valorAbono',('Valor abono: ' + ('$' + Number(valorPrestamo*(0.12)).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))));
												this.valAbono = valorPrestamo*(0.12);
											}else{
												this.set('valorAbono',('Valor abono: ' + ('$' + Number(valorPrestamo-montoParcial).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))));
												this.valAbono = (valorPrestamo-montoParcial);
											}	

											this.set('montoRestante',(this.valorPrestamo-this.montoParcial).toString());

											this.set('valorInteres',('Valor interés: '+	('$' + Number(valorPrestamo*(0.02)).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))));
											this.valInteres = valorPrestamo*(0.02);

											this.set('valorTotal', ('$' + Number(this.get('valAdministracion') + this.get('valInteres') + this.get('valAbono')).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
											this.set('valorTotalMulta',('$' + Number(this.get('valAdministracion') + this.get('valInteres') + this.get('valAbono') + 10000).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
										
											if(this.get('multa')==true){
												this.set('valorMulta','Valor multa: $10.000');
												this.valMulta = 10000;
											}
										}
									}
								});
							}
						});
					});
				});
			}else{
				this.set('verCuota',true);
			}
		},

		insertarCuota: function(){

			
			var fechaActual = new Date();
			this.objetoPrestamo.get('fees').then((cuotas)=>{
				cuotas.forEach((cuota)=>{					
					var fecha_ = new Date();
							if((fecha_.getMonth()+1) == (cuota.get('date').split("/")[1])){
									this.estadoCuotaMes =true;
							}
						});

						if(this.estadoCuotaMes){
							this.set('error',true);
							this.set('errorMessage',"Error: El socio ya ha insertado un ahorro el mes actual");
						}else{
							var cuotaPrestamo = this.get('store').createRecord('fee',{
								administration: parseInt(this.valAdministracion),
								date: fechaActual.getDate().toString() + '/' + (fechaActual.getMonth() + 1).toString() + '/' + fechaActual.getFullYear().toString(),
								fine: parseInt(this.valMulta),
								interest: parseInt(this.valInteres),
								payment: parseInt(document.getElementById('valorAbono').value),
							});
									
							
							this.store.findRecord('loan',this.objetoPrestamo.get('id')).then((prestamoEncontrado) => {
								cuotaPrestamo.set('loan', prestamoEncontrado);
								prestamoEncontrado.get('fees').addObject(cuotaPrestamo);
								cuotaPrestamo.save().then(() =>{
									return prestamoEncontrado.save().then(()=>{
										this.set('error',true);
										this.set('errorMessage',"Exito: Cuota insetada exitósamente");
									});
								})
							})
						}
					})
				},

		insertarAhorro: function(){			

			const usuario_ahorro = this.get('user');
			var fechaActual = new Date();
			fechaActual =  fechaActual.getDate().toString() + '/' + (fechaActual.getMonth() + 1).toString() + '/' + fechaActual.getFullYear().toString()
			var cuota_ahorro;
			if(usuario_ahorro == null){
					this.set('errorMessage', 'Por favor seleccione un usuario válido');
					this.set('error', true);
			}else{

				this.store.findRecord('user',usuario_ahorro).then((socio_encontrado) => {
						socio_encontrado.get('savings').then((ahorros)=>{
							ahorros.forEach((ahorro)=>{
							var fecha_ = new Date();
							if((fecha_.getMonth()+1) == (ahorro.get('date').split("/")[1]) && this.estadoAhorroMes != true){
								this.estadoAhorroMes = true;
							}
						});

						if(this.estadoAhorroMes){
							this.set('error',true);
							this.set('errorMessage',"Error: El socio ya ha insertado un ahorro el mes actual");
						}
						else{
							if(this.get('model').fecha){
								this.set('advertencia_usuario',null);
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
											this.set('errorMessage',"Exito: Ahorro insertado con éxito");
										})
									})
								});
							}
						}
					});
				})
			}
		}
	}
});

