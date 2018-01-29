//TODO: getting user input and caching user input functions
//more specifically: get name, get goal, get goal date, get priorities.
//and then, cache those in the browser!!!

//Setting up IndexDb

document.addEventListener("DOMContentLoaded", function(event){
    //https://stackoverflow.com/questions/8100576/how-to-check-if-dom-is-ready-without-a-framework

    console.log("Dom content loaded, let's open a database.");
//     // In the following line, you should include the prefixes of implementations you want to test.
//   window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
//   // DON'T use "var indexedDB = ..." if you're not in a function.
//   // Moreover, you may need references to some window.IDB* objects:
//   window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
//   window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
  
    if (!window.indexedDB) {
      window.alert("Your browser doesn't support IndexDB. Cannot record your priorities list for the moment. :(")
  }
  //IndexDB: this helped! https://youtu.be/hEIyNrt6c_c
  //Opening the Database:
  let request = window.indexedDB.open("prioritiesDatabase", 2);
  //This will run every time we change the version number of prioritiesDatabase".
  request.onupgradeneeded = function(event) {
      console.log("we're onupgradeneeded"); //this doesn't work...
      let db = event.target.result;
  //In case the code is run for the first time, we set up the objectStore:
      if (!db.objectStoreNames.contains('test')){
          console.log("apparently, db doesn't contain test");//this doesn't work.... :( Mozilla not working!
            //Create the object store for priorities
      let objectStore = db.createObjectStore("test", { keypath: "id", autoIncrement: true});
      objectStore.createIndex("task", "task", {unique: false});
      objectStore.createIndex("url", "url", {unique: false});
      }    
  }
  
  //YAY! Success!
  request.onsuccess = function(event) {
      //bon là ça marche.
      console.log("request success: the db has been opened");
      db = this.result;
      //on va populer le html
      //displayPriorities();
  }
  
  //DUH! Error...
  request.onerror = function(event) {
      //faire un truc pour dire que ça ne marche pas...
      console.log("request error: could not open db.");
      };
});

//outside the doc ready function...
//we will add our data to the database WHEN the button is clicked:
document.getElementById("prioAdd").addEventListener("click", function(){
    let newPrio = document.getElementById("prioForm");
    let userItem = newPrio.elements["prioItem"].value;
    let userUrl = newPrio.elements["prioUrl"].value;
    console.log("we've received user input, ready to store them.");

    //Creating the transaction variable.

    let transaction = db.transaction(["test"], "readwrite"); //Mozilla doesn't work here. 
    // now a variable to access the objectStore.
    let store = transaction.objectStore("test");

    //define our Priority. It's an object with a task title and a url.
    let priority = [{
        task : userItem,
        url: userUrl
    }];
    //Now we want to add this object into the database.
    let request = store.add(priority[0]);
    
    //Success
    request.onsuccess = function(event){
        console.log("user input has been stored!");
        //display the data on the page.
       // alert("so now we need to access index DB data and display them on the page!", priority.task);
    }
      //error
    request.onerror = function(event){
        console.log("user priorities was not added to indexDB... ", event.target.error.name);

    }
});




/////////////////////////////////
//Setting up localstorage. (for name, goal, deadline.)
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



let storageReady = myStorage.length > 0;

// Now if the cache is full, we populate the html with the storage data.
if (storageReady) {
    populateHTML(myStorage); 
}
//if the User adds data, we fill the cache and we fill the html with those data.
document.getElementById("validateSettings").addEventListener("click", function(){
    myStorage.clear(); //we discard old settings.
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

/*document.getElementById("prioAdd").addEventListener("click", function(){
let newPrio = document.getElementById("prioForm");
let newPrioItem = newPrio.elements["prioItem"].value;
let newPrioUrl = newPrio.elements["prioUrl"].value;
console.log(newPrioItem, newPrioUrl);
});*/
