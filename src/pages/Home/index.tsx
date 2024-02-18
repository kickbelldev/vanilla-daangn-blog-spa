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
      <div>
        <div>asd</div>
      </div>
      <span>{val}</span>
      <button onclick={handleClick}>button</button>
      <input value={string} onchange={handleInput} />
      <ol>
        {[1, 2, 3, 4, 5].map((v) => (
          <li>{v}</li>
        ))}
      </ol>
    </div>
  )
}

export default Home
