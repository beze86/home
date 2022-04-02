import axios from 'axios';

import { ContactRepository } from 'client/modules/contacts/type/contact';

const PATH = '/api/v1/contacts';

export function contactsApi(): ContactRepository {
  return {
    getAllContacts() {
      return axios.get(PATH);
    },
    deleteContact(id) {
      return axios.delete(`${PATH}/${id}`);
    },
    createContact(fullName) {
      return axios.post(PATH, { fullName });
    },
  };
}
