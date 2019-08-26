const config = {
  classNameOfMainForThreeCards: 'main-for-three-cards',
  classNameOfMainForSixCards: 'main-for-six-cards',
  classNameOfMainForTenCards: 'main-for-ten-cards',
  classNameOfMenuBeforeStart: 'nav-before-start',
  classNameOfAllCards: 'card',
  classNameOfCards: 'card card__looser',
  classNameOfLuserCards: 'card__looser',
  classNameOfFrontSideForCard: 'card__front',
  classNameOfBackSideForCard: 'card__looser_back',
  classNameOfLoserBack: 'card__looser_back',
  classNameOfWinnerBack: 'card__winner_back',
  classNameOfCardLooserRotated: 'card__looser_rotated',
  classNameOfCardWinnerRotated: 'card__winner_rotated',
  classNameOfRandomWinnerCard: 'card card__winner',
  idNameOfMenu: 'nav',
  idNameOfMain: 'main',
  idNameOfButtonStartGame: 'start-game',
  diff: 'diff',
  cardWin: 'card-win',
}


let numberOfCard;
let cards = [];
const button = document.getElementById(config.idNameOfButtonStartGame);

function getDifficultyOfGame() {
  const diff = document.getElementsByName(config.diff);
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
  const main = document.getElementById(config.idNameOfMain);

  if (numberOfCard == 3) {
    createCards(3);
    addFrontAndBackSidesToCards();
    main.className = config.classNameOfMainForThreeCards;
  } else if (numberOfCard == 6) {
    createCards(6);
    addFrontAndBackSidesToCards();
    main.className = config.classNameOfMainForSixCards;
  } else {
    createCards(10);
    addFrontAndBackSidesToCards();
    main.className = config.classNameOfMainForTenCards;
  }
}


const startGameAndDecideWinnerAndLoosers = () => {
  const menu = document.getElementById(config.idNameOfMenu);
  menu.className = config.classNameOfMenuBeforeStart;
  const body = document.body;
  createCardsAndshowCards();
  decideRandomOfWinner();
  
  let numberOfClickToCard = 0;
  const losers = document.querySelectorAll(`.${config.classNameOfLuserCards}`);
  losers.forEach((elem) => {
    elem.addEventListener('click', () => {
      while (true) {
        if (numberOfClickToCard % 2 == 0) {
          elem.className = config.classNameOfCardLooserRotated;
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
      
  const win = document.getElementById(config.cardWin);
  const clickOnWinnerCard = () => {
    while (true) {
      if (numberOfClickToCard % 2 == 0) {
        win.className = config.classNameOfCardWinnerRotated;
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
  main.setAttribute('id', 'main');
  document.body.append(main);
}

const createCards = (number) => {
  for (let i = 0; i < number; i++) {
    const card = document.createElement('div');
    card.className = config.classNameOfCards;
    document.body>main.append(card);
  }
}

const addFrontAndBackSidesToCards = () => {
  let numberOfEachCardInTurn = 0;
  Array.from(document.querySelectorAll(`.${config.classNameOfAllCards}`)).forEach(el => {
    cards.push(el);
    const cardFront = document.createElement('div');
    cardFront.className = config.classNameOfFrontSideForCard;
    document.body>main>cards[numberOfEachCardInTurn].append(cardFront);

    const cardBack = document.createElement('div');
    cardBack.className = config.classNameOfBackSideForCard;
    document.body>main>cards[numberOfEachCardInTurn].append(cardBack);
    numberOfEachCardInTurn++;
  });
}

const decideRandomOfWinner = () => {
  const randomNumberOfCard = cards[Math.floor(Math.random() * (numberOfCard))];
  const a = randomNumberOfCard.querySelector(`.${config.classNameOfLoserBack}`);
  a.className = config.classNameOfWinnerBack;
  randomNumberOfCard.setAttribute('id', 'card-win');
  randomNumberOfCard.className = config.classNameOfRandomWinnerCard;
}