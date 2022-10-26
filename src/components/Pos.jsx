import { useEffect } from 'react'
import Piece from './Piece'

export default function Pos({ id, updateHighlight, executeTurn }) {
  const style = `w-40 h-40 flex justify-center items-center ${
    id > 6 && id < 13 && 'empty'
  }`

  useEffect(() => {
    const box = document.getElementById(id)

    if (box.hasChildNodes()) {
      box.classList.remove('empty')
    } else {
      box.classList.add('empty')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      id={id}
      onClick={e => {
        if (e.target.classList.contains('highlight')) {
          if (localStorage.getItem('turn') === 'lightGray') {
            localStorage.setItem('turn', 'darkGray')
          } else {
            localStorage.setItem('turn', 'lightGray')
          }
        }
        executeTurn(e)
      }}
      className={style}
    >
      {id <= 6 && (
        <Piece
          updateHighlight={updateHighlight}
          id={id}
          color='bg-darkGray'
          shadow={'shadow-blackPiece'}
        />
      )}
      {id >= 13 && (
        <Piece
          updateHighlight={updateHighlight}
          id={id}
          color='bg-lightGray'
          shadow={'shadow-whitePiece'}
        />
      )}
    </div>
  )
}
