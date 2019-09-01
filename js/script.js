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
  idNameOfTextEasy: 'checked__easy',
  idNameOfTextMedium: 'checked__medium',
  idNameOfTextHard: 'checked__hard',
  idNameOfMain: 'main',
  idNameOfButtonStartGame: 'start-game',
  tagNameOfDiff: 'diff',
  idOfcardWin: 'card-win',
}

let numberOfCard;
let cards = [];
const button = document.getElementById(config.idNameOfButtonStartGame);

const getDifficultyOfGame = () => {
  const diff = document.getElementsByName(config.tagNameOfDiff);
  const easyChecked = document.getElementById(config.idNameOfTextEasy);
  const mediumChecked = document.getElementById(config.idNameOfTextMedium);
  const hardChecked = document.getElementById(config.idNameOfTextHard);

  if (diff[0].checked) {
    easyChecked.classList.add('checked');
    mediumChecked.classList.remove('checked');
    hardChecked.classList.remove('checked');
    return (numberOfCard = 3);
  } else if (diff[1].checked) {
    easyChecked.classList.remove('checked');
    mediumChecked.classList.add('checked');
    hardChecked.classList.remove('checked');
    return (numberOfCard = 6);
  } else if (diff[2].checked) {
    easyChecked.classList.remove('checked');
    mediumChecked.classList.remove('checked');
    hardChecked.classList.add('checked');
    return (numberOfCard = 10);
  } else {
    return (numberOfCard = 3);
    easyChecked.classList.add('checked');
  }
}
getDifficultyOfGame();

const createAndShowCards = () => {
  getDifficultyOfGame();
  createMainInHtml();
  const main = document.getElementById(config.idNameOfMain);
  const keysOfCardClasses = {
    3: config.classNameOfMainForThreeCards,
    6: config.classNameOfMainForSixCards,
    10: config.classNameOfMainForTenCards
  }
  
  createCards(numberOfCard);
  addFrontAndBackSidesToCards();
  main.className = keysOfCardClasses[numberOfCard];
}


const startGameAndDecideWinnerAndLoosers = () => {
  const menu = document.getElementById(config.idNameOfMenu);
  let numberOfClick = 0;
  menu.className = config.classNameOfMenuBeforeStart;
  const body = document.body;
  createAndShowCards();
  decideRandomOfWinner();
  
  const losers = document.querySelectorAll(`.${config.classNameOfLuserCards}`);
  losers.forEach((elem) => {
    elem.addEventListener('click', () => {
        if (elem.className !== config.classNameOfCardLooserRotated && numberOfClick == 0) {
          elem.className = config.classNameOfCardLooserRotated;
          numberOfClick++;
        } else {
          location.reload(true);
      } 
    })
  })
      
  const win = document.getElementById(config.idOfcardWin);
  const clickOnWinnerCard = () => {
      if (win.className !== config.classNameOfCardWinnerRotated && numberOfClick == 0) {
        win.className = config.classNameOfCardWinnerRotated;
        numberOfClick++;
       } else {
         location.reload(true);
       }
     }
  win.addEventListener('click', clickOnWinnerCard);
}
button.addEventListener('click', startGameAndDecideWinnerAndLoosers, {once: true});

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