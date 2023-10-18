const divContainer = document.createElement('div')
const gridContainer = document.createElement('div')
const buttonsContainer = document.createElement('div')
const timeMovesContainer = document.createElement('div')
const gameModelContainder = document.createElement('div')

function fillButtonsContainer() {
    const buttons = `
    <button class="shuffle" type="button">Shuffle</button>
    <button class="audio" type="button">Audio</button>
    <button class="save" type="button">Save</button>
    <button class="results" type="button">Results</button>
    `

    buttonsContainer.innerHTML = buttons
}

function fillTimeMovesContainer() {
    const moves = `
    <p class="moves-wrapper">Moves: <span class="moves">0</span></p>
    `
    const time = `
    <p class="time-wrapper">Time: <span class="time">00:00</span></p>
    `

    timeMovesContainer.innerHTML = moves + time
}

export function fillGridContainer(gemeModel = 16) {
    let i = 1
    
    while(i <= gemeModel) {
        let button = document.createElement('button')
        gridContainer.append(button)
        button.classList.add('grid-button')
        button.setAttribute('draggable', 'true')

        if(gemeModel === 9) {
            button.classList.add('grid-button-three')
        }

        if(gemeModel === 16) {
            button.classList.add('grid-button-four')
        }

        if(gemeModel === 25) {
            button.classList.add('grid-button-five')
        }

        if(gemeModel === 36) {
            button.classList.add('grid-button-six')
        }

        if(gemeModel === 49) {
            button.classList.add('grid-button-seven')
        }

        if(gemeModel === 64) {
            button.classList.add('grid-button-eight')
        }

        button.innerHTML = i
        i++
    }
}

function fillGameModelContainder() {
    const currentModel = `
    <p class="game-model-wrapper">Frame size: <span class="current-game-model">4x4</span></p>
    `
    const otherModels = `
    <p class="other-game-models">
        Other size:
        <a class="three" href="#">3x3</a>
        <a class="four current-size" href="#">4x4</a>
        <a class="five" href="#">5x5</a>
        <a class="six" href="#">6x6</a>
        <a class="seven" href="#">7x7</a>
        <a class="eight" href="#">8x8</a>
    </p>
    `

    gameModelContainder.innerHTML = currentModel + otherModels
}

export function createGame() {
    document.body.append(divContainer)
    
    divContainer.prepend(gameModelContainder)
    divContainer.prepend(gridContainer)
    divContainer.prepend(timeMovesContainer)
    divContainer.prepend(buttonsContainer)
    
    divContainer.classList.add('container')
    gridContainer.classList.add('grid')
    gameModelContainder.classList.add('game-model-containder')
    timeMovesContainer.classList.add('time-moves-container')
    buttonsContainer.classList.add('button-container')

    fillButtonsContainer()
    fillTimeMovesContainer()
    fillGridContainer()
    fillGameModelContainder()
}

createGame()