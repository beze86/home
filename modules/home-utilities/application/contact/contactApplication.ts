import { ContactRepository, CreateContact, DeleteContact, GetContacts } from '../../domain/contact/contact';

class ContactApplication {
  private readonly repository: ContactRepository;

  constructor(repository: ContactRepository) {
    this.repository = repository;
  }

  getContacts({ userId }: GetContacts) {
    return this.repository.getContacts({ userId });
  }

  createContact({ userId, name }: CreateContact) {
    return this.repository.createContact({ userId, name });
  }

  deleteContact({ id }: DeleteContact) {
    return this.repository.deleteContact({ id });
  }
}

export { ContactApplication };
