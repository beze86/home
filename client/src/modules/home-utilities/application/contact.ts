import { ContactRepository } from 'client/modules/home-utilities/domain/contact/contact';

const ContactService = (repository: ContactRepository): ContactRepository => {
  return {
    getContacts: () => repository.getContacts(),
    createContact: (data) => repository.createContact(data),
    deleteContact: (id) => repository.deleteContact(id),
  };
};

export { ContactService };
