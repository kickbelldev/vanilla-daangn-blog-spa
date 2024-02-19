import { useAPI } from '@/hooks/useAPI'

const Home = () => {
  const { data, isLoading, isSuccess } = useAPI<{
    id: string
    firstName: string
    age: number
  }>('get', '/user/1')

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!isSuccess) {
    return <div>error</div>
  }

  const handleClick = async () => {
    const res = await fetch('/api/user/2')

    console.log(await res.json())
  }

  return (
    <div>
      {JSON.stringify(data)}
      <button onclick={handleClick}>눌러봐</button>
    </div>
  )
}

export default Home
