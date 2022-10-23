import { useEffect, useState } from 'react'

export default function Piece({ color, shadow, id, updateHighlight }) {
  const [moved, setMoved] = useState(null)

  useEffect(() => {
    if (+id === 1 || +id === 6 || +id === 13 || +id === 18) {
      setMoved('')
    } else {
      setMoved('moved')
    }
  }, [])

  return (
    <div
      onClick={updateHighlight}
      id={`piece-${id}`}
      className={
        'w-24 h-24 transition-all ease-in duration-1000 rounded-full ' +
        color +
        ' ' +
        shadow +
        ' ' +
        moved
      }
    ></div>
  )
}
