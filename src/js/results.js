import { removeChilds } from './shuffle'

const resultsButton = document.querySelector('.results')
const overlay = document.createElement('div')
document.body.append(overlay)
overlay.classList.add('overlay')

const resultsContainer = document.createElement('div')
const resultsTitle = document.createElement('h3')
const resultsList = document.createElement('ul')
const overlayClose = document.querySelector('.overlay')

export function saveBestResults(bestResult) {
    if(localStorage.getItem('BestResults')) {
        let arrBestResults = JSON.parse(localStorage.getItem('BestResults'))
        arrBestResults.push(bestResult)

        if(arrBestResults.length > 10) {
            arrBestResults.shift()
        }
        
        localStorage.setItem('BestResults', JSON.stringify(arrBestResults))

    } else {
        localStorage.setItem('BestResults', JSON.stringify([bestResult]))
    }
}

function showResults() {
    overlay.classList.add('overlay-show')
    document.body.append(resultsContainer)
    resultsContainer.classList.add('results-container')
    resultsContainer.append(resultsTitle)
    resultsTitle.textContent = 'Best results'
    resultsTitle.classList.add('results-title')
    resultsContainer.append(resultsList)
    resultsList.classList.add('result-list')

    if(localStorage.getItem('BestResults')) {
        let bestResultList = JSON.parse(localStorage.getItem('BestResults'))

        for(let i = 0; i < bestResultList.length; i++) {
            const li = document.createElement('li')
            resultsList.append(li)
            li.classList.add('result-item')
            li.textContent = bestResultList[i]
        }
    }
}

function closePopup() {
    removeChilds(resultsList)
    resultsContainer.remove() 
    overlay.classList.remove('overlay-show')       
}

resultsButton.addEventListener('click', showResults)
overlayClose.addEventListener('click', closePopup)
resultsContainer.addEventListener('click', closePopup)