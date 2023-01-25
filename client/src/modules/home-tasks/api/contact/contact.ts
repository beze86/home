import { authenticationToken } from 'client/modules/authentication-token/application/authentication-token';
import { ContactRepository } from 'client/modules/home-tasks/domain/contact/contact';

const PATH = '/api/v1/contacts';

const API = authenticationToken(PATH);

export function contactsApi(): ContactRepository {
  return {
    async getAllContactsByUser() {
      try {
        const { data } = await API.get('/');
        return data;
      } catch (err) {
        throw new Error('Failed to fetch contacts list');
      }
    },
    async deleteContact(id) {
      try {
        await API.delete(`/${id}`);
      } catch (err) {
        throw new Error(`Failed to delete contact with id: ${id}`);
      }
    },
    async createContact(data) {
      try {
        await API.post('/', data);
      } catch (err) {
        throw new Error('Failed to create contact');
      }
    },
  };
}
