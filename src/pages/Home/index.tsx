import { useAPI } from '@/hooks/useAPI'

const Home = () => {
  const { data, isLoading, isError } = useAPI<{
    id: string
    firstName: string
    age: number
  }>('get', '/user/1')

  if (isLoading) {
    return <div>loading...</div>
  }

  if (isError) {
    return <div>error</div>
  }

  const handleClick = async () => {
    const res = await fetch('/api/user/2')

    console.log(await res.json())
  }

  return (
    <div>
      {data}
      <button onclick={handleClick}>눌러봐</button>
      asd
    </div>
  )
}

export default Home
