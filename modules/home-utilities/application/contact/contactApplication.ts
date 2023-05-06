import { ContactRepository, CreateContact, DeleteContact, GetContacts } from '../../domain/contact/contact';

class ContactApplication implements ContactRepository {
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

  deleteContact({ userId, id }: DeleteContact) {
    return this.repository.deleteContact({ userId, id });
  }
}

export { ContactApplication };
