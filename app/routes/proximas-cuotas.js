import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    session: service(),
    autenticacion: service(),

    proximasCuotas(valorPrestamo, ultimaCuota, valorPorPagar){
      var proximasCuotas = [{'faltaPagar': valorPorPagar,
                              'Abono': ultimaCuota.payment,
                              'Interes': ultimaCuota.interest, 
                              'Administracion': ultimaCuota.administration,
                              'Multa': ultimaCuota.fine,
                              'Fecha': ultimaCuota.date,
                              'Total': ultimaCuota.payment + ultimaCuota.interest + ultimaCuota.administration + ultimaCuota.fine }]
      var indiceUltimaCuota = proximasCuotas.length - 1;
      while(proximasCuotas[indiceUltimaCuota].faltaPagar - (valorPrestamo*0.12) > 0){
        var siguienteMes = Number(proximasCuotas[indiceUltimaCuota].Fecha.split('/')[1]) + 1;
        var siguienteFecha = proximasCuotas[indiceUltimaCuota].Fecha.split('/')[0] + '/' + siguienteMes + '/'
                              + proximasCuotas[indiceUltimaCuota].Fecha.split('/')[2];
        var proximaCuota = {'faltaPagar': proximasCuotas[indiceUltimaCuota].faltaPagar - (valorPrestamo*0.12),
                            'Abono': proximasCuotas[indiceUltimaCuota].faltaPagar*0.12,
                            'Interes': proximasCuotas[indiceUltimaCuota].faltaPagar*0.02,
                            'Administracion': 0,
                            'Multa': 0,
                            'Fecha': siguienteFecha,
                            'Total': proximasCuotas[indiceUltimaCuota].faltaPagar*0.12 + proximasCuotas[indiceUltimaCuota].faltaPagar*0.02}
        proximasCuotas = proximasCuotas.concat(proximaCuota);
        indiceUltimaCuota = indiceUltimaCuota + 1;
      }
      return proximasCuotas;
    },
  
    beforeModel() {
      if(!this.get('session').get('isAuthenticated')){
        return this.get('session').fetch()
          .then(()=>{
            this.store.findRecord('user', this.get('session').get('currentUser').uid)
              .then((user)=>{
                this.get('autenticacion').setRol(user.get('role'));
              })
          }).catch(()=>{});
      }
    },
    
    model(){
    this.store.findAll('fee');
    this.store.findAll('loan');
    return this.store.findRecord('user', this.get('session').get('currentUser').uid)
      .then((usuario)=>{
        var cuotasTemporales = [];
        var valorPrestamo = 0;
        var valorPorPagar = 0;
        usuario.get('loans').forEach((prestamo)=>{
          if(prestamo.get('state')){
            valorPrestamo = prestamo.get('value');
            valorPorPagar = prestamo.get('value');
            prestamo.get('fees').forEach((cuota) => {
              valorPorPagar = valorPorPagar - cuota.get('payment'); 
              var nuevaCuota = {
                payment: cuota.get('payment'),
                interest: cuota.get('interest'),
                fine: cuota.get('fine'),
                administration: cuota.get('administration'),
                date: cuota.get('date'),
              };
              cuotasTemporales = cuotasTemporales.concat(nuevaCuota);
            })
          }
        });
        cuotasTemporales.sort(function(a,b){
          return new Date(b.date.split('/')[2], b.date.split('/')[1], b.date.split('/')[0]) - 
            new Date(a.date.split('/')[2], a.date.split('/')[1], a.date.split('/')[0])
        });
        return {ultimaCuota: cuotasTemporales[0], valorPrestamo: valorPrestamo, valorPorPagar: valorPorPagar};
      }).then((cuota)=>{
        return this.proximasCuotas(cuota.valorPrestamo, cuota.ultimaCuota, cuota.valorPorPagar);
      });
    },

    afterModel(){
        if(this.get('autenticacion').getRol() == 'Admin'){
            this.transitionTo('mensajes');
        }
    }
});
