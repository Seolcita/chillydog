'client-side';
import { ReactElement, useContext } from 'react';
import UserContext from '../../context/user.context';
import axios from 'axios';

export const SigninSuccess = (props: any): ReactElement => {
  const userCtx = useContext(UserContext);
  console.log('props🫠', props);
  if (props.user) {
    userCtx.setUser(props.user);
  }
  const user = userCtx.user;
  console.log(user);
  return <div>SigninSuccess: {user && user.email}</div>;
};

export async function getServerSideProps(context: any) {
  const { token } = context.query;
  console.log('token', token);

  try {
    return axios
      .get(`http://localhost:3001/api/auth/verifyToken`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('res', res.data);

        return {
          props: {
            user: res.data || null,
          },
        };
      });
    // const user = {
    //   id: 'user-id',
    //   email: 'user@example.com',
    // };

    // return { props: { user: response.data.user || null } };
  } catch (error) {
    console.error('API request failed', error);
    return { props: { user: null } };
  }
}

export default SigninSuccess;
