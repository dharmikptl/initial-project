import { AuthChecker } from 'type-graphql'

export const authChecker: AuthChecker<any> = ({ context }, roles) => {
  const user = context.req.user
  if (!user) return false
  if (!roles.length) return true
  if (roles.includes(user.role)) return true
  return false
}
