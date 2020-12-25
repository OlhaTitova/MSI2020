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
    if(e.code == 'KeyR') {
        document.location.reload();
    }
})

// Response for Jokes

listBtnChoice.addEventListener('click', (e) => {
  listBtnChoice.querySelector('[checked="true"]').setAttribute('checked', 'false');
  e.target.setAttribute('checked', 'true');
})

 
btnGetJoke.addEventListener('click', async () => {
    if (btnRandom.checked){
       await getJokeRandom();
       changeHeart ()
    }
    if (btnCategory.checked) {
        await getJokeCategory();
        changeHeart ()
    }
    if(btnSearch.checked) {
        await getJokeSearch ();
        changeHeart ()
    }

    
    
});

function changeHeart () {

    const heartBox = document.body.querySelectorAll('.heart-box');
    const heardFull = document.body.querySelector('.heart-full');
    
    
    [].forEach.call(heartBox, heartBox => {
        console.log(heartBox);
        heartBox.addEventListener('click', (e) => {
            console.log(e.target);
        e.target.toggleAttribute('hidden');
        // heardFull.setAttribute('hidden', 'false');

    })
})
    // const heard = document.body.querySelectorAll('.heart');
    // console.log(heardFull);
    
    
    // [].forEach.call(heard, (heard) => {
        
    //     heard.addEventListener('click', () => {
            
            
    //         [].forEach.call(heardFull, (heardFull) => {
    //             heard.setAttribute('hidden', 'true');
    //             heardFull.classList.add('show');
                
    //             heardFull.addEventListener('click', () => {
    //                 console.log(heardFull);
        
    //                 heardFull.classList.remove('show');
    //                 heard.setAttribute('hidden', 'false');
    //             });
        
    //         });
    //     });
    // });
}


async function getJokeRandom() {
  const response = await fetch('https://api.chucknorris.io/jokes/random');
  const joke = await response.json();
  const cell = document.createElement('div');
  cell.innerHTML = renderRandomJoke(joke);
  row.appendChild(cell);
}


async function getJokeCategory() {

  let categoryId = document.querySelector('input[name="option"]:checked').value;

  const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${categoryId}`);
  const joke = await response.json();
  console.log(joke);
  const cell = document.createElement('div');
  cell.innerHTML = renderCategoryJoke(joke);
  row.appendChild(cell);
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
      <div class="heart-box">
        <img class="heart" src="img/Vector.svg" height="17" weight="20" alt="Heart">
        <img class="heart-full" src="img/heart.svg" height="17" weight="20" alt="Heart" hidden="true">
      </div>
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
          <input type="radio" name="option" id="${joke.categories}" value="1">
          <label id="Animal-joke" for="${joke.categories}">${joke.categories}</label>
        </span>
      </div>
    </div>`
}