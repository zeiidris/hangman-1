const wordEL = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const figureParts = document.querySelectorAll('.figure-part')
const message = document.getElementById('message')
const computer = ['mouse', 'microphone', 'battery', 'calculator', 'controller', 'monitor','printer','laptop','keyboard','speakers', 'disc', 'tablet', 'phone','plug']
let playable = true
const correctLetters = []
let selectedWord = computer[Math.floor(Math.random()*computer.length)]
const wrongLetters = []
//show hidden word
function displayWord(){
    wordEL.innerHTML = `${selectedWord
        .split('')
        .map(letter =>`<div class='letter'>${correctLetters.includes(letter) ? letter: ''}</div>`
            ).join('')}`
            const innerWord = wordEL.innerText.replace(/\n/g,'')
            if(innerWord === selectedWord){
                finalMessage.innerText ="Congratulation, you win 😎"
                message.innerText = ''
                popup.style.display ="flex"
                playable = false
            }
}
// key down letter press
window.addEventListener('keydown',e=>{
    if(playable){
    if(e.keyCode >= 65 && e.keyCode<=90){
        const letter = e.key
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                displayWord()
            }
            else{
                showNotification()
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)
                updateWrongLettersEl(letter)
            }else{
                showNotification()
            }
        }
    }}
})
displayWord()
//show notification
function showNotification(){
    notification.classList.add('show')
    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000);
}
// update wrong letters
function updateWrongLettersEl(){
    wrongLettersEl.innerHTML =`
    ${wrongLetters.length> 0 ? '<p>Wrong</p>': ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `
    figureParts.forEach((part,idx) =>{
        const errors = wrongLetters.length
        if(idx < errors){
            part.style.display = "block"
        }else{
            part.style.display = "none"
        }if(errors == figureParts.length){
                finalMessage.innerText = "Unfortunately, you lost. 😕"
                message.innerText = `...the word was ${selectedWord}`
                popup.style.display = "flex"
                playable = false
            
        }
    })
}
// Restart the game
playAgainBtn.addEventListener('click',()=>{
    selectedWord = computer[Math.floor(Math.random()*computer.length)]
    correctLetters.splice(0)
    wrongLetters.splice(0)
    playable = true
    popup.style.display ="none"
   updateWrongLettersEl()
    displayWord()
})