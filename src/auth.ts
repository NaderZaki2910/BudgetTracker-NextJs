import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { siteConfig } from "./config/site";
import { api } from "./config/api";
import { userAgent } from "next/server";
import NextAuth from "next-auth"

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
  } = NextAuth({
    callbacks: {
      jwt({ token, user }) {
        if (user) { // User is available during sign-in
          console.log("user",user)
          token.token = user.token
        }
        return token
      },
      session({ session, token }) {
        console.log("token", token)
        session.user.token = token.token
        return session
      },
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              email: { label: "Email", type: "text" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              try{
                const res = await api("").post('api/login', {
                    "user": {
                      "email": credentials.email,
                      "password": credentials.password
                  }
                });
                if (res.status == 200 && res.headers.hasAuthorization) {
                  let token: string = res.headers["authorization"].toString();
                  console.log("response", res.data["status"]["data"]["user"])
                  token = token.split(' ')[1].replace('"', '');
                  res.data["status"]["data"]["user"]["token"] = token;
                  return res.data["status"]["data"]["user"];
                } else {
                  // If you return null then an error will be displayed advising the user to check their details.
                  throw Error('error type', { cause: { server_message: "Invalid" } });
          
                  // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
              }
              catch(error){
                console.log(error);
              }
              
            }
          })
    ],
    secret: siteConfig.secret
  });