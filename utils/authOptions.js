import GoogleProvuder from 'next-auth/providers/google';

import connectDB from '@/config/database';
import User from '@/models/User';


export const authOptions = {
  providers: [
    GoogleProvuder({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Remove if you dont whant to be asked for an accont every time
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  callbacks: {
    // Invoked on successful signin
    async signIn( { profile } ) {

      await connectDB();

      // console.log('profile email:',profile.email)
      const userExists = await User.findOne({ email: profile.email});

      if (!userExists) {

        const username = profile.name.slice(0,50);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture
        });
      }

      return true

    },
    // Modifies the session object
    async session( { session } ) {

      await connectDB();
      
      if(!session || !session.user || !session.user.email ) {
        return null;
      }
      // console.log('user email:',session.user.email)
      const user = await User.findOne({user: session.user.email});
      // console.log('user id: ',user._id)
      session.user.id = user._id.toString();
      return session;
    }
  }
}