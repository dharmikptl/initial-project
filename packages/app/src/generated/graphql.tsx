import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type AuthenticatedResponse = {
  __typename?: 'AuthenticatedResponse'
  userId: Scalars['ID']
  role: Scalars['String']
  email: Scalars['String']
  firstName: Scalars['String']
  lastName: Scalars['String']
  profileImage?: Maybe<Scalars['String']>
  accessToken: Scalars['String']
  issuedAt: Scalars['Float']
  expiresAt: Scalars['Float']
}

export type Mutation = {
  __typename?: 'Mutation'
  signUp: User
  signIn?: Maybe<AuthenticatedResponse>
  signOut: Scalars['String']
  updateMe?: Maybe<User>
  updatePassword?: Maybe<Scalars['String']>
  removeSession?: Maybe<Scalars['String']>
  googleSignIn?: Maybe<AuthenticatedResponse>
}

export type MutationSignUpArgs = {
  data: SignUpInput
}

export type MutationSignInArgs = {
  data: SignInInput
}

export type MutationUpdateMeArgs = {
  data: UpdateMeInput
}

export type MutationUpdatePasswordArgs = {
  data: UpdatePasswordInput
}

export type MutationRemoveSessionArgs = {
  sessionId: Scalars['String']
}

export type MutationGoogleSignInArgs = {
  idToken: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  hello: Scalars['String']
  me?: Maybe<User>
  refreshToken?: Maybe<AuthenticatedResponse>
  activeSessions?: Maybe<Array<RefreshToken>>
}

export type RefreshToken = {
  __typename?: 'RefreshToken'
  id: Scalars['ID']
  userId: Scalars['String']
  userAgent: Scalars['String']
  isActive: Scalars['Boolean']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type SignInInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type SignUpInput = {
  password: Scalars['String']
  role: Scalars['String']
  firstName: Scalars['String']
  lastName: Scalars['String']
  gender: Scalars['String']
  email: Scalars['String']
}

export type UpdateMeInput = {
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  gender?: Maybe<Scalars['String']>
  profileImage?: Maybe<Scalars['String']>
}

export type UpdatePasswordInput = {
  currentPassword: Scalars['String']
  newPassword: Scalars['String']
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  email: Scalars['String']
  role: Scalars['String']
  isActive: Scalars['Boolean']
  firstName: Scalars['String']
  lastName: Scalars['String']
  name: Scalars['String']
  gender: Scalars['String']
  profileImage?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type ActiveSessionsQueryVariables = Exact<{ [key: string]: never }>

export type ActiveSessionsQuery = { __typename?: 'Query' } & {
  activeSessions?: Maybe<
    Array<
      { __typename?: 'RefreshToken' } & Pick<
        RefreshToken,
        'id' | 'userAgent' | 'createdAt' | 'updatedAt'
      >
    >
  >
}

export type GoogleSignInMutationVariables = Exact<{
  idToken: Scalars['String']
}>

export type GoogleSignInMutation = { __typename?: 'Mutation' } & {
  googleSignIn?: Maybe<
    { __typename?: 'AuthenticatedResponse' } & Pick<
      AuthenticatedResponse,
      | 'userId'
      | 'role'
      | 'email'
      | 'firstName'
      | 'lastName'
      | 'profileImage'
      | 'accessToken'
      | 'issuedAt'
      | 'expiresAt'
    >
  >
}

export type HelloQueryVariables = Exact<{ [key: string]: never }>

export type HelloQuery = { __typename?: 'Query' } & Pick<Query, 'hello'>

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'User' } & Pick<
      User,
      | 'id'
      | 'email'
      | 'role'
      | 'isActive'
      | 'firstName'
      | 'lastName'
      | 'name'
      | 'gender'
      | 'profileImage'
      | 'createdAt'
      | 'updatedAt'
    >
  >
}

export type RemoveSessionMutationVariables = Exact<{
  sessionId: Scalars['String']
}>

export type RemoveSessionMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'removeSession'
>

export type SignInMutationVariables = Exact<{
  email: Scalars['String']
  password: Scalars['String']
}>

export type SignInMutation = { __typename?: 'Mutation' } & {
  signIn?: Maybe<
    { __typename?: 'AuthenticatedResponse' } & Pick<
      AuthenticatedResponse,
      | 'userId'
      | 'role'
      | 'email'
      | 'firstName'
      | 'lastName'
      | 'profileImage'
      | 'accessToken'
      | 'issuedAt'
      | 'expiresAt'
    >
  >
}

export type SignOutMutationVariables = Exact<{ [key: string]: never }>

export type SignOutMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'signOut'
>

export const ActiveSessionsDocument = gql`
  query ActiveSessions {
    activeSessions {
      id
      userAgent
      createdAt
      updatedAt
    }
  }
`

/**
 * __useActiveSessionsQuery__
 *
 * To run a query within a React component, call `useActiveSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useActiveSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActiveSessionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useActiveSessionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ActiveSessionsQuery,
    ActiveSessionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ActiveSessionsQuery, ActiveSessionsQueryVariables>(
    ActiveSessionsDocument,
    options
  )
}
export function useActiveSessionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ActiveSessionsQuery,
    ActiveSessionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ActiveSessionsQuery, ActiveSessionsQueryVariables>(
    ActiveSessionsDocument,
    options
  )
}
export type ActiveSessionsQueryHookResult = ReturnType<
  typeof useActiveSessionsQuery
>
export type ActiveSessionsLazyQueryHookResult = ReturnType<
  typeof useActiveSessionsLazyQuery
>
export type ActiveSessionsQueryResult = Apollo.QueryResult<
  ActiveSessionsQuery,
  ActiveSessionsQueryVariables
>
export const GoogleSignInDocument = gql`
  mutation GoogleSignIn($idToken: String!) {
    googleSignIn(idToken: $idToken) {
      userId
      role
      email
      firstName
      lastName
      profileImage
      accessToken
      issuedAt
      expiresAt
    }
  }
`
export type GoogleSignInMutationFn = Apollo.MutationFunction<
  GoogleSignInMutation,
  GoogleSignInMutationVariables
>

/**
 * __useGoogleSignInMutation__
 *
 * To run a mutation, you first call `useGoogleSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleSignInMutation, { data, loading, error }] = useGoogleSignInMutation({
 *   variables: {
 *      idToken: // value for 'idToken'
 *   },
 * });
 */
export function useGoogleSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GoogleSignInMutation,
    GoogleSignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    GoogleSignInMutation,
    GoogleSignInMutationVariables
  >(GoogleSignInDocument, options)
}
export type GoogleSignInMutationHookResult = ReturnType<
  typeof useGoogleSignInMutation
>
export type GoogleSignInMutationResult =
  Apollo.MutationResult<GoogleSignInMutation>
export type GoogleSignInMutationOptions = Apollo.BaseMutationOptions<
  GoogleSignInMutation,
  GoogleSignInMutationVariables
>
export const HelloDocument = gql`
  query Hello {
    hello
  }
`

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(
  baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<HelloQuery, HelloQueryVariables>(
    HelloDocument,
    options
  )
}
export function useHelloLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(
    HelloDocument,
    options
  )
}
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>
export type HelloQueryResult = Apollo.QueryResult<
  HelloQuery,
  HelloQueryVariables
>
export const MeDocument = gql`
  query Me {
    me {
      id
      email
      role
      isActive
      firstName
      lastName
      name
      gender
      profileImage
      createdAt
      updatedAt
    }
  }
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const RemoveSessionDocument = gql`
  mutation RemoveSession($sessionId: String!) {
    removeSession(sessionId: $sessionId)
  }
`
export type RemoveSessionMutationFn = Apollo.MutationFunction<
  RemoveSessionMutation,
  RemoveSessionMutationVariables
>

/**
 * __useRemoveSessionMutation__
 *
 * To run a mutation, you first call `useRemoveSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSessionMutation, { data, loading, error }] = useRemoveSessionMutation({
 *   variables: {
 *      sessionId: // value for 'sessionId'
 *   },
 * });
 */
export function useRemoveSessionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveSessionMutation,
    RemoveSessionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RemoveSessionMutation,
    RemoveSessionMutationVariables
  >(RemoveSessionDocument, options)
}
export type RemoveSessionMutationHookResult = ReturnType<
  typeof useRemoveSessionMutation
>
export type RemoveSessionMutationResult =
  Apollo.MutationResult<RemoveSessionMutation>
export type RemoveSessionMutationOptions = Apollo.BaseMutationOptions<
  RemoveSessionMutation,
  RemoveSessionMutationVariables
>
export const SignInDocument = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(data: { email: $email, password: $password }) {
      userId
      role
      email
      firstName
      lastName
      profileImage
      accessToken
      issuedAt
      expiresAt
    }
  }
`
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options
  )
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>
export const SignOutDocument = gql`
  mutation SignOut {
    signOut
  }
`
export type SignOutMutationFn = Apollo.MutationFunction<
  SignOutMutation,
  SignOutMutationVariables
>

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignOutMutation,
    SignOutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(
    SignOutDocument,
    options
  )
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>
export type SignOutMutationOptions = Apollo.BaseMutationOptions<
  SignOutMutation,
  SignOutMutationVariables
>
