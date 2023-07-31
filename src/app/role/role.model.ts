export const enum ROLES {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_JOUEUR = "ROLE_JOUEUR",
  ROLE_ENTRAINEUR = "ROLE_ENTRAINEUR"
}

export class Role {
  idRole: number;
  name: ROLES;

  constructor() {
  }
}
