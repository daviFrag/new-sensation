import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { NextResponse } from 'next/server';
 
export type User = UserProfile & {
  permissions: string[];
  roles: string[]
}

export type ResponseData = {
  user: User;
  access_token: string
} | null
 
export const GET = withApiAuthRequired(async () => {
  const session = await getSession();

  if (!session || !session.accessToken) {
    return NextResponse.json(null,{ status: 400 });
  }
  const auth0User = session.user;

  const responseData : ResponseData = {
    user: {
      ...auth0User,
      permissions: (auth0User?.["https://smarter.com/permissions"] ?? []) as string[],
      roles: (auth0User?.["https://smarter.com/roles"] ?? []) as string[]
    },
    access_token: session.accessToken
  }

  return NextResponse.json(responseData);
})