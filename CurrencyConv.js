const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select"); 
 //write select also cause we are adding or user is selecting from there
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");//<select name="From"></select>
const toCurr = document.querySelector(".to select");//<select name="To"></select>
const msg = document.querySelector(".msg");
 
for (let select of dropdowns) {
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected ="selected";  //you can use a //name //select.name
          } 
          else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
          }
          select.append(newOption);
    }

    select.addEventListener("change", (evt) => {//change is a event where there is a change in select
        updateFlag(evt.target);
      });
} 


const updateExchangeRate = async () => {
        let amount = document.querySelector(".amount input");
        let amtVal = amount.value;
        if (amtVal === "" || amtVal < 1) {
          amtVal = 1;
          amount.value = "1";
        }
         //console.log(fromCurr.value,toCurr.value);
        const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[toCurr.value.toLowerCase()];

        let finalAmount = amtVal * rate; //amtVal is defined above or before.
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;//1USD=80INR model.
    };

    const updateFlag = (element) => {
        // u can name anything not only element while passing but it should be same even in inside function console.log(element);
        let currCode = element.value;
        let countryCode = countryList[currCode];
        let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newSrc;
    };
    

    btn.addEventListener("click", (evt) => {
        evt.preventDefault();
        updateExchangeRate();
    });


    window.addEventListener("load", () => {
        updateExchangeRate();
      });