

import { Awaitable, User } from "next-auth";
import type { OAuthProviderButtonStyles, OAuthConfig } from "next-auth/providers/oauth";

export type FeideProviderBaseOptions = {
  clientId: string;
  clientSecret: string;
  style?: OAuthProviderButtonStyles;
  scopes?: string[];
  params?: Record<string, any>;
}

export type FeideRequiredClaims = {
  iss: string;
  jti: string;
  aud: string;
  sub: string;
  iat: number;
  exp: number;
  auth_time: number;
}

function createScopeQuery(scope: string[]) {
  return scope.join(" ");
}

/**
 * Feide Provider for NextAuth.js
 * 
 * @param options Options for Feide Provider
 * @option profileHandler Function to transform Feide Provider profile to NextAuth.js User object
 * @option scopes Extra custom scopes for Feide Provider (base: ["openid", "userid"]), use `profileHandle` and `CustomScopeClaims` when using custom scopes and claims
 * @option params Optional params for Feide Provider
 * @generic CustomScopeClaims Object with custom values returned from Feide Provider (when using custom scopes)
*/
export function FeideProvider<CustomScopeClaims extends Record<string, any> = {}>(
  options: FeideProviderBaseOptions & { profileHandler?: (profile: FeideRequiredClaims & CustomScopeClaims) => Awaitable<User> }
): OAuthConfig<FeideRequiredClaims & CustomScopeClaims> {
  
  const use_style = options.style ?? {
    logo: "https://raw.githubusercontent.com/TheVoxcraft/feide-provider-next-auth/1.0.0/icons/blaa_feide.svg",
    logoDark: "https://raw.githubusercontent.com/TheVoxcraft/feide-provider-next-auth/1.0.0/icons/hvit_feide.svg",
    bg: "#fff",
    text: "#1F4698",
    bgDark: "#1F4698",
    textDark: "#fff",
  };

  const use_scope = ["openid", "userid", ...(options.scopes ?? [])];

  const default_profileHandle = (profile: FeideRequiredClaims & CustomScopeClaims) => {
    console.error("No profileHandle function provided for Feide Provider, using default profileHandle function. This means that user will be lacking most fields.");
    console.log("Profile from Feide Provider:", profile);
    return {
      id: String(profile.sub),
      name: null,
      email: null,
      image: null,
    };
  }

  const use_profileHandle = options.profileHandler ?? default_profileHandle;

  return {
    id: "feide",
    name: "Feide",
    type: "oauth",
    wellKnown: "https://auth.dataporten.no/.well-known/openid-configuration",
    authorization: {
      url: "https://auth.dataporten.no/oauth/authorization",
      params: {
        scope: createScopeQuery(use_scope),
        ...options.params,
      }
    },
    checks: ["pkce", "state"],
    profile(profile) {
      return use_profileHandle(profile);
    },
    style: use_style,
    clientId: options.clientId,
    clientSecret: options.clientSecret,
  };
};