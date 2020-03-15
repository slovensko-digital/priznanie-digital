export interface PostponeUserInput {
  rodne_cislo: string;
  dic: string;
  prijmy_zo_zahranicia: boolean;

  meno_priezvisko: string;
  psc: string;
  obec: string;
  stat: string;
  datum: string;

  email?: string;
  newsletter?: boolean;
}
