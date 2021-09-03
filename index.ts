import './models/Countries.enum';
import { Countries } from './models/Countries.enum';
import './models/Country';
import { Country } from './models/Country';
import { IResult } from './models/IResult';
import { Medals } from './models/Medals.enum';
import { Sports } from './models/Sports.enum';
import './style.css';
// TODO: required imports

const countrySelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('country-slt')
);
const medalSelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('medal-slt')
);
const sportSelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('sport-slt')
);

const addButton: HTMLElement = document.getElementById('add-btn');
const chngBtm: HTMLElement = <HTMLButtonElement>(
  document.getElementById('add-btn')
);

//TODO: add an eventlistener to the button to trigger addMedal
chngBtm.addEventListener('click', () => addMedal());

let countryMedalList: Array<Country> = [];
init();

// This function sets up some display elements
function init() {
  let count = 0;
  for (let c in Countries) {
    if (isNaN(Number(c))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = c;
      newOption.value = count.toString();
      count++;
      countrySelect.add(newOption);
    }
  }

  //TODO: populate the Sport select
  for (let s in Sports) {
    if (isNaN(Number(s))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = s;
      newOption.value = count.toString();
      count++;
      sportSelect.add(newOption);
    }
  }
  //TODO: populate the Medal select
  for (let m in Medals) {
    if (isNaN(Number(m))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = m;
      newOption.value = count.toString();
      count++;
      medalSelect.add(newOption);
    }
  }
}

// This function adds a medal to the countries tally
function addMedal() {
  //TODO: complete this function
  var m = document.getElementById('medal-slt') as HTMLSelectElement;
  var mSelected = m.options[m.selectedIndex];

  let ir: IResult = {
    sport: sportSelect.selectedIndex,
    medal: Medals[mSelected.innerHTML]
  };

  var cSelected = Countries[countrySelect.selectedIndex];

  var cIndex = countryMedalList.find(c => c.name == cSelected);

  if (cIndex == undefined) {
    var country = new Country(cSelected);
    country.results.push(ir);
    countryMedalList.push(country);
  } else {
    cIndex.results.push(ir);
  }

  displayTable();
}

// This function refreshes the medal tally table
function displayTable() {
  const resultsBody: HTMLTableSectionElement = <HTMLTableSectionElement>(
    document.getElementById('results-body')
  );

  let newBody: HTMLTableSectionElement = <HTMLTableSectionElement>(
    document.createElement('tbody')
  );
  newBody.id = 'results-body';
  console.log('hi');
  // TODO: create the rows required for the new table body element

  for (let i of countryMedalList) {
    var insertNew = newBody.insertRow(0);
    var insertCountry = insertNew.insertCell(-1);
    insertCountry.innerHTML = i.name;

    var insertGold = insertNew.insertCell(-1);
    insertGold.innerHTML = i.totalMedalType(Medals.Gold).toString();

    var insertSilver = insertNew.insertCell(-1);
    insertSilver.innerHTML = i.totalMedalType(Medals.Silver).toString();

    var insertBronze = insertNew.insertCell(-1);
    insertBronze.innerHTML = i.totalMedalType(Medals.Bronze).toString();

    var insertTotal = insertNew.insertCell(-1);
    insertTotal.innerHTML = i.totalMedals().toString();
  }

  // replaces the old tbody with the new one created above
  resultsBody.parentNode.replaceChild(newBody, resultsBody);
}
