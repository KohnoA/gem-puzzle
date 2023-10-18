import { moves } from './move-items'

export const timer = document.querySelector('.time')
const shuffleButton = document.querySelector('.shuffle')
const gameModels = document.querySelector('.other-game-models')

let timeoutTimer
export let minutes = 0
export let seconds = 0

if(localStorage.getItem('timeMinutes') && localStorage.getItem('timeSeconds')) {
    minutes = localStorage.getItem('timeMinutes')
    seconds = localStorage.getItem('timeSeconds')

    showTime()
}

function showTime() {
    seconds++

    if(seconds === 60) {
        seconds = 0
        minutes++
    }

    if(minutes === 60) {
        seconds = 0
        minutes = 0
    }

    timer.textContent = String(minutes).padStart(2, 0) + ':' + String(seconds).padStart(2, 0)
    timeoutTimer = setTimeout(showTime, 1000)
}

export function clearTimer() {
    seconds = 0
    minutes = 0
    timer.textContent = '00:00'
    clearTimeout(timeoutTimer)
}

export function startTimer() {
    if(moves === 1) {
        setTimeout(showTime, 800)
    }
}

shuffleButton.addEventListener('click', clearTimer)

gameModels.addEventListener('click', (event) => {
    let target = event.target.closest('a')

    if(!target) {
        return 
    }

    clearTimer()
})