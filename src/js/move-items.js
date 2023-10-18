import { matrix, setPositionItems,  lastIntGame, isWon, shufflePuzzle } from './shuffle'
import { minutes, seconds, clearTimer, startTimer } from './timer'
import { saveBestResults } from './results'
import audioSrc from '../assets/gem-puzzle-sound.mp3'

const movesNode = document.querySelector('.moves')
const shuffleButton = document.querySelector('.shuffle')
const gridContainerNode = document.querySelector('.grid')
const audioButton = document.querySelector('.audio')
const gameModels = document.querySelector('.other-game-models')
const audio = new Audio()

let isPlay = true
export let moves = 0
let bestResult

if(localStorage.getItem('moves')) {
    moves = localStorage.getItem('moves')
    movesNode.textContent = moves
}

audio.src = audioSrc
audio.volume = 0.5

export function findCoordinatesFromMatrix(int, matrix) {
    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x] === int) {
                return {x, y}
            }
        }
    }
}

export function isValidMove(coords1, coords2) {
    const diffX = Math.abs(coords1.x - coords2.x) 
    const diffY = Math.abs(coords1.y - coords2.y)

    return (diffX === 1 || diffY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y)
}

export function move(coords1, coords2, matrix) {
    const currentItem = matrix[coords1.y][coords1.x]

    matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x]
    matrix[coords2.y][coords2.x] = currentItem

    if(isWon(matrix)) {
        bestResult = `Time: ${String(minutes).padStart(2, 0)}:${String(seconds).padStart(2, 0)} / Moves: ${moves} - ${matrix.length}x${matrix.length}`
        
        setTimeout(() => {
            alert(`Hurray! You have solved the puzzle for ${String(minutes).padStart(2, 0)}:${String(seconds).padStart(2, 0)} and ${moves} moves!`)
            shufflePuzzle()
            clearTimer()
            
            moves = 0
            movesNode.textContent = moves
        }, 300)

        saveBestResults(bestResult)
    }
} 

function stopAudio() {
    this.classList.toggle('stop-audio')
    isPlay = !this.classList.contains('stop-audio')
}

function eventMove(target) {
    const lastItemInt = +lastIntGame.innerHTML
    const buttonInt = +target.innerHTML

    const targetCoordinates =  findCoordinatesFromMatrix(buttonInt, matrix)
    const lastItemCoordinates = findCoordinatesFromMatrix(lastItemInt, matrix)
    const canMoveItem = isValidMove(targetCoordinates, lastItemCoordinates)

    if(canMoveItem) {
        moves++
        movesNode.textContent = moves

        move(targetCoordinates, lastItemCoordinates, matrix)
        setPositionItems(matrix)
        startTimer()
        
        if(isPlay) {
            audio.play()
        }

    }
}

audioButton.addEventListener('click', stopAudio)

shuffleButton.addEventListener('click', () => {
    moves = 0
    movesNode.textContent = moves
})

gameModels.addEventListener('click', (event) => {
    let target = event.target.closest('a')

    if(!target) {
        return 
    }

    moves = 0
    movesNode.textContent = moves
})

gridContainerNode.addEventListener('click', (event) => {
    const target = event.target.closest('.grid-button')

    if(!target) {
        return
    }

    eventMove(target)
})

//Drag n Drop
let dragged = null

gridContainerNode.addEventListener('dragstart', (event) => {
    dragged = event.target.closest('.grid-button')
})

gridContainerNode.addEventListener('dragover', (event) => {
    if(event.target.className !== 'grid-button' && event.target.className === 'grid') {
        event.preventDefault()
        gridContainerNode.style.backgroundColor = 'rgb(173, 173, 173)'
    } else {
        gridContainerNode.style.backgroundColor = 'lightgray'
    }
})

gridContainerNode.addEventListener('drop', (event) => {
    if(event.target.className === 'grid') {
        eventMove(dragged)
    }
})

gridContainerNode.addEventListener('dragend', () => {
    gridContainerNode.style.backgroundColor = 'lightgray'
})