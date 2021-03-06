const fetchMyData = () => {
  // Trying without authentication
  // step 0: make an api call using fetch.
  // make a call to get promise response using the fetch keyword.
  // fetch("https://cab-cors-anywhere.herokuapp.com/https://www.thesportsdb.com/api/v1/json/1/all_sports.php")

  // Trying with authentication
  // step 1: displaying respnse coming from the api
  // using .then to catch the promise response coming from api and wraping it in to a function.
  const url =
    "https://cab-cors-anywhere.herokuapp.com/https://www.thesportsdb.com/api/v1/json/1/all_sports.php";
  fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": "1",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // returning the response into json file to make it readable for the browser.
      return response.json();
    })
    //  step 2: display this step until step 1 is fully completed.
    // extracting the data and displaying loading until the data is displayed on the page.
    .then((all_Sports) => {
      document.getElementById("loading").style.display = "none";
      // calling the displayData to perform inside the block.
      console.log(all_Sports.sports);
      displayData(all_Sports.sports);
      createSelectOptions(all_Sports.sports);
      addEvents(all_Sports.sports);
    })
    // step 3: display error message if any prbloem in step 1 for extracting the data from api.
    // cathing any error coming from the data or url.
    .catch((err) => {
      // calling the showerror to run insde the block.
      showError(err);
    });
};

// run the function only the html page which has doc title as sportlist.
if (document.title === "sportlist") {
  fetchMyData();
}

// displaying the error message (step 3) on the html page.
const showError = (err) => {
  document.getElementById("error").innerHTML = err;
};



const displayData = (sports) => {
  // selecting the elemnet from html page
  const tabData = document.getElementById("tablebody");
  tablebody.innerHTML = "";

  // looping through the sports array.
  sports.forEach((sport, index) => {
    // creating a new element inside the html page
    const tabTr = document.createElement("tr");
    const tabtd1 = document.createElement("td");
    const tabtd2 = document.createElement("td");
    const tabtd3 = document.createElement("td");
    const tabtd4 = document.createElement("td");

    // making image out of a link.
    let myImg = new Image();
    myImg.src = sport.strSportThumb;
    tabtd3.appendChild(myImg);

    // show more show less text for the description.
    // splitting the  description
    let splittedDescription = sport.strSportDescription.split(".");
    // let shortText = splittedDescription
    let shortText = splittedDescription[0];
    splittedDescription.shift();
    console.log(splittedDescription);
    let longText = splittedDescription.join("");
    console.log(longText);

    tabtd1.innerHTML = sport.strSport;
    tabtd2.innerHTML = sport.strFormat;
    // tabtd3.innerHTML = sport.strSportThumb;
    tabtd4.innerHTML = shortText;

    //show more show less
    // creating the <p> tag
    let ptag = document.createElement("p");
    // assining id to <p> tag
    ptag.setAttribute("id", "ptagId-" + index);
    // // styling the <p> tag
    ptag.style = "display: none";
    // creating the <button> tag.
    let btn = document.createElement("button");
    // assiging id to <button> tag.
    btn.setAttribute("id", "btnId-" + index);
    // writing text on the button
    btn.innerHTML = "show More";
    // assiging a text <p> tag.
    ptag.innerHTML = longText;

    // adding an event listener to btn <button>tag
    btn.addEventListener("click", function (event) {
      showmorefunc(event);
    });

    tabtd4.appendChild(ptag);
    tabtd4.appendChild(btn);

    tabTr.appendChild(tabtd1);
    tabTr.appendChild(tabtd2);
    tabTr.appendChild(tabtd3);
    tabTr.appendChild(tabtd4);

    tabData.appendChild(tabTr);
  });
};

const showmorefunc = (event) => {
  let btnId = event.target.id;
  let numberIndex = btnId.split("-")[1];

  let ptag = document.getElementById("ptagId-" + numberIndex);
  // ptag.style.display = "block";
  if (ptag.style.display === "block") {
    ptag.style.display = "none";
    document.getElementById(btnId).innerHTML = " show More";
  } else {
    ptag.style.display = "block";
    document.getElementById(btnId).innerHTML = " show less";
  }
  console.log(ptag);

  //
  console.log(event.target.id);
};

// STEP 1: adding event listners to the checboxes and dropdown.

// Creating the events For checkbox and Select dropdown and saving it to a variable called add events.
const addEvents = (sports) => {
  // selecting check boxes with input type checkbox.
  let checkboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]")
  );
  // looping through the array of data
  checkboxes.forEach((checkbox) => {
    // adding event listener to the check boxes
    checkbox.addEventListener("change", () => {
      // calling filter function run inside the change event
      filterData(sports);
    });
  });
  //  selecting the dropdown and adding the eventlistener to it.
  document.getElementById("selectDrop").addEventListener("change", () => {
    // calling filter function to run inside the chnage event.
    filterData(sports);
  });
};

// step 2: creating the option in select dropdown dynamically.
// creating the select options adding the values to it dynamically.
const createSelectOptions = (sports) => {
  let sportNames = sports.map((sports) => {
    return sports.strSport;
  });
  console.log(sportNames);
  // creating a new arrayay to remove duplicates.
  let cleanedSportNames = [];
  // looping through the array to remove the duplicates
  sportNames.forEach((strSport, index) => {
    // using indexOf method to remove duplicates.
    if (sportNames.indexOf(strSport) === index) sportNames.push(strSport);
    {
      // pushing the result to an array.
      cleanedSportNames.push(strSport);
    }
  });
  console.log(cleanedSportNames);

  // selecting the select dropdown and assiging an cleaned array value to it as well as changing the atribute.
  let select = document.getElementById("selectDrop");
  cleanedSportNames.forEach((strSport) => {
    // creating a new element and rendering it dynamically.
    let option = document.createElement("option");
    option.innerHTML = strSport;
    option.setAttribute("value", strSport);
    select.appendChild(option);
  });
};

// writing the filter function with actually filters the data.
const filterData = (sports) => {
  console.log(sports);
  let checkboxes = Array.from(
    // selecting the checkboxes and  mapping through entire object to revice the  checked value.
    document.querySelectorAll("input[type=checkbox]:checked")
    // mapping through the chechboxes
  ).map((checkbox) => {
    return checkbox.value;
  });

  // slecting the dropdown and it's value.
  let selectElm = document.getElementById("selectDrop").value;
  console.log(selectElm);
  console.log(checkboxes);
  let filteredData = [];
  // 1 Conditition : if nothing slected than display all
  if (selectElm === "all" && checkboxes.length === 0) {
    filteredData = sports;
    // 2 condition : if only checkbox is selected than only display data from checkdown.
  } else if (selectElm === "all" && checkboxes.length !== 0) {
    sports.forEach((sport) => {
      if (checkboxes.includes(sport.strFormat)) {
        filteredData.push(sport);
      }
    });
    // 3 condition : if only dropdown is selected than only display data from the Dropdown.
  } else if (selectElm !== "all" && checkboxes.length === 0) {
    sports.forEach((sport) => {
      if (selectElm === sport.strSport) {
        filteredData.push(sport);
      }
    });
    // 4 condition: if both are selected than display data from all.
  } else {
    sports.forEach((sport) => {
      if (
        selectElm === sport.strSport &&
        checkboxes.includes(sport.strFormat)
      ) {
        filteredData.push(sport);
      }
    });
  }
  displayData(filteredData);
};

// 1 : show more common function
// 2 :Html to html
// 3 : media query
// need to make another 2nd table for the mobile version media query.

// 1st class desktop table: display :block
// 2nd class mobile table : display : none
// using the media query invert the display property.
