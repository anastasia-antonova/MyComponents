export interface UserInterface {
  id: number;
  username: string;
  email: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
  manager: string;
  department: string;
  phone: string;
  gitHub: string;
  gitLab: string;
  gender: string;
  birthDate: string;
  position: string;
  profile: string;
  address: string;
  surname: string;
  name: string;
  image: string;
  banner: string;
}
