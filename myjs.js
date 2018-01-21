//TODO: getting user input and caching user input functions
//more specifically: get name, get goal, get goal date, get priorities.
//and then, cache those in the browser!!!

///OLD DISPLAYING RULES (hardcoding)
const goal = "Wild Code School";

//goal date:
const countDownDay = new Date("Feb 23, 2018").getTime();
//la donnée pour maintenant
const now = new Date().getTime();
//console.log(countDownDay, now);

//interval between now and goal date:
const interval = countDownDay - now;

//count that in Days units:
const remainingDays = Math.floor(interval/ (1000 * 60 * 60 * 24));

//Display the countdown:
const displayMessage = `${remainingDays} jours avant :`;
document.getElementById("countDown").innerHTML = displayMessage;

// Array of objects: my priorities
//const myPriorities = ["finir le cours PHP", "finir le cours MySql", "continuer les algos", "finir les exemples webdesign"];
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
//OK something is NOT WORKING HERE,
function display(str, target){
    document.getElementById(target).innerHTML = str;
}

//forms
function showSettingsForm(){
    document.getElementById("getUserSettings").style.display = "block";
    //ref: http://jsfiddle.net/rathoreahsan/vzmnJ/
}
var userData = [];

function processSettings() {
    const settings = document.getElementById("generalSettings");
    let userName = settings.elements["userName"].value;
    let userGoal = settings.elements["userGoal"].value;
    let userDeadline = settings.elements["userDeadline"].value;

    userData.push(userName);
    userData.push(userGoal);
    userData.push(userDeadline);
    console.log(userData);
    return userData;
    //console.log(userName, userGoal, userDeadline);
    
   // SO I'm calling the non working function here, WHAT's HPPENING,???
   // display(userName, "test");
   // display(userGoal, "goal");
}
console.log(userData);


//document.getElementById("goal").innerHTML = goal + " !";
