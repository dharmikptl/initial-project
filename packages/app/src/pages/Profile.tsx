import { FC } from 'react'
import { useMeQuery } from '../generated/graphql'

export const Profile: FC = () => {
  const { data, loading, error } = useMeQuery()

  if (loading) return <div>Loading...</div>
  if (error || !data) {
    console.error(error)
    return <div>Error</div>
  }
  return <div>{JSON.stringify(data.me)}</div>
}
