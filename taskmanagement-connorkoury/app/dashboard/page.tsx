import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';
import { useRouter } from 'next/navigation';

const page = async () => {
  const session = await getServerSession(authOptions)
  
  return (
    <h1>Hello {session?.user.username}</h1>
  )
}

export default page;
