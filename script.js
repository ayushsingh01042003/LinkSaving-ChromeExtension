const inputEl = document.getElementById(`inputEl`);
const saveInputBtn = document.getElementById(`inputBtn`);
const unListEl = document.getElementById(`unListEl`);
const deleteBtn = document.getElementById(`deleteBtn`);
const saveTabBtn = document.getElementById(`tabBtn`);

let myLeads = [];

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

const loadLeads = () => {
    if(leadsFromLocalStorage) {
        myLeads = leadsFromLocalStorage;
        render(myLeads);
    }
}

const saveInput = () => {
    if(inputEl.value !== ``) {
        myLeads.push(inputEl.value);
        inputEl.value = ''; // Clear input field
        localStorage.setItem("myLeads", JSON.stringify(myLeads));// save to local storage
        render(myLeads);
    }
}

const render = (leads) => {
    let listItems = ``;
    for(let i = 0; i < leads.length; i++) {
        listItems +=`<li>
                        <a target = _blank href = "${leads[i]}">${leads[i]}</a>
                    </li>`
    }
    unListEl.innerHTML = listItems;
}

const deleteLeads = () => {
    unListEl.innerHTML = '';
    myLeads = [];
    localStorage.clear();
}

const saveTab = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
}

saveInputBtn.addEventListener(`click`, saveInput);
saveTabBtn.addEventListener(`click`, saveTab);
deleteBtn.addEventListener(`dblclick`, deleteLeads);
window.onload = loadLeads();