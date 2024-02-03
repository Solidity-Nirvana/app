import Dashboard from "./dashboard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import {getLocale} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';

import dbConnect from 'lib/dbConnect'
import User from "models/User";

async function fetchData() {
  await dbConnect();
  
  // Get the session from the context
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.name) {
    return { status: false, membership: 'Free' };
  }

  /* find data based on session.username in our database */
  const result = await User.findOne({ email: session.user.email });

  if (!result) {

    // User not found, create and insert a new user
    const newUser = new User({
      email: session.user.email,
      membership: 'Free'
    });

    try {
      const savedUser = await newUser.save();
      return { status: false, membership: savedUser.membership };
    } catch (error) {
      console.error('Error creating and saving user:', error);
      return { status: false, membership: 'Free' };
    }

  }
  else {
    return {status: false, membership: result.membership};
  }

}

export default async function Nav() {
  const locale = await getLocale();
  const messages = (await import(`../../../messages/${locale}.json`))
  
  const member = await fetchData();
  const session = await getServerSession(authOptions);
  return <NextIntlClientProvider messages={messages}><Dashboard session={session} membership={member.membership} /></NextIntlClientProvider>;
}
