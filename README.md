# jseverywhere-mobile
This is a refactored version of NoteApp by Expo for javascriptEverywhere, beacuse the original code is outdated. It can be used to learn ReactNative for begginners.
For user auth and state managment, I used 3 ways, by Stack, useRedux, useReduxToolKit.
-- useStack AuthLoading as a default page, then navigate to Auth or App by SecureStore.getItemAsync('token')

-- useRedux use Simple Redux, state management in App.js authContext = useMemo(..) to define logIn,logOut and Register, Then in SignInScreen or SignUpScreen, invoke corresponding functions to naviagte, Context is also used.

-- useReduxToolKit use ReduxToolKit for state management and dispatch, and extract code of netWork(ApolloClient), I prefer this solution due to clean code.

About layout:
1. NoteFeed for notelists(be used by MyNoteScreen, FavoriteScreen)
2. Note for note node (be used by NoteFeed)

About conect server:
use ApolloClient, which is divided in 2 steps

1. initialize and configure client
const API_URI='https://jseverywhere.herokuapp.com/api';
// Initialize Apollo Client
const uri = API_URI;
const cache = new InMemoryCache();
const httplink = createHttpLink({uri});

const authLink = setContext(async (_, {headers}) => {

    return {
      headers:{
        ...headers,
        authorization: (await SecureStore.getItemAsync('userToken')) || ''   //can't use selector, because the limit of hooks
      }
    };
});

// configure Apollo Client
export const client = new ApolloClient({
    link: authLink.concat(httplink),
    cache
});

2. wrap it in App.js
      <ApolloProvider client={client} >
      </ApolloProvider>

3. when fetch data, useQuery or useMutation, which is used in MyNoteScreen, for example.
  const [signIn, {loading, error}] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            storeToken(data.signIn);
            dispatch(setSignIn({
                isLoggedIn: true,
                userToken: data.signIn
            }));
        }
    })
 
 That's all, any question contact me at jeremyqinsa@gmail.com.



