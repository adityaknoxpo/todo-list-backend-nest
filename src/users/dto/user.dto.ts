import { Request } from 'express';

export type User = {
  id: string;
  email: string;
  name: string;
  birthYear: number;
  createdAt: string;
  updatedAt: string;
};

export interface RequestType extends Request {
    user: User
}
