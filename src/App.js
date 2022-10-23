import React from 'react'
import bg from './mess-bg.png'
import Pos from './components/Pos'
import { useState, useEffect } from 'react'

function App() {
  const [positions, setPositions] = useState(null)
  const [clickCounter, setClickCounter] = useState(0)
  const [scoreP1, setScoreP1] = useState(0)
  const [scoreP2, setScoreP2] = useState(0)
  const [winner, setWinner] = useState(null)

  useEffect(() => {
    setScoreP1(localStorage.getItem('scoreP1'))
    setScoreP2(localStorage.getItem('scoreP2'))
    if (scoreP1 >= 4) {
      setWinner('p1')
    } else if (scoreP2 >= 4) {
      setWinner('p2')
    }
  }, [clickCounter]) // eslint-disable-line react-hooks/exhaustive-deps

  const updateHighlight = e => {
    if (
      (e.target.classList.contains('bg-lightGray') &&
        localStorage.getItem('turn') === 'lightGray') ||
      (e.target.classList.contains('bg-darkGray') &&
        localStorage.getItem('turn') === 'darkGray')
    ) {
      removeHighlights()

      const pieceId = e.target.id
      localStorage.setItem('currentPiece', pieceId)
      const currentPos = +document.getElementById(pieceId).parentElement.id
      let list = []

      if (currentPos === 1 || currentPos === 7 || currentPos === 13) {
        list.push(currentPos + 1)
        list.push(currentPos - 5)
        list.push(currentPos + 6)
        list.push(currentPos - 6)
        list.push(currentPos + 7)
        list.push(currentPos - 7)
      } else if (currentPos === 6 || currentPos === 12 || currentPos === 18) {
        list.push(currentPos - 1)
        list.push(currentPos + 5)
        list.push(currentPos + 6)
        list.push(currentPos - 6)
        list.push(currentPos - 7)
      } else {
        list.push(currentPos + 1)
        list.push(currentPos - 1)
        list.push(currentPos + 5)
        list.push(currentPos - 5)
        list.push(currentPos + 6)
        list.push(currentPos - 6)
        list.push(currentPos + 7)
        list.push(currentPos - 7)
      }

      list = list.filter(pos => pos > 0 && pos < 19)

      list.forEach(pos => {
        const box = document.getElementById(pos)
        if (!box.hasChildNodes()) {
          box.classList.add('highlight')
        }
      })
    }
  }

  const removeHighlights = () => {
    for (let index = 0; index < 18; index++) {
      document.getElementById(index + 1).classList.remove('highlight')
    }
  }

  const executeTurn = e => {
    const box = e.target
    const currentPiece = localStorage.getItem('currentPiece')

    if (box.classList.contains('highlight')) {
      box.appendChild(document.getElementById(currentPiece))
      removeHighlights()

      if (!document.getElementById(currentPiece).classList.contains('moved')) {
        document.getElementById(currentPiece).classList.add('moved')
      }
    }

    const allPieces = document.querySelectorAll('div[id*="piece"]')

    let blockedPieces = []

    allPieces.forEach(piece => {
      const pieceId = piece.id
      const currentPos = +document.getElementById(pieceId).parentElement.id
      let list = []

      if (currentPos === 1 || currentPos === 7 || currentPos === 13) {
        list.push(currentPos + 1)
        list.push(currentPos - 5)
        list.push(currentPos + 6)
        list.push(currentPos - 6)
        list.push(currentPos + 7)
        list.push(currentPos - 7)
      } else if (currentPos === 6 || currentPos === 12 || currentPos === 18) {
        list.push(currentPos - 1)
        list.push(currentPos + 5)
        list.push(currentPos + 6)
        list.push(currentPos - 6)
        list.push(currentPos - 7)
      } else {
        list.push(currentPos + 1)
        list.push(currentPos - 1)
        list.push(currentPos + 5)
        list.push(currentPos - 5)
        list.push(currentPos + 6)
        list.push(currentPos - 6)
        list.push(currentPos + 7)
        list.push(currentPos - 7)
      }

      list = list.filter(pos => pos > 0 && pos < 19)

      let blocked = []

      list.forEach(pos => {
        const box = document.getElementById(pos)
        if (box.hasChildNodes()) {
          blocked.push(true)
        } else blocked.push(false)
      })

      if (!blocked.includes(false)) {
        blockedPieces.push(piece)
      }
    })

    if (blockedPieces.length > 0) {
      removePieces(
        blockedPieces.filter(piece => piece.classList.contains('moved')),
      )
    }
  }

  const removePieces = blockedPieces => {
    const pieceColor = document
      .getElementById(localStorage.getItem('currentPiece'))
      .classList.contains('lightGray')
      ? 'lightGray'
      : 'darkGray'

    if (blockedPieces.length === 2) {
      let opponentPiece = null

      blockedPieces.forEach(piece => {
        if (!piece.classList.contains(pieceColor)) {
          opponentPiece = piece
        }
      })

      if (opponentPiece !== null) {
        updateScore(opponentPiece)
        opponentPiece.parentElement.removeChild(opponentPiece)
      } else {
        updateScore(blockedPieces[0])
        blockedPieces[0].parentElement.removeChild(blockedPieces[0])
      }
    } else if (blockedPieces.length === 3) {
      let opponentPiece = null

      blockedPieces.forEach(piece => {
        if (!piece.classList.contains(pieceColor)) {
          opponentPiece = piece
        }
      })

      if (opponentPiece !== null) {
        updateScore(opponentPiece)
        opponentPiece.parentElement.removeChild(opponentPiece)
      } else {
        updateScore(blockedPieces[0])
        blockedPieces[0].parentElement.removeChild(blockedPieces[0])
      }

      updateScore(blockedPieces[0])
      blockedPieces[0].parentElement.removeChild(blockedPieces[0])
    } else {
      blockedPieces.forEach(piece => {
        updateScore(piece)
        piece.parentElement.removeChild(piece)
      })
    }
  }

  const updateScore = piece => {
    if (piece.classList.contains('bg-lightGray')) {
      localStorage.setItem('scoreP1', +localStorage.getItem('scoreP1') + 1)
    } else if (piece.classList.contains('bg-darkGray')) {
      localStorage.setItem('scoreP2', +localStorage.getItem('scoreP2') + 1)
    }

    if (+localStorage.getItem('scoreP1') >= 4) {
      setWinner('p1')
    } else if (+localStorage.getItem('scoreP2') >= 4) {
      setWinner('p2')
    }
  }

  useEffect(() => {
    const rows = []
    for (let i = 0; i < 18; i++) {
      rows.push(
        <Pos
          executeTurn={executeTurn}
          updateHighlight={updateHighlight}
          id={i + 1}
          key={i}
        />,
      )
    }

    setPositions(rows)

    localStorage.setItem('scoreP1', 0)
    localStorage.setItem('scoreP2', 0)
    localStorage.setItem('turn', 'darkGray')
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      onClick={e => {
        setClickCounter(clickCounter + 1)
      }}
      className='flex w-screen h-screen justify-center items-center'
    >
      {winner && (
        <div className='absolute top-0 left-0 h-screen w-screen bg-black text-center text-white text-4xl  font-bold z-10'>
          {winner === 'p1' ? (
            <div className='translate-y-[50vh]'>Player 1 Wins</div>
          ) : (
            winner === 'p2' && (
              <div className='translate-y-[50vh]'>Player 2 Wins</div>
            )
          )}
        </div>
      )}
      <img
        src={bg}
        alt=''
        width={806}
        className='absolute  -z-10 hidden edge:block'
      />
      <div
        id='bg'
        className='w-full h-full justify-between items-center flex-col hidden edge:flex'
      >
        <div className='rotate-180 grid grid-cols-3 gap-8 bg-zinc-900 px-16 py-4 rounded-t-2xl'>
          <div className='text-3xl font-semibold text-white'>PLAYER 1</div>
          <div className='border-r-4 mx-auto border-white'></div>
          <div className='text-3xl font-semibold text-white'>{scoreP1}</div>
        </div>

        <div className='grid grid-cols-6 justify-center items-center'>
          {positions}
        </div>
        <div className='grid grid-cols-3 gap-8 bg-zinc-900 px-16 py-4 rounded-t-2xl'>
          <div className='text-3xl font-semibold text-white'>PLAYER 2</div>
          <div className='border-r-4 mx-auto border-white'></div>
          <div className='text-3xl font-semibold text-white'>{scoreP2}</div>
        </div>
      </div>
    </div>
  )
}

export default App
