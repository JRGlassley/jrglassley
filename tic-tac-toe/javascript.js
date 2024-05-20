// globals
let humanScore = 0;
let computerScore = 0;

window.onload = (event) => {
   // set up interactions
   const cards = document.querySelectorAll(".card");
   Array.from(cards).filter(
      (card) => card.className.split(' ')[1].includes('human')
   ).forEach(c => c.addEventListener('click', () => playRound(c)));
};

// functions
function getComputerChoice() {
   return ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
}

async function playRound(humanDiv) {
   const computerChoice = getComputerChoice();
   const humanChoice = humanDiv.className.split(' ')[1].split('-')[1];

   // decide winner
   let humanWin = undefined;
   if (computerChoice === humanChoice) {
      // tie - noop
   } else if ((computerChoice === 'rock' && humanChoice === 'scissors') ||
      (computerChoice === 'scissors' && humanChoice === 'paper') ||
      (computerChoice === 'paper' && humanChoice === 'rock')) {
      humanWin = false;
   } else {
      humanWin = true;
   }

   // update score
   const computerDiv = document.querySelector(".computer-" + computerChoice);
   const humanScoreDiv = document.querySelector(".score-human-number");
   const computerScoreDiv = document.querySelector(".score-computer-number");
   if (humanWin) {
      humanDiv.style['background-color'] = 'palegreen';
      humanScoreDiv.style['background-color'] = 'palegreen';
      computerDiv.style['background-color'] = 'lightcoral';
      computerScoreDiv.style['background-color'] = 'lightcoral';
      humanScore++;
      humanScoreDiv.textContent = humanScore.toString();
   } else if (humanWin !== undefined && !humanWin) {
      humanDiv.style['background-color'] = 'lightcoral';
      humanScoreDiv.style['background-color'] = 'lightcoral';
      computerDiv.style['background-color'] = 'palegreen';
      computerScoreDiv.style['background-color'] = 'palegreen';
      computerScore++;
      computerScoreDiv.textContent = computerScore.toString();
   } else {
      humanDiv.style['background-color'] = 'LightSkyBlue';
      humanScoreDiv.style['background-color'] = 'LightSkyBlue';
      computerDiv.style['background-color'] = 'LightSkyBlue';
      computerScoreDiv.style['background-color'] = 'LightSkyBlue';
   }

   // clear status
   setTimeout(() => {
      humanDiv.style['background-color'] = null;
      humanScoreDiv.style['background-color'] = null;
      computerDiv.style['background-color'] = null;
      computerScoreDiv.style.removeProperty('background-color');
   }, 500);

   // check for winner
   if (computerScore == 5) {
      alert("Computer wins the game!");
      humanScore = 0;
      computerScore = 0;
      humanScoreDiv.textContent = humanScore.toString();
      computerScoreDiv.textContent = computerScore.toString();
   } else if (humanScore == 5) {
      alert("Human wins the game!");
      humanScore = 0;
      computerScore = 0;
      humanScoreDiv.textContent = humanScore.toString();
      computerScoreDiv.textContent = computerScore.toString();
   }
}
