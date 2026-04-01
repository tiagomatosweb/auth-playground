import hello from 'hellojs/dist/hello.all.js'

export function initHello() {
  hello.init(
    {
      google: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    },
    {
      redirect_uri: 'http://localhost:3000/auth/callback',
      scope: 'email',
    },
  )
}

export { hello }
