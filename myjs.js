let myStorage = window.localStorage;
//collecting user's Priorities and storing them.
const focusPriorities = document.getElementById("focusPriorities");
focusPriorities.addEventListener("submit", e => {
  e.preventDefault();
  const priorityData = {
    name: focusPriorities.elements["priorityName"].value,
    url: focusPriorities.elements["priorityUrl"].value
  };
  if ("priorities" in myStorage) {
    let storedPriorities = JSON.parse(myStorage.getItem("priorities"));
    storedPriorities.push(priorityData);
    myStorage.setItem("priorities", JSON.stringify(storedPriorities));
  } else {
    const firstPriority = [priorityData];
    myStorage.setItem("priorities", JSON.stringify(firstPriority));
  }
  location.reload();
});
//Retrieve those data:
const prioritiesFromStore = JSON.parse(myStorage.getItem("priorities"));

//Display those priorities:
function makeList(arr) {
  for (let i = 0; i < arr.length; i++) {
    let a = document.createElement("a");
    let newLi = document.createElement("li");
    a.textContent = arr[i].name;
    a.setAttribute("href", arr[i].url);
    a.setAttribute("target", "_blank");
    newLi.appendChild(a);
    document.getElementById("priorities").appendChild(newLi);
  }
}
if (prioritiesFromStore !== null) {
  makeList(prioritiesFromStore);
}

//calculating the number of days until deadline
function remainingDays(dateStr) {
  let goalDate = new Date(dateStr).getTime();
  let now = new Date().getTime();
  let interval = goalDate - now;
  let daysToGo = Math.floor(interval / (1000 * 60 * 60 * 24));
  return daysToGo;
}

//populating the page with the data:
function display(str, target) {
  document.getElementById(target).innerHTML = str;
}

// Make the settings form appear or disappear.
function toggleSettingsForm() {
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
      return `You've reached the deadline for:`;
    }
    if (str === 1) {
      return `Only 1 day to go before:`;
    }
    if (str > 1) {
      return `${str} days to go before:`;
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
document
  .getElementById("validateSettings")
  .addEventListener("click", function() {
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
    };

    //store this:
    myStorage.setItem("name", userName);
    myStorage.setItem("goal", userGoal);
    myStorage.setItem("deadline", userDeadline);
    //set the template literals to be passed in the html:

    populateHTML(userData);
  });
