import { useEffect } from '@/libs/valueToUI'

const Home = () => {
  useEffect(() => {
    fetch('/api/user/1')
      .then((res) => res.json())
      .then(console.log)
  }, [])

  const handleClick = async () => {
    const res = await fetch('/api/user/2')

    console.log(await res.json())
  }

  return (
    <div>
      <button onclick={handleClick}>눌러봐</button>
    </div>
  )
}

export default Home
