//TODO: getting user input and caching user input functions
//more specifically: get name, get goal, get goal date, get priorities.
//and then, cache those in the browser!!!



//myStorage.setItem("first test", "working!");

///OLD :
// const mesPrios = 
//     [{name:"finir le cours php",
//     url: "https://www.sololearn.com/Profile/6689025/PHP"},
//     {name: "finir le cours SQL",
//     url: "https://www.sololearn.com/Profile/6689025/SQL"},
//     {name: "continuer les algos",
//     url: "http://www.france-ioi.org/user/perso.php?sLogin=aureliebayre&bShow=Afficher"},
//     {name: "finir les exercices de webdesign",
//     url: "https://github.com/AurelieBayre/integration"}
// ]


// //Display those priorities:
// function makeList(arr){
//     for(let i = 0; i < arr.length; i ++){
//       // console.log(i)
//         let a = document.createElement("a");
//         let newLi = document.createElement("li");
//         a.textContent = mesPrios[i].name;
//         a.setAttribute("href", mesPrios[i].url);
//         a.setAttribute("target", "_blank");

//         newLi.appendChild(a);
//         document.getElementById("priorities").appendChild(newLi);
//         // This Stackoverflow helped a lot: 
//         //https://stackoverflow.com/questions/21977349/javascript-cant-add-href-to-list-item
//     }
// }
// makeList(mesPrios);

///////////////////////////////////////////////////////////////
//// NEW DISPPLAYING RULES (no hard coding: from user inputs)


//calculating the number of days until deadline
function remainingDays(dateStr){
let goalDate = new Date(dateStr).getTime();
let now = new Date().getTime();
let interval = goalDate - now;
let daysToGo = Math.floor(interval/ (1000 * 60 * 60 * 24));
return daysToGo;
}

//populating the page with the data:
function display(str, target){
     document.getElementById(target).innerHTML = str;
}

// Make the settings form appear or disappear.
function toggleSettingsForm(){
    var settingsForm = document.getElementById("getUserSettings");
    //ref: http://jsfiddle.net/rathoreahsan/vzmnJ/
    //toggling effect: https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
    if (settingsForm.style.display === "none") {
        settingsForm.style.display = "block";
    } else {
        settingsForm.style.display = "none";
    }
}


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
    let day = remainingDays(obj.deadline);
    let countdownMessage = alternateCountdown(day);
    let goalMessage = `${obj.goal}!`;

    display(greetings, "name");
    display(countdownMessage, "countDown");
    display(goalMessage, "goal");
}

//Setting up localstorage.
let myStorage = window.localStorage;

let storageReady = myStorage.length > 0;

// Now if the cache is full, we populate the html with the storage data.
if (storageReady) {
    populateHTML(myStorage); 
}
//if the User adds data, we fill the cache and we fill the html with those data.
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
   
        myStorage.setItem("name", userName);
        myStorage.setItem("goal", userGoal);
        myStorage.setItem("deadline", userDeadline);
        //myStorage.setItem("remaining", days);
        //no don't store the remaining days! Calculate them everyday.
   
  
    //set the template literals to be passed in the html:

   populateHTML(userData); 
   });


   ////////////
   ///the priorities:
   /*
   1. make a new form
   2 make a type text input.
   3. make a button add 
   4. make a button trash

   5. when user click add:
   assign value of input to variable. 
   make a new html element and inject the value of input into it.
   store item. (How?) (I mean, how do I set the key? )

    add item to array. set key and value as such: setItem("prio" + index, userItem);


   */