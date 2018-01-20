//TODO: getting user input and caching user input functions
//more specifically: get name, get goal, get goal date, get priorities.
//and then, cache those in the browser!!!

const goal = "Wild Code School";

//le jour-objectif:
const countDownDay = new Date("Feb 23, 2018").getTime();
//la donnée pour maintenant
const now = new Date().getTime();
//console.log(countDownDay, now);

//intervalle entre maintenant et l'objectif:
const interval = countDownDay - now;

//classons en jours:
const remainingDays = Math.floor(interval/ (1000 * 60 * 60 * 24));

//Afficher tout ça:
const displayMessage = `${remainingDays} jours avant :`;

document.getElementById("countDown").innerHTML = displayMessage;

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

document.getElementById("goal").innerHTML = goal + " !";
