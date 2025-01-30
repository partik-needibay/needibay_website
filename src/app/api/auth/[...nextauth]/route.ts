import axios from "axios"
import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextResponse } from "next/server"

//todo need to check and fix the session token

export const authOptions: AuthOptions = {
    pages: {
      signIn: '/login',
    },

  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials, req): Promise<any> {

        if (typeof credentials !== "undefined") {
          
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/customer/login`, {
            method: 'POST',
            body: JSON.stringify({ usernameOrEmail: credentials.email, password: credentials.password }),
            headers: { "Content-Type": "application/json" }
          })

          const authResponse = await res.json()


          // If no error and we have user data, return it
          if (res.ok && authResponse.data.userData) {
            // Any object returned will get saved on the user object available params only 
            // default param - 
            return {name: authResponse.data}
          }
          // Return null if user data could not be retrieved
          return null

        } else {
          return null
        }
      }
    }),
    CredentialsProvider({
      id: 'otp-login',
      name: 'OTP Login',
      credentials: {
        phone: { label: "Phone", type: "text" },
        session: {label: "Session", type: "text"},
        otp: {label: "OTP", type: "text"}
      },

      async authorize(credentials, req): Promise<any> {

        if (typeof credentials !== "undefined") {
          
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/customer/login-via-otp`, {
            method: 'POST',
            body: JSON.stringify({ phone: credentials.phone, session: credentials.session, otp: credentials.otp  }),
            headers: { "Content-Type": "application/json" }
          })

          const authResponse = await res.json()

          // If no error and we have user data, return it
          if (res.ok && authResponse.data?.userData) {
            // Any object returned will get saved on the user object available params only 
            // default param - 
            return {name: authResponse?.data}
          }
          // Return null if user data could not be retrieved
          return null

        } else {
          return null
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      
      token.info = user;
      return token
    },

    async session({ session, user, token }) {
      session.user.info = token.info
      
      return session
    },
  }

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }