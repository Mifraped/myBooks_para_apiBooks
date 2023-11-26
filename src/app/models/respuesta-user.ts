import { User } from "./user";

export class RespuestaUser {
    constructor(
        public error: boolean,
        public codigo: number,
        public message: string,
        public data: User
      ) {}
}
