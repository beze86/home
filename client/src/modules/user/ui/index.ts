import { application } from 'client/modules/user/application';
import { userApi } from 'client/modules/user/infrastructure/user';

const Api = application({ repositories: { user: userApi() } });

export { Api };
