// game and logic module 
const Game = (function() {
    const cells = document.querySelectorAll('.cell');
    const scoreX = document.getElementById('score-X');
    const scoreO = document.getElementById('score-O');

    let gameOver = true;
    let roundOver = false;
    let winner = false;
    let turns = 0;
    let rounds = 1;

    const Player = {
        mark: 'X'
    };

    // arrays for logic
    // array for connecting HTML div to logic
    let board; 
    // this array is for checking win conditions
    const combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    const initBoard = () => {
        board = [0,1,2,3,4,5,6,7,8];
        turns = 0;
        for (let i = 0; i < cells.length; i++ ) {
            cells[i].innerText = '';
        }
    };

    // checks if the board is full and no winner - tie
    let checkFull = () => {
        console.log(`It is the ${turns} turn`);
        if (turns == 9 && winner == false) {
            alert('Round is tied');
            roundOver = true;
            rounds++;
            initBoard();
            resetCheck();
            return
        }
    };

    // checks either X or O plays during each turn
    const checkPlay = (attribute) => {
        for (let i = 0; i < combinations.length; i++) {
            if (board[combinations[i][0]] == attribute && 
                board[combinations[i][1]] == attribute &&
                board[combinations[i][2]] == attribute) {
                    alert(attribute + " won the round!");
                    roundOver = true;
                    winner = true;
                    rounds++;
                    initBoard();
                    console.log(`Round over is ${roundOver}.`);
            } 
        }
    };

    // this runs and changes the marks depending on 
    // the one previously played
    const switchMark = () => {
        if (Player.mark == 'O') {
            Player.mark = 'X';
        } else {
            Player.mark = 'O';
        }
    };

    // this changes the content inside of the div &
    // changes the corresponding div HTML id to the 
    // board array's index position
    // it then runs a check on the combinations
    // and runs the resetCheck
    const play = (x) => {
        if (x.innerHTML === '') {
            board[x.id] = Player.mark;
            x.innerText = Player.mark;
            switchMark();
            turns++;
            console.log(`Next Mark is ${Player.mark}`);
            console.log(board);
        } else {
            return
        }    
        checkPlay('X');
        checkPlay('O');
    };

    // this runs and checks if there is a winner
    // if a winner exists, it will reset the board
    // if not, it returns and the next turn goes on
    const resetCheck = () => {
        if (rounds == 5) {
            console.log('resetting');
            initBoard();
            console.log(`there are ${rounds}`);
            fullReset();
        } else {
            console.log('Next turn')
            return 
        }
    };
    
    // this function checks each DOM element 
    // or div, and gives them an event listener
    // that runs functions to play, check the marks played
    // and checking if there is a winner.
    const addMark = () => {
        for (let i = 0; i < cells.length; i++) {
            cells[i].index = i;
            cells[i].addEventListener('click', function add(e) {
                play(this);
                checkFull();
                console.log(`This is the ${rounds}th round`);
                resetCheck();
            }); 
        }
        // for (i of cells) {
        //     i.addEventListener('click', function(e) {
        //         play(this);
        //         checkFull();
        //         console.log(`This is the ${rounds}th round`);
        //         resetCheck();
        //     });
        // }
    };

    const fullReset = () => {
        gameOver = true;
        roundOver = false;
        winner = false;
        turns = 0;
        rounds = 1;
    };

    // runs the game when the button is clicked
    const startGame = () => {
        console.log(gameOver)
        gameOver = false;
        console.log(gameOver)
        if (gameOver === false) {
            console.log('Round Starting');
            initBoard();
            addMark();    
        }
    };

    return {startGame, Player, fullReset}    
})(); 

// display module
const Display = (function() {
    const start = document.getElementById('start');
    const playContainer = document.querySelector('.play-modal');
    const markContainer = document.querySelector('.mark-modal');
    const marks = document.querySelectorAll('.marks');
    const reset = document.getElementById('reset');

    const clearModal = () => {
        playContainer.classList.add('close');
        markContainer.classList.add('open');
        Game.startGame();
    };
    
    const resetGame = () => {
        playContainer.classList.remove('close');
        Game.fullReset();
    };

    // event listener for play modal
    start.addEventListener('click', clearModal);
    // event listener for mark modal
    for (let i = 0; i < marks.length; i++) {
        marks[i].addEventListener('click', function () {
            Game.Player.mark = this.innerText;
            markContainer.classList.remove('open');
        });
    }
    // event listener for reset button 
    reset.addEventListener('click', resetGame);
})();


