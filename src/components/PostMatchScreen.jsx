import { FaRedoAlt } from 'react-icons/fa'

export default function PostMatchScreen({ winner }) {
  const handleReset = () => {
    localStorage.removeItem('currentPiece')
    localStorage.setItem('scoreP1', 0)
    localStorage.setItem('scoreP2', 0)
    localStorage.setItem('turn', 'darkGray')

    window.location.reload()
  }

  return (
    <div className='absolute flex justify-center items-center top-0 left-0 h-screen w-screen bg-black text-center text-white text-7xl font-amatic tracking-wide font-bold z-40 animate-fade-in-slow'>
      <div
        className={
          'absolute w-screen h-[50vh] -z-10 bg-gradient-to-t top-0 ' +
          (winner === 'p1'
            ? 'from-blue-600 via-blue-600/40'
            : 'from-red-600 via-red-600/40')
        }
      ></div>
      <div
        className={
          'absolute w-screen h-[50vh] -z-10 bg-gradient-to-b bottom-0 ' +
          (winner === 'p2'
            ? 'from-blue-600 via-blue-600/40'
            : 'from-red-600 via-red-600/40')
        }
      ></div>

      <div>
        <div className={'rotate-180'}>
          {winner === 'p1' ? 'VICTORY' : 'DEFEAT'}
        </div>
        <div className='border-b border-t mt-12 mb-12 border-white w-screen'></div>
        <div className='z-50'>{winner === 'p2' ? 'VICTORY' : 'DEFEAT'}</div>

        <div className='absolute flex justify-center items-center left-0 right-0 top-[calc(50vh-35px)]'>
          <button
            onClick={handleReset}
            className='bg-black p-4 rounded-2xl border-white border-2'
          >
            <FaRedoAlt size={34} color={'#ffffff'} className='animate-spin' />
          </button>
        </div>
      </div>

      <audio id='end-audio' src='/game-end.mp3' className='absolute'></audio>
    </div>
  )
}
