'use strict';


function main () {
  var memoryGame = new MemoryGame(cards);
  var html = '';
  memoryGame.shuffleCards();
  memoryGame.cards.forEach(function (pic) {
    html += '<div class="card" data-card-name="'+ pic.name +'">';
    html += '  <div class="back" name="'+ pic.img +'"></div>';
    html += '  <div class="front" style="background: url(img/'+ pic.img +') no-repeat"></div>';
    html += '</div>';
  });

  // Add all the div's to the HTML
  var memoryBoard = document.querySelector('#memory_board');
  if(memoryBoard) { // this condition is for passing the tests
    memoryBoard.innerHTML = html;
  }
  
  // You will need to do something to the front as well
  var front = document.querySelectorAll('.front');

  // Bind the click event of each element to a function
  var back = document.querySelectorAll('.back'); 
  back.forEach((element) => {
    element.addEventListener('click', function () {
      // TODO: write some code here
      if (!this.classList.contains('active')) { //when card is not active and it is clicked, it should put it into the picked Cards array and add the classname active
        memoryGame.pickedCards.push(this);
        displayClickedCard(this);

        if(memoryGame.pickedCards.length > 1) { // when we already clicked 2 cards we shouldnt be able to click on another front or back class card
          back.forEach((element)=>element.classList.add('blocked')); 
          front.forEach((element)=>element.classList.add('blocked'));
          var firstCard = memoryGame.pickedCards[0].getAttribute("name"); //firstcard is first object we clicked on (which was pushed to the index 0 of the empty array)
          var secondCard = memoryGame.pickedCards[1].getAttribute("name");
          if(memoryGame.checkIfPair(firstCard, secondCard)) { //if firstcard and secondcard are the same , the nextTurnfunction is called (where the array of pickedcards is set to [] and we are able to click to the next cards(by removing the blocked class))
            prepareNextTurn();
          } else {
            turnBackCards();
          }
        }
        printGameInfo();
        if (memoryGame.isFinished()) { alert('You wooon!!!'); }
      }
    })
  });
  
  
  
  // Helpers to create the logic of the game
  function turnBackCards() {
    setTimeout(function () {
      memoryGame.pickedCards[0].style.background = '#456783';
      memoryGame.pickedCards[1].style.background = '#456783';
      memoryGame.pickedCards[0].classList.remove('active');
      memoryGame.pickedCards[1].classList.remove('active');
      prepareNextTurn();
    }, 1000);
  }
  
  function prepareNextTurn() {
    memoryGame.pickedCards = [];
    back.forEach((element)=> element.classList.remove('blocked'))
    front.forEach((element)=> element.classList.remove('blocked'))
  }
  
  function printGameInfo() {
    document.getElementById('pairs_clicked').innerHTML = memoryGame.pairsClicked;
    document.getElementById('pairs_guessed').innerHTML = memoryGame.pairsGuessed;
  }
  
  function displayClickedCard(card) {
    card.className += ' active';
    card.style.background = 'url(img/' + card.getAttribute('name') + ') no-repeat';
  }
};

window.addEventListener('load', main);


