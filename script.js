

const Game = (function(answer) {
    const table = document.getElementById('table');
    const board = [];

    const play = () => {
        let lastItem = board.at(-1);
        console.log(`Last play was ${lastItem}!`); // undefined
        if (lastItem === undefined) {
            board.push('X');
            console.log(board);
        } else if (lastItem === 'x' && value === 'x') {
            console.log('No going twice!');
            return;
        } else if (lastItem === 'x' && value === 'o') {
            board.push(value);
            console.log(board);
        }
    };

    const generateTable = () => {
        var div; 
        for (i = 0; i < 3; i++) {
            for (b = 0; b < 3; b++) {
                div = document.createElement("div"); 
                div.className = "cell";
                div.addEventListener('click', function(event) {
                    console.log(event);
                    play();
                    
                });
                table.appendChild(div);
            }
            table.appendChild(document.createElement("br"));
        }
    };

    const startGame = (answer) => {
        let begin = false;
        if (answer === false) {
            console.log('Not playing');
            return begin;
        } else {
            begin = true; 
            console.log('Playing');
            generateTable();
        }
    };
    return {startGame, board}
})(); 

Game.startGame(true);

