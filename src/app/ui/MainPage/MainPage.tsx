import { useGetMeQuery } from '@/features/auth/api/authApi.ts'

export const MainPage = () => {
  const {data} = useGetMeQuery()
  return (
    <div color={'red'}>
      <h1>Main page</h1>
      <div>Login: {data?.login}123</div>
    </div>
  )
}
