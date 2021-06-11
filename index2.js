const STATUS_DISPLAY = document.querySelector('.game-notification'),
GAME_STATE = ["","","","","","","","","",],
WINNINGS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
],
WIN_MENSSAGE = () => `The winning is ${currentPlayer}`,
DRAW_MESSAGE = () => `Its a Draw`,
CURRENT_PLAYER_TURN = () => `Turn to ${currentPlayer}`

let gameActive = true, currentPlayer = 'O'

function main(){
  statusDisplay(CURRENT_PLAYER_TURN())
  listeners()
}
function listeners(){
  document.querySelector('.game-container').addEventListener('click', cellClick)
  document.querySelector('.game-restart').addEventListener('click', restartGame)
}
function statusDisplay(message){
  STATUS_DISPLAY.innerHTML = message
}

function restartGame(){
  gameActive = true
  currentPlayer = 'O'
  restartGameState()
  statusDisplay(CURRENT_PLAYER_TURN())
  document.querySelectorAll('.game-cell').forEach(cell=> cell.innerHTML= ' ')
}

function cellClick(ev){
  let cell = ev.target
  if(cell.classList.contains('game-cell')){
    const cellIndex = Array.from(cell.parentNode.children).indexOf(cell)
    if(GAME_STATE[cellIndex]!==''||!gameActive){
      return false
    }
    cellPlayer(cell, cellIndex)
    resultValidation()
  }
}

function cellPlayer(cell, cellIndex){
  GAME_STATE[cellIndex]= currentPlayer
  cell.innerHTML = currentPlayer
}



function resultValidation(){
  let won = false
  for(let i=0;i<WINNINGS.length;i++){
    const winCondition = WINNINGS[i]
    let p1 = GAME_STATE[winCondition[0]]
    let p2 = GAME_STATE[winCondition[1]]
    let p3 = GAME_STATE[winCondition[2]]

    if(p1===''||p2===''||p3===''){
      continue
    }

    if(p1===p2&&p2===p3){
      won = true
      break
    }
  }
  if(won){
    statusDisplay(WIN_MENSSAGE())
    gameActive=false
    return
  }
  let draw = !GAME_STATE.includes('')
  if(draw){
    statusDisplay(DRAW_MESSAGE())
    gameActive=false
    return
  }
  changePlayer()
}

function changePlayer(){
  currentPlayer = currentPlayer === 'X'?'O':'X'
  statusDisplay(CURRENT_PLAYER_TURN())
}

function restartGameState(){
  let i = GAME_STATE.length
  while(i--){
    GAME_STATE[i]=''
  }
}
main()
