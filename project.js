//Deposit some money
//Determine no. of lines to bet on
//Collect a bet
// Spin the slot machine
// Check if the user won
//Give the user their winnings
//play again 

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A:2,
    B:4,
    C:6,
    D:8,
};

const SYMBOL_VALUES =  {
    A:5,
    B:4,
    C:3,
    D:2,
};

const deposit = () => {
    const depositAmount = prompt("Enter a deposit amount: ");
    const integerdepositAmount = parseFloat(depositAmount);
    if (isNaN(integerdepositAmount) |integerdepositAmount <= 0) {
        console.log("Invalid deposit amount, try again.");
      } else {
        return integerdepositAmount;
      }
    


};
const getnumberoflines = () => {
    while(true){

    

        const lines = prompt("Enter the number of lines to bet on(1-3): ");
        const numberoflines = parseFloat(lines);

        if(isNaN(numberoflines) || numberoflines <= 0 || numberoflines > 3){
            console.log("Invalid number of lines,try again");

        }
        else{
            return numberoflines;
        }
    }
};
const getbet = (balance,lines) => {
    while(true){

    

        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance/lines){
            console.log("Invalid bet,try again");

        }
        else{
            return numberBet;
        }
    }
};

const Spin = () =>{
    const symbols = [];
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0;i < count;i++){
            symbols.push(symbol);
        }

    }
    const reels = [];
    for(let i = 0;i < COLS;i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j  = 0;j < ROWS;j++){
            const randomindex = Math.floor(Math.random() * reelSymbols.length);
            const selectedsymbol = reelSymbols[randomindex];
            reels[i].push(selectedsymbol);
            reelSymbols.splice(randomindex,1);
        }

    }
    return reels;
};
const transpose = (reels) =>{
    const rows =[];

    for(let i = 0;i < ROWS;i++){
        rows.push([]);
        for(let j = 0;j < COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};
const printingrows = (rows) =>{
    for(const row of rows){
        let rowstring = "";
        for(const[i,symbol] of row.entries()){
            rowstring += symbol;
            if(i != row.length - 1){
                rowstring += " | ";
            }

        
        }
        console.log(rowstring);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
  
    for (let row = 0; row < lines; row++) {
      const symbols = rows[row];
      let allSame = true;
  
      for (const symbol of symbols) {
        if (symbol != symbols[0]) {
          allSame = false;
          break;
        }
      }
  
      if (allSame) {
        winnings += bet * SYMBOL_VALUES[symbols[0]];
      }
    }
  
    return winnings;
  };

const game = () =>{


    let balance = deposit();
    while(true){

    
        console.log(balance);
        const numberoflines = getnumberoflines();
        const bet = getbet(balance,numberoflines);
        balance -= bet * numberoflines;
        const reels_output = Spin();
        const rows = transpose(reels_output);
        // console.log(reels_output);
        // console.log(rows);
        printingrows(rows);
        const your_winninngs = getWinnings(rows,bet,numberoflines);
        balance += your_winninngs;
        console.log("You won,$ " + your_winninngs.toString());
        if(balance <= 0){
            console.log("You ran out of money");
            break;
        }
        
        const playagain = prompt("Do you want to playagain?(y/n)?");
        if(playagain != "y"){
            break;
        }
    }
};

game();