let countclicks = 0;
let vers = 0;
let countfields = 0;
let user = "";
let comp1 = 0;
let comp2 = 0;
let match1 = 0;
let match2 = 0;
let matchcount = 0;
let sec = 0;
let sequenzID = 0;
const parent = document.getElementById("spielbereich");

//---------functions that are called on load---------//
//get name of player
function getusername() { 
    user = prompt("Name:");
    document.getElementById("user").innerHTML = "Spieler: " + user;
}
//start timer
function timer() {
    sec += 1;
    document.getElementById("timer").innerHTML = "Zeit: " + sec;
}
function startTimer() {
    sequenzID = setInterval(timer, 1000);
}
//mix cards
function mixarray() {
    var array = Array.from(addItem()); //convert nodelist to array
    array.sort(function() { //shuffle array
        return 0.5 - Math.random();
    });
    display(array); //display shuffled array
}
//add cards to parent div
function addItem() {
    for (let y = 0; y < 16; y++) {
        var node = document.createElement("div"); //create div
        node.classList.add("karte"); //add class "karte"
        node.setAttribute("id", y + 1); //add id to each card (1-16)
        node.setAttribute("onclick", "match(id)"); //add onclick event to each card --> function match(id)
        parent.appendChild(node); //add card to parent div
    }
    var nodelist = document.querySelectorAll(".karte"); //get all cards with class "karte" and save them in nodelist
    return nodelist; //return nodelist
}
//display cards
function display(array) {
    var output = document.createElement('div'); //create div
    array.forEach((item) => { //iterate through array of cards
        output.appendChild(item); //add card to div
        if (countfields % 4 == 0) { //new line after 4 cards
            item.style.clear = "left";
        }
        countfields += 1; //counter for new line
    });
    parent.appendChild(output); //add div to parent div
}

//---------functions that are called on click---------//
function match(cardid) {
    turn(cardid); //turn card
    countclicks += 1; //counter for clicks
    if (countclicks % 2 == 0) { //if counter is even
        vers += 1; //counter for tries
        document.getElementById("versuche").innerHTML = "Versuche: " + vers; //display tries
        comp2 = parseFloat(cardid); //save id of second card
        if (comp1 + comp2 == 17) { //if sum of both cards is 17 --> match
            match1 = document.getElementById(comp1); //save first card in variable
            match2 = document.getElementById(comp2); //save second card in variable
            match1.removeAttribute("onclick"); //remove onclick event from first card
            match2.removeAttribute("onclick"); //remove onclick event from second card
            setTimeout(matchfound, 700); //wait 700ms and call function matchfound
        }
        else { //if sum of both cards is not 17 --> no match
            setTimeout(turnback, 700); //wait 700ms and call function turnback
        }
    }
    else { //if counter is odd
        comp1 = parseFloat(cardid); //save id of first card
    }
}
//change background image of card when clicked
function turn(nummer) {
    document.getElementById(nummer).style.backgroundImage = "url('pics/card" + nummer + ".png')";
}
//change background image of card when no match
function turnback() {
    document.getElementById(comp1).style.backgroundImage = "url('pics/memoryBg.png')";
    document.getElementById(comp2).style.backgroundImage = "url('pics/memoryBg.png')";
}
//change background image of card when match and check if all cards are found
function matchfound() {
    match1.style.backgroundImage = "url('pics/memoryBgI.png')";
    match2.style.backgroundImage = "url('pics/memoryBgI.png')";
    matchcount += 1; //counter for matches
    if (matchcount == 8) { //if all cards are found
        clearInterval(sequenzID); //stop timer
        setTimeout(gewonnen, 200); //wait 200ms and call function gewonnen
    }
}
//display alert when all cards are found
function gewonnen() {
    if ((confirm("Du hast gewonnen! Möchtest du noch eine Runde spielen?")) == true) { //if user clicks "ok"
        location.reload(); //reload page
    }
}