import { AxiosError } from "axios";

export type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: "ADMIN" | "USER";
};

export class AxiosErrorWithRetry extends AxiosError {
  constructor(public retry: boolean) {
    super();
    this.retry = false;
  }
}
