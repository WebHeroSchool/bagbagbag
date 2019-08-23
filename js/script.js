let numberOfCard;
let cards = [];
const button = document.getElementById('start-game');

function getDifficultyOfGame() {
  const diff = document.getElementsByName("diff");
  if (diff[0].checked) {
    return (numberOfCard = 3);
  } else if (diff[1].checked) {
    return (numberOfCard = 6);
  } else if (diff[2].checked) {
    return (numberOfCard = 10);
  } else {
   return (numberOfCard = 3);
  }
}

const createCardsAndshowCards = () => {
  getDifficultyOfGame();
  createMainInHtml();

  if (numberOfCard == 3) {
    createCards(3, 'card__looser card__easy');
    addFrontAndBackSidesToCard('.card__easy');
  } else if (numberOfCard == 6) {
    createCards(6, 'card__looser card__medium');
    addFrontAndBackSidesToCard('.card__medium');
    const mainById = document.getElementById('main');
    mainById.style.width = '800px';
  } else {
    createCards(10, 'card__looser card__hard');
    addFrontAndBackSidesToCard('.card__hard');
    const mainById = document.getElementById('main');
    mainById.style.width = '1210px';
  }
}


const startGameAndDecideWinnerAndLoosers = () => {
  const menu = document.getElementById('nav');
  const body = document.body;
  nav.style.display = 'none';
  body.style = 'height: 312px';
  createCardsAndshowCards();
  decideRandomOfWinner();
  
  let numberOfClickToCard = 0;
  const losers = document.querySelectorAll('.card__looser');
  losers.forEach((elem) => {
    elem.addEventListener('click', () => {
      while (true) {
        if (numberOfClickToCard % 2 == 0) {
          elem.style.transform = 'rotateY(180deg)';
          numberOfClickToCard += 1;
          break;
        } else if (numberOfClickToCard % 2 == 1) {
          location.reload(true);
          numberOfClickToCard += 1;
          break;
        }
      } 
    })
  })
      
  const win = document.getElementById('win');
  const clickOnWinnerCard = () => {
    while (true) {
      if (numberOfClickToCard % 2 == 0) {
        win.style.transform = 'rotateY(180deg)';
        numberOfClickToCard += 1;
        break;
       } else if (numberOfClickToCard % 2 == 1) {
         location.reload(true);
         numberOfClickToCard += 1;
         break;
       }
     }
  }
  win.addEventListener('click', clickOnWinnerCard);
}
button.addEventListener('click', startGameAndDecideWinnerAndLoosers);





const createMainInHtml = () => {
  const main = document.createElement('main');
  main.className = 'main';
  main.setAttribute('id', 'main');
  document.body.append(main);
}

const createCards = (number, className) => {
  for (let i = 0; i < number; i++) {
    const card = document.createElement('div');
    card.className = `${className}`;
    document.body>main.append(card);
  }
}

const addFrontAndBackSidesToCard = classNameOfCards => {
  let numberOfEachCardInTurn = 0;
  Array.from(document.querySelectorAll(classNameOfCards)).forEach(el => {
    cards.push(el);
    const cardFront = document.createElement('div');
    cardFront.className = 'card__front';
    document.body>main>cards[numberOfEachCardInTurn].append(cardFront);

    const cardBack = document.createElement('div');
    cardBack.className = 'card__looser_back';
    document.body>main>cards[numberOfEachCardInTurn].append(cardBack);
    numberOfEachCardInTurn++;
  });
}

const decideRandomOfWinner = () => {
  const randomNumberOfCard = cards[Math.floor(Math.random() * (numberOfCard))];
  const a = randomNumberOfCard.querySelector('.card__looser_back');
  a.className = 'card__winner_back';
  randomNumberOfCard.setAttribute('id', 'win');
  
  if (numberOfCard == 3) {
    randomNumberOfCard.className = 'card__easy';
  } else if (numberOfCard == 6) {
     randomNumberOfCard.className = 'card__medium';
  } else {
    randomNumberOfCard.className = 'card__hard';
  }
}