import api from '../services/api';

import { ICostumerInternetInformation } from '../pages/Main';

export default async function (pppoe: string) {
    if (pppoe === '') {
        throw new Error('Preencha o campo com um nome de usuario válido!');
    }

    const response = await api.get<ICostumerInternetInformation>('', {
        params: {
            pppoe,
        }
    });

    const costumerSpeedInformation = response.data;

    if( !costumerSpeedInformation.pppoe || costumerSpeedInformation.pppoe.length > 25 ) {
        throw new Error(`O usuario ${pppoe} não esta conectado!`);
    }

    return costumerSpeedInformation;
}
