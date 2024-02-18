import { useEffect, useState } from '@/libs/valueToUI'

const Home = () => {
  const [val, setVal] = useState(1)
  const [string, setString] = useState('asd')

  useEffect(() => {
    console.log(`val: ${val}, string: ${string}`)
  }, [val])

  useEffect(() => {
    console.log(string)
  }, [string])

  const handleClick = () => {
    setVal(val + 1)
  }

  const handleInput = (e: Event) => {
    setString((e.target as HTMLInputElement).value)
  }

  return (
    <div>
      <span>hello</span>
      <span>{val}</span>
      <button onclick={handleClick}>button</button>
      <input value={string} onchange={handleInput} />
    </div>
  )
}

export default Home
