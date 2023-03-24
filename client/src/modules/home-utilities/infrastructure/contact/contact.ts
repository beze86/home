import { authenticationToken } from 'client/modules/authentication-token/application/authentication-token';
import { ContactRepository } from 'client/modules/home-utilities/domain/contact/contact';

const PATH = '/api/v1/contacts';

const API = authenticationToken(PATH);

const contactApi = (): ContactRepository => {
  return {
    async getContacts() {
      try {
        const { data } = await API.get('/');
        return data;
      } catch {
        throw new Error('Failed to fetch contacts list');
      }
    },
    async deleteContact(id) {
      try {
        await API.delete(`/${id}`);
      } catch {
        throw new Error(`Failed to delete contact with id: ${id}`);
      }
    },
    async createContact(data) {
      try {
        await API.post('/', data);
      } catch {
        throw new Error('Failed to create contact');
      }
    },
  };
};

export { contactApi };
