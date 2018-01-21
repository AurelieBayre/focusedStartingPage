//TODO: getting user input and caching user input functions
//more specifically: get name, get goal, get goal date, get priorities.
//and then, cache those in the browser!!!

//Setting up localstorage.
let myStorage = window.localStorage;

//myStorage.setItem("first test", "working!");

///OLD :
const mesPrios = 
    [{name:"finir le cours php",
    url: "https://www.sololearn.com/Profile/6689025/PHP"},
    {name: "finir le cours SQL",
    url: "https://www.sololearn.com/Profile/6689025/SQL"},
    {name: "continuer les algos",
    url: "http://www.france-ioi.org/user/perso.php?sLogin=aureliebayre&bShow=Afficher"},
    {name: "finir les exercices de webdesign",
    url: "https://github.com/AurelieBayre/integration"}
]


//Display those priorities:
function makeList(arr){
    for(let i = 0; i < arr.length; i ++){
      // console.log(i)
        let a = document.createElement("a");
        let newLi = document.createElement("li");
        a.textContent = mesPrios[i].name;
        a.setAttribute("href", mesPrios[i].url);
        a.setAttribute("target", "_blank");

        newLi.appendChild(a);
        document.getElementById("priorities").appendChild(newLi);
        // This Stackoverflow helped a lot: 
        //https://stackoverflow.com/questions/21977349/javascript-cant-add-href-to-list-item
    }
}
makeList(mesPrios);

///////////////////////////////////////////////////////////////
//// NEW DISPPLAYING RULES (no hard coding: from user inputs)

function remainingDays(dateStr){
let goalDate = new Date(dateStr).getTime();
let now = new Date().getTime();
let interval = goalDate - now;
let daysToGo = Math.floor(interval/ (1000 * 60 * 60 * 24));
return daysToGo;
}

function display(str, target){
     document.getElementById(target).innerHTML = str;
}

//forms
function showSettingsForm(){
    document.getElementById("getUserSettings").style.display = "block";
    //ref: http://jsfiddle.net/rathoreahsan/vzmnJ/
}

let storageReady = myStorage.length > 0;


function populateHTML(obj) {
    
    function alternateCountdown(str) {
        if (str < 1) {
            return `You've reached the deadline for:`
        }
        if (str === 1){
            return `Only 1 day to go before:`
        }
        if (str > 1){
            return `${str} days to go before:`
        }
    }
    
    let greetings = `Hello ${obj.name}!`;
    let countdownMessage = alternateCountdown(obj.remaining);
    let goalMessage = `${obj.goal}!`;

    display(greetings, "name");
    display(countdownMessage, "countDown")
    display(goalMessage, "goal");
}

if (storageReady) {
    //console.log("I can see storage is ready");
   populateHTML(myStorage); 
}
//else{
  //  console.log("so it's not quite working then...");
//}
document.getElementById("validateSettings").addEventListener("click", function(){
    myStorage.clear();
    
    let settings = document.getElementById("generalSettings");
    let userName = settings.elements["userName"].value;
    let userGoal = settings.elements["userGoal"].value;
    let userDeadline = settings.elements["userDeadline"].value;
    let days = remainingDays(userDeadline);

    let userData = {
        name: userName,
        goal: userGoal,
        deadline: userDeadline,
        remaining: days
    }

    //store this: 
    if (!storageReady){
        //console.log("I don't see storage is ready");
        myStorage.setItem("name", userName);
        myStorage.setItem("goal", userGoal);
        myStorage.setItem("deadline", userDeadline);
        myStorage.setItem("remaining", days);
    }
  
    //set the template literals to be passed in the html:

   populateHTML(userData); 
   });
