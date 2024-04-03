import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name : 'Credentials',
            credentials : {
                user : {
                    label : "Username",
                    type : "text"
                },
                password : {
                    label : "Password",
                    type : "password"
                }
            },
            async authorize(credentials, req){

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth`,{
                    method: "POST",
                    body: JSON.stringify({
                        username: credentials?.user,
                        password: credentials?.password
                    }),
                    headers: {"Content-Type" : "application/json"}
                })

                const user = await res.json();
                if(user.error) throw new Error("Invalid Credentials")

                return user
            }
        })
    ],
    callbacks: {
        jwt({account,token,user,profile,session}){
            if(user) token.user = user;
            return token
        },
        session({session,token}){
            session.user = token.user;
            console.log(session)
            return session;
        }
    }
})

export {handler as GET, handler as POST}