export function requireToken(to) {
  if (!to.query.token) return { name: '/login/' }
}
