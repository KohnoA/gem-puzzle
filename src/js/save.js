import { minutes, seconds } from './timer'
import { moves } from './move-items'
import { matrix, frameSize, itemsArr } from './shuffle'
 
const saveButton = document.querySelector('.save')

function setLocalStorage() {
    localStorage.setItem('moves', moves)

    localStorage.setItem('timeMinutes', minutes)
    localStorage.setItem('timeSeconds', seconds)

    localStorage.setItem('puzzle', JSON.stringify(matrix))

    localStorage.setItem('frame-size', frameSize.innerHTML)
}

saveButton.addEventListener('click', setLocalStorage)