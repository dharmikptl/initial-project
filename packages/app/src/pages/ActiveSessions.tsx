import { FC } from 'react'
import {
  ActiveSessionsDocument,
  ActiveSessionsQuery,
  useActiveSessionsQuery,
  useRemoveSessionMutation
} from '../generated/graphql'

export const ActiveSessions: FC = () => {
  const { loading, error, data } = useActiveSessionsQuery({
    fetchPolicy: 'network-only'
  })
  const [removeSession] = useRemoveSessionMutation()
  const deleteSession = async (sessionId: string) => {
    await removeSession({
      variables: { sessionId },
      update: store => {
        const prevActiveSessions = store.readQuery<ActiveSessionsQuery>({
          query: ActiveSessionsDocument
        })
        store.writeQuery<ActiveSessionsQuery>({
          query: ActiveSessionsDocument,
          data: {
            activeSessions:
              prevActiveSessions && prevActiveSessions.activeSessions
                ? prevActiveSessions.activeSessions.filter(
                    s => s.id !== sessionId
                  )
                : []
          }
        })
      }
    })
  }
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error...</div>
  if (!data?.activeSessions || !data.activeSessions.length)
    return <div>No Data...</div>
  else
    return (
      <div>
        {data.activeSessions.map(session => (
          <div key={session.id}>
            <div>{session.id}</div>
            <button onClick={deleteSession.bind(this, session.id)}>
              remove
            </button>
          </div>
        ))}
      </div>
    )
}
