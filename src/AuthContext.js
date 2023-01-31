
import * as React from 'react';
import { createContext } from 'react';


export const AuthContext = React.createContext();

// export const authContext = useMemo(
//     ()=> ({
//       logIn: async (data) => {
//         dispatch({
//           type:'LOG_IN',
//           token: data.signIn
//         });
//       },
//       logOut: ()=> dispatch({type: 'LOG_OUT'}),
//       register: async (data) => {
//         dispatch({
//           type:'LOG_IN',
//           token: data.signUp
//         });
//       }
//     }),
//     []
// );