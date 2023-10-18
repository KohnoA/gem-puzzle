import { fillGridContainer } from './create-game'
import { clearTimer } from './timer'
import { findCoordinatesFromMatrix, isValidMove, move } from './move-items'

const shuffleButton = document.querySelector('.shuffle')
const gameModels = document.querySelector('.other-game-models')
export const frameSize = document.querySelector('.current-game-model')
const gridContainerNode = document.querySelector('.grid')
const defaultSize = document.querySelector('.four')
const gameModelsChildren = document.querySelectorAll('.other-game-models a')
const sizeAmountItems = {
    '3x3': 9,
    '4x4': 16,
    '5x5': 25,
    '6x6': 36,
    '7x7': 49,
    '8x8': 64
}

export let itemsArr = Array.from(document.querySelectorAll('.grid-button'))
export let matrix = getMatrix(itemsArr.map(item => +item.innerHTML))
export let lastIntGame = itemsArr[itemsArr.length - 1]
let selectedSize = defaultSize
let currentAmountItems = sizeAmountItems[selectedSize.innerHTML]
let blockItem = {y: 200, x: 200}

if(localStorage.getItem('puzzle') && localStorage.getItem('frame-size')) {
    matrix = JSON.parse(localStorage.getItem('puzzle'))
    frameSize.textContent = localStorage.getItem('frame-size')
    
    let sizeGame = matrix.flat().length

    removeChilds(gridContainerNode)
    fillGridContainer(sizeGame)

    itemsArr = Array.from(document.querySelectorAll('.grid-button'))
    lastIntGame = itemsArr[itemsArr.length - 1]

    gameModelsChildren.forEach(item => {
        item.classList.remove('current-size')
        if(item.innerHTML === frameSize.innerHTML) {
            chooseSize(item)
        }
    })
}

lastIntGame.style.display = "none"

export function getMatrix(arr, sizeGame = 4) {
    const matrix = []
    let matrixRow = []

    for(let i = 0; i < arr.length; i++) {
        matrixRow.push(arr[i])

        if(matrixRow.length === sizeGame) {
            matrix.push(matrixRow)
            matrixRow = [] 
        }
    }

    return matrix
}

export function setPositionItems(matrix) {
    const widthItem = 100

    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            let itemValue = matrix[i][j]
            let itemNode = itemsArr[itemValue - 1]

            itemNode.style.transform = `translate3D(${j * widthItem}%, ${i * widthItem}%, 0)`
        }
    }
}

export function isWon(matrix) {
    let winArrMatrix = new Array(+lastIntGame.innerHTML).fill(0).map((item, index) => index + 1)
    let flatMatrix = matrix.flat()

    for(let i = 0; i < flatMatrix.length; i++) {
        if(flatMatrix[i] !== winArrMatrix[i]) {
            return false
        }
    }
    
    return true
}

function findValidMoves(emptySquare, matrix, blockItem) {
    const validMoves = []

    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix[y].length; x++) {
            if(isValidMove({y, x}, emptySquare) && (blockItem.y !== y || blockItem.x !== x)) {
                validMoves.push({y, x})
            }
        }
    }

    return validMoves
}

function sortPuzzleCorrect(matrix) {
    const emptySquare = findCoordinatesFromMatrix(+lastIntGame.innerHTML, matrix)
    const validMoves = findValidMoves(emptySquare, matrix, blockItem)
    const randomMove = validMoves.sort(() => Math.random() - 0.5)[0]

    move(randomMove, emptySquare, matrix)
    blockItem = emptySquare

    setPositionItems(matrix)
}

function callSortPuzzle(matrix) {
    let shuffleIteration
    let i = 0

    if(currentAmountItems > 25) {
        shuffleIteration = 180
    } else {
        shuffleIteration = 60
    }

    while(i < shuffleIteration) {
        sortPuzzleCorrect(matrix)
        i++
    }
}

function chooseSize(elem) {
    if(selectedSize) {
        selectedSize.classList.remove('current-size')
    }
    
    selectedSize = elem
    selectedSize.classList.add('current-size')
    frameSize.textContent = selectedSize.textContent
}

export function removeChilds(node) {
    while(node.firstChild) {
        node.removeChild(node.firstChild)
    }
}

export function shufflePuzzle() {
    callSortPuzzle(matrix)

    localStorage.removeItem('moves')
    localStorage.removeItem('puzzle')
    localStorage.removeItem('frame-size')
    localStorage.removeItem('timeMinutes')
    localStorage.removeItem('timeSeconds')
}

gameModels.addEventListener('click', (event) => {
    let target = event.target.closest('a')

    if(!target) {
        return 
    }

    chooseSize(target)
    currentAmountItems = sizeAmountItems[selectedSize.innerHTML]

    removeChilds(gridContainerNode)
    fillGridContainer(currentAmountItems)

    itemsArr = Array.from(document.querySelectorAll('.grid-button'))
    matrix = getMatrix(itemsArr.map(item => +item.innerHTML), +selectedSize.innerHTML[0])
    
    lastIntGame = itemsArr[itemsArr.length - 1]
    lastIntGame.style.display = 'none'

    callSortPuzzle(matrix)
    clearTimer()
})

shuffleButton.addEventListener('click', shufflePuzzle)

setPositionItems(matrix)

if(!localStorage.getItem('puzzle')) {
    callSortPuzzle(matrix)
}