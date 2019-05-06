import { FontIcons } from '../../assets/icons';
import GridV1 from './tabInterno/Servicos';
import _ from 'lodash';

export const MainRoutes = {


  giveRoutesIcon(categoria) {
    //return FontIcons.categoria;

    if (categoria == 'Piscina')
      return FontIcons.Piscina;
    if (categoria == 'Bar')
      return FontIcons.Bar;
    if (categoria == 'Serviço de Quarto')
      return FontIcons.ServiçodeQuarto;
    if (categoria == 'Desporto')
      return FontIcons.Desporto;
    if (categoria == 'Lazer')
      return FontIcons.Lazer;
    if (categoria == 'Restaurante')
      return FontIcons.Restaurante;
    if (categoria == 'Extra-Hotel')
      return FontIcons.ExtraHotel;
    if (categoria == 'SPA')
      return FontIcons.SPA;
    if (categoria == 'Aluguer')
      return FontIcons.Aluguer;

    else
    return FontIcons.Default;

  }



}
