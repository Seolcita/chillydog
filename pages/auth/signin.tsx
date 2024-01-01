/* eslint-disable react-hooks/rules-of-hooks */
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
// import { getProviders, signIn } from 'next-auth/react';
// import { getServerSession } from 'next-auth/next';
// import { authOption } from '../api/auth/[...nextauth]';
import Login from '../../components/Login/Login';
import UserContext from '../../context/user.context';
import { useContext } from 'react';

export default function SignIn() {
  return <Login />;
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   // const session = await getServerSession(context.req, context.res, authOption);

//   // if (session) {
//   //   return { redirect: { destination: '/' } };
//   // }

//   // const providers = await getProviders();
//   const userCtx = useContext(UserContext);
//   // const isLoggedIn = userCtx.user !== null;

//   if (userCtx.user !== null) {
//     return { redirect: { destination: '/' } };
//   }

//   return {
//     props: {},
//   };
// }
