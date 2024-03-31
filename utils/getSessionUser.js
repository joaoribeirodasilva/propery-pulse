import { getServerSession } from 'next-auth/next';
import { authOptions } from './authOptions';

export const getSessionUser = async () => {

  try {

    const session = await getServerSession(authOptions);

    // console.log('session: ', session)

    if (!session || !session.user) {
      return null;
    }
  
    return {
      user: session.user,
      userId: session.user.id,
    };

  } catch (e) {

    console.error('ERROR:', e);
    return null;
  }

}