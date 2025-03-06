import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { FeideProvider } from "./feide";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/app/prisma";

// Feide login
const FeideExtraScopes = ['email','displayName','userid','userinfo-name','openid'];
type ExtraClaims = { email: string; name: string,  }; // Custom claims based on scope 'email'

export const options: NextAuthOptions = {
    providers: [
        // if there are any problems with Feide, uncomment this 
        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID ?? "",
        //     clientSecret: process.env.GITHUB_SECRET ?? "",
        // }),
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
    ],
    callbacks: {
        session: ({session, token}) => {
            console.log("Session Callback", { session, token })
            return session
        },
        jwt: ({ token, user }) => {
            console.log("JWT Callback", {token, user})
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    
                }
            }
            return token
        }
    },
    adapter: PrismaAdapter(prisma),
}
