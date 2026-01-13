import { useLoginMutation } from '@/features/auth/api/authApi.ts'
import { Path } from '@/common/routing'

export const Login = () =>{
  debugger
const [login] = useLoginMutation()
  const LoginHandler = () => {
    debugger
    const redirectUri = import.meta.env.VITE_DOMAIN_ADDRESS + Path.OAuthRedirect

    const url = `${import.meta.env.VITE_BASE_URL}/auth/oauth-redirect?callbackUrl=${redirectUri}`

    window.open(url, 'oauthPopup','width=600,height=600')
    
    const receiveMessage  = (event:MessageEvent) => {
      if (event.origin !== import.meta.env.VITE_DOMAIN_ADDRESS) return
      const  {code} =event.data
      if (!code) return

      login({
        code: '',
        redirectUri,
        rememberMe: false,
      })
    }

    
    window.addEventListener('message',receiveMessage )

  }

    return (
  <button type={'button'}
          onClick={LoginHandler}>
    Login</button>
    )
}