import { strings } from '../../locales/i18n';

const significadosHelper = {

  giveState(state) {
    if (state == 3) {
      return strings('request_state.3');
    } else if (state == 2) {
      return strings('request_state.2');
    } else if (state == 1) {
      return strings('request_state.1');
    } else {
      return strings('request_state.0');
    }
  },

  givePagamento(pago) {
    if (pago == 0) {
      return strings('pay_state.0');
    } else {
      return strings('pay_state.1');
    }
  },


  givePreco(preco) {
    return preco + '€';
  },


  giveStateRequest(state) {
    if (state == 0) {
      return strings('request_aval.0');
    } else if (state == 1) {
      return strings('request_aval.1');
    }
    return strings('request_aval.3');
  },


giveUnidades(tipo)  {
  if (tipo == 'Hora') {
    return strings('pedidoReq.T_Hours');
  }
    return strings('pedidoReq.T_Units');
},

giveHowMuch(tipo)  {
  if (tipo == 'Hora') {
    return strings('pedidoReq.PH_Hours');
  }
    return strings('pedidoReq.PH_Units');
}
  }

export default significadosHelper;

