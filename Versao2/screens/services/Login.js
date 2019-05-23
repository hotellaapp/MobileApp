
import { service } from '../constants';

export const getUserAuthorization = (username, password) => {
    return fetch(service.server.url + service.resources.login)
            .then((res) => res.json());
}
