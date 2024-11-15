export interface User {
  id: string;
  email: string;
  username: string;
  created_at: string;
}
import { authStatus } from './status';

export interface Package {
  id: string;
  packageName: string;
  description: string;
  price: string;
}

export interface PackageState {
  packages: Package[];
  status: authStatus;
  users: User[];
}
