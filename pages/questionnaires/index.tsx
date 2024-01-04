/* eslint-disable react-hooks/rules-of-hooks */
export interface QuestionnaireGetServerSideProps {}
import axios from 'axios';
import React, { use, useContext } from 'react';
import UserContext from '../../context/user.context';

const Questionnaires = () => {
  const userContext = useContext(UserContext);
  console.log('🥲', userContext.user);
  return <div>{/* Your code here */}</div>;
};

export default Questionnaires;
// export async function getServerSideProps(context: any) {
//   const userContext = useContext(UserContext);
//   console.log('🥲', userContext.user);
//   try {
//     userContext.user &&
//       axios
//         .get(`http://localhost:3001/api/user`, {
//           data: {
//             userId: userContext.user.id,
//             withCredentials: true,
//           },
//         })
//         .then((res) => {
//           console.log('res', res.data);
//           //   return {
//           //     props: {
//           //       user: res.data || null,
//           //     },
//           //   };
//         });
//   } catch (error) {
//     console.error('API request failed', error);
//     return { props: { user: null } };
//   }
// }
