import { authenticationToken } from 'client/modules/authentication-token/application/authentication-token';
import { ContactRepository } from 'client/modules/home-tasks/domain/contact/contact';

const PATH = '/api/v1/contacts';

const API = authenticationToken(PATH);

export function contactsApi(): ContactRepository {
  return {
    getAllContactsByUser() {
      return API.get('/');
    },
    deleteContact(id) {
      return API.delete(`/${id}`);
    },
    createContact(fullName) {
      return API.post('/', { fullName });
    },
  };
}
