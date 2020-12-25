'use strict';
const btnGetJoke = document.body.querySelector('#btnGetJoke');
const btnGroupCategory = document.body.querySelector('#choice-category')
const btnCategory = document.querySelector('#categories');
const btnSearch = document.querySelector('#search');
const btnRandom = document.body.querySelector('#random');
const row = document.body.querySelector('#row');
const listBtnChoice = document.body.querySelector('#joke-search-list')
const searchField = document.body.querySelector('#searchField')

btnCategory.addEventListener('click', () => {
  document.querySelector('#choice-category').classList.toggle('show');
});
btnSearch.addEventListener('click', () => {
  document.querySelector('#choice-search').classList.toggle('show');
});

document.addEventListener('keydown', (e) => {
    if(e.code == 'KeyR' && (e.ctrlKey || e.metaKey)) {
        document.location.reload();
    }
})

// Response for Jokes

listBtnChoice.addEventListener('click', (e) => {
  listBtnChoice.querySelector('[checked="true"]').setAttribute('checked', 'false');
  e.target.setAttribute('checked', 'true');
})

 
btnGetJoke.addEventListener('click', () => {
    if (btnRandom.checked){
        getJokeRandom();
    }
    if (btnCategory.checked) {
        getJokeCategory();
    }
    if(btnSearch.checked) {
        getJokeSearch ();
    }
});


async function getJokeRandom() {
  const response = await fetch('https://api.chucknorris.io/jokes/random');
  const joke = await response.json();
  const cell = document.createElement('div');
  cell.innerHTML = renderRandomJoke(joke);
  row.appendChild(cell);
}


async function getJokeCategory() {
  const categoryId =  getCategory();
  console.log(categoryId);
  const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${categoryId}`);
  const joke = await response.json();
  console.log(joke);
  const cell = document.createElement('div');
  cell.innerHTML = renderCategoryJoke(joke);
  row.appendChild(cell);
}


async function getCategory() {

    const response = await fetch('https://api.chucknorris.io/jokes/categories');
    const categoriesType = await response.json();
  
    console.log(categoriesType);
     
    let categoryIdValue = btnGroupCategory.addEventListener('click', (e) => {
        let categoryId = e.target.id;
        
        console.log(categoryId);

        if (e.target.checked) {
            
            categoriesType.forEach(element => {
                
                if (element === categoryId) {
                  console.log(categoryId);

                  return categoryId;
                
                }
            });
        }
    });
console.log(categoryIdValue);
return categoryIdValue;
}

async function getJokeSearch () {

    const response = await fetch (`https://api.chucknorris.io/jokes/search?query=${searchField.value}`)
    const data = await response.json();

    data.result.forEach(joke => {
        const cell = document.createElement('div');
        cell.innerHTML = renderRandomJoke(joke);
        row.appendChild(cell);
    });
}

function renderRandomJoke(joke) {
  return `<div class="joke">
      <img class="heart" src="img/Vector.svg" height="17" weight="20" alt="Heart">
      <div class="sms-main">
        <div class="sms">
          <img src="img/sms.svg" alt="sms">
          <img class="line1" src="img/line1.svg" alt="line1">
          <img class="line2" src="img/line2.svg" alt="line2">
          <img class="line3" src="img/line3.svg" alt="line3">
        </div>
      </div>
      <div class="link-id">ID: ${joke.id}<img class=img-id src="img/icon-open-page.svg" height="10"
          weight="10">
      </div>
      <div class="joke-text">${joke.value}</div>
      <div class="time">${joke.created_at}
      </div>
    </div>`
}
function renderCategoryJoke(joke) {
  return `<div class="joke">
      <img class="heart" src="img/Vector.svg" height="17" weight="20" alt="Heart">
      <div class="sms-main">
        <div class="sms">
          <img src="img/sms.svg" alt="sms">
          <img class="line1" src="img/line1.svg" alt="line1">
          <img class="line2" src="img/line2.svg" alt="line2">
          <img class="line3" src="img/line3.svg" alt="line3">
        </div>
      </div>
      <div class="link-id">ID: ${joke.id}<img class=img-id src="img/icon-open-page.svg" height="10"
          weight="10">
      </div>
      <div class="joke-text">${joke.value}</div>
      <div class="time">${joke.created_at}
        <span class="radios-as-btn category">
          <input type="radio" name="option" id="${joke.categories.join()}" value="1">
          <label id="Animal-joke" for="${joke.categories.join()}">${joke.categories.join()}</label>
        </span>
      </div>
    </div>`
}
