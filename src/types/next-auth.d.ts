import { Session, DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession{
    token: string;
  }

  interface User extends DefaultUser{
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT{
    token: string;
  }
}