import axios from 'axios';

import { profileStorageKey } from 'client/modules/auth/type/auth';
import { ContactRepository } from 'client/modules/contacts/type/contact';

const PATH = '/api/v1/contacts';

const API = axios.create({ baseURL: PATH });

API.interceptors.request.use((req) => {
  const storedItem = localStorage.getItem(profileStorageKey);
  if (storedItem) {
    if (req.headers) {
      req.headers.authorization = `Bearer ${JSON.parse(storedItem).token}`;
    }
  }
  return req;
});

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
