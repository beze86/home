import {
  RegisterUser,
  DeleteUser,
  GetByEmail,
  ContactToUser,
  AreaToUser,
  TasksToUser,
  EventToUser,
  UserRepository,
} from '../domain/user';

class UserApplication implements UserRepository {
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  getUserByEmail({ email }: GetByEmail) {
    return this.repository.getUserByEmail({ email });
  }

  deleteUser({ id }: DeleteUser) {
    return this.repository.deleteUser({ id });
  }

  registerUser(data: RegisterUser) {
    return this.repository.registerUser(data);
  }

  addContactToUser({ userId, contactId }: ContactToUser) {
    return this.repository.addContactToUser({ userId, contactId });
  }

  removeContactFromUser({ userId, contactId }: ContactToUser) {
    return this.repository.removeContactFromUser({ userId, contactId });
  }

  addAreaToUser({ userId, areaId }: AreaToUser) {
    return this.repository.addAreaToUser({ userId, areaId });
  }

  removeAreaFromUser({ userId, areaId }: AreaToUser) {
    return this.repository.removeAreaFromUser({ userId, areaId });
  }

  addWeeklyTasksToUser({ userId, tasksId }: TasksToUser) {
    return this.repository.addWeeklyTasksToUser({ userId, tasksId });
  }

  removeWeeklyTasksFromUser({ userId, tasksId }: TasksToUser) {
    return this.repository.removeWeeklyTasksFromUser({ userId, tasksId });
  }

  addEventToUser({ userId, eventId }: EventToUser) {
    return this.repository.addEventToUser({ userId, eventId });
  }

  removeEventFromUser({ userId, eventId }: EventToUser) {
    return this.repository.removeEventFromUser({ userId, eventId });
  }
}

export default UserApplication;
