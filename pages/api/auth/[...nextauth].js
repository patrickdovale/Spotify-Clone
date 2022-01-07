import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken() {
  try {
    spotifyApi.setAccessToken(toke.accessToken);
    spotifyApi.setRefreshToken(toke.refreshToken);

    const { body: refreshedToken } = await refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_at * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: "refreshAccessTokenError"
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL
    })
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, account, user }) {
      //Login Inicial
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000
        };
      }

      //Refresh Token

      // Token verificado e continua valido
      if (Date.now() < accessTokenExpires) {
        return token;
      }

      // Token verificado e expirou
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
        session.user.accessToken = token.accessToken
        session.user.refreshToken = token.refreshToken
        session.user.username = token.username
        
        return session;
    }
  }
});
