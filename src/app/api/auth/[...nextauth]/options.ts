import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { FeideProvider } from "./feide";

// Feide login
const FeideExtraScopes = ['email','displayName','userid','userinfo-name','openid'];
type ExtraClaims = { email: string; name: string,  }; // Custom claims based on scope 'email'

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        FeideProvider<ExtraClaims>({
            clientId: process.env.FEIDE_CLIENT_ID ?? "",
            clientSecret: process.env.FEIDE_CLIENT_SECRET ?? "",
            scopes: FeideExtraScopes,
            profileHandler: (profile) => { 
                console.log(profile);
                return { 
                    id: profile.sub, 
                    email: profile.email,
                    name: profile.name,
                }; 
            },
            params: {
                // Waiting on ntnu.no activating omegaauctionen for feide login
                authselection: "feide|realm|testusers.feide.no", // TODO: change all to realm|ntnu.no
            },
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username",
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                // This is where we need to retrieve user data
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                // TODO: Add credentials retrieval function
                const user = { id: "42", name: "Albert", password: "Supersøt student"}
                if (credentials?.username === user.name && 
                    credentials?.password === user.password) {
                        return user;
                } else {
                    return null;
                }
            }
        })
    ],
}
