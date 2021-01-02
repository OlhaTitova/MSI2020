'use strict';
const btnGetJoke = document.body.querySelector('#btnGetJoke');
const listCategory = document.body.querySelector('#choice-category')
const btnCategory = document.querySelector('#categories');
const btnSearch = document.querySelector('#search');
const btnRandom = document.body.querySelector('#random');
const row = document.body.querySelector('#row');
const listBtnChoice = document.body.querySelector('#joke-search-list')
const searchField = document.body.querySelector('#searchField')
const menuToggle = document.body.querySelector('#menu__toggle');
const page = document.body.querySelector('.page');
const blackWrapper = document.body.querySelector('#black-wrapper');


btnCategory.addEventListener('click', () => {
    listCategory.classList.toggle('show');
    listCategory.innerHTML = '';
    getCategory();
});

btnSearch.addEventListener('click', () => {
  document.querySelector('#choice-search').classList.toggle('show');
});

document.addEventListener('keydown', (e) => {
    if(e.code == 'KeyR') {
        document.location.reload();
    }
});

menuToggle.addEventListener ('click', (e) =>{
    blackWrapper.classList.toggle('wrapper-black');
})

// Response for Jokes

listBtnChoice.addEventListener('click', (e) => {
    const selectedRadioBTN = listBtnChoice.querySelector('[checked="true"]');
    selectedRadioBTN.setAttribute('checked', 'false');
    e.target.setAttribute('checked', 'true');
});
 
btnGetJoke.addEventListener('click', async () => {
    if (btnRandom.checked){
        await getJokeRandom(); 
    }
    if (btnCategory.checked) {
        await getJokeCategory();
    }
    if(btnSearch.checked) {
        await getJokeSearch ();
    }
});

(function changeHeart () {

    row.addEventListener('click', (e) => {
        const card = e.target.closest('.joke');
        const heart = card.querySelector('svg');
        const heartPath = card.querySelector('svg path');
        const favorite = document.body.querySelector('.aside-favorite');
        const favoriteForTablet = document.body.querySelector('.menu__box')
        const cell = document.createElement('div');
        const cellForTablet = document.createElement('div');
        const text = card.querySelector('.joke-text');
        const time = card.querySelector('.time-box .time');
        const currentTextValue = text.textContent;
        const currentTimeValue = time.textContent;
        const currentId = card.id;
        
        cell.classList.add('favorite-joke');
        cell.setAttribute('id', `${card.id}`);
        cellForTablet.classList.add('favorite-joke');
        cellForTablet.setAttribute('id', `${card.id}`);

        if(card.classList.contains('selected') && card.id === heart.id) {
            card.classList.remove('selected');
            heartPath.setAttribute('d', 'M10 17C9.71527 17 9.44077 16.9015 9.22684 16.7224C8.41888 16.0475 7.63992 15.4132 6.95267 14.8536L6.94916 14.8507C4.93423 13.2102 3.19427 11.7935 1.98364 10.3979C0.630341 8.83778 0 7.35852 0 5.74252C0 4.17244 0.563507 2.72395 1.58661 1.66367C2.62192 0.590857 4.04251 0 5.58716 0C6.74164 0 7.79892 0.348712 8.72955 1.03637C9.19922 1.38348 9.62494 1.80829 10 2.3038C10.3752 1.80829 10.8008 1.38348 11.2706 1.03637C12.2012 0.348712 13.2585 0 14.413 0C15.9575 0 17.3782 0.590857 18.4135 1.66367C19.4366 2.72395 20 4.17244 20 5.74252C20 7.35852 19.3698 8.83778 18.0165 10.3978C16.8059 11.7935 15.0661 13.2101 13.0515 14.8504C12.363 15.4108 11.5828 16.0461 10.773 16.7227C10.5592 16.9015 10.2846 17 10 17ZM5.58716 1.11932C4.37363 1.11932 3.25882 1.58203 2.44781 2.42232C1.62476 3.2753 1.17142 4.45439 1.17142 5.74252C1.17142 7.10165 1.70013 8.31719 2.88559 9.68375C4.03137 11.0047 5.73563 12.3923 7.70889 13.9989L7.71255 14.0018C8.4024 14.5635 9.18442 15.2003 9.99832 15.8802C10.8171 15.199 11.6003 14.5612 12.2916 13.9986C14.2647 12.392 15.9688 11.0047 17.1146 9.68375C18.2999 8.31719 18.8286 7.10165 18.8286 5.74252C18.8286 4.45439 18.3752 3.2753 17.5522 2.42232C16.7413 1.58203 15.6264 1.11932 14.413 1.11932C13.524 1.11932 12.7078 1.38931 11.9872 1.92171C11.3449 2.39637 10.8975 2.99642 10.6352 3.41627C10.5003 3.63217 10.2629 3.76105 10 3.76105C9.73709 3.76105 9.49966 3.63217 9.36478 3.41627C9.10263 2.99642 8.65524 2.39637 8.01285 1.92171C7.29218 1.38931 6.47598 1.11932 5.58716 1.11932Z')       
            localStorage.removeItem(`${card.id}`);
                if(cell.id === card.id) {
                    favoriteForTablet.querySelector(`div[id="${cell.id}"]`).remove();
                    favorite.querySelector(`div[id="${cell.id}"]`).remove();

                }

         } else  if(!card.classList.contains('selected')){
             
            card.classList.add('selected');
            heartPath.setAttribute('d', 'M10 17C9.71527 17 9.44077 16.9015 9.22684 16.7224C8.41888 16.0475 7.63992 15.4132 6.95267 14.8536L6.94916 14.8507C4.93423 13.2102 3.19427 11.7935 1.98364 10.3979C0.630341 8.83778 0 7.35852 0 5.74252C0 4.17244 0.563507 2.72395 1.58661 1.66367C2.62192 0.590857 4.04251 0 5.58716 0C6.74164 0 7.79892 0.348712 8.72955 1.03637C9.19922 1.38348 9.62494 1.80829 10 2.3038C10.3752 1.80829 10.8008 1.38348 11.2706 1.03637C12.2012 0.348712 13.2585 0 14.413 0C15.9575 0 17.3782 0.590857 18.4135 1.66367C19.4366 2.72395 20 4.17244 20 5.74252C20 7.35852 19.3698 8.83778 18.0165 10.3978C16.8059 11.7935 15.0661 13.2101 13.0515 14.8504C12.363 15.4108 11.5828 16.0461 10.773 16.7227C10.5592 16.9015 10.2846 17 10 17Z')
            localStorage.setItem(`${card.id}`, 'true');
            cell.innerHTML = renderFavoriteJoke (currentId, currentTextValue, currentTimeValue);
            cellForTablet.innerHTML = renderFavoriteJoke (currentId, currentTextValue, currentTimeValue);
            favorite.append(cell);
            favoriteForTablet.append(cellForTablet);
         } 
    })  
})()


async function getJokeRandom() {
  const response = await fetch('https://api.chucknorris.io/jokes/random');
  const joke = await response.json();
  const cell = document.createElement('div');
  cell.innerHTML = renderJoke(joke);
  row.prepend(cell);
}


async function getJokeCategory() {

    let categoryId = document.querySelector('input[name="option"]:checked').value;
    const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${categoryId}`);
    const joke = await response.json();
    const cell = document.createElement('div');
    cell.innerHTML = renderJoke(joke);
    row.prepend(cell);
}


async function getCategory() {

    const response = await fetch('https://api.chucknorris.io/jokes/categories');
    const categoriesName = await response.json();
  
    categoriesName.forEach(categoryName => {
        const categoriesWrap = document.createElement('div');
        categoriesWrap.classList.add('wrap-category');
        categoriesWrap.innerHTML = `
                
                    <input type="radio" name="option" id="${categoryName}" value="${categoryName}"></input>
                    <label for="${categoryName}">${categoryName}</label>
                 `;
        listCategory.appendChild(categoriesWrap);   
    });  
return categoriesName;
}

async function getJokeSearch () {

    const response = await fetch (`https://api.chucknorris.io/jokes/search?query=${searchField.value}`)
    const data = await response.json();

    data.result.forEach(joke => {
        const cell = document.createElement('div');
        cell.innerHTML = renderJoke(joke);
        row.prepend(cell);
    });
}

function renderJoke(joke) {
  return   `<div class="joke" id="${joke.id}">
                <div class="heard-wrap">
                    <svg id="${joke.id}" width="20" height="17" fill="none" viewBox="0 0 20 17" xmlns="http://www.w3.org/2000/svg">
                        <path d="m10 17c-0.28473 0-0.55923-0.0985-0.77316-0.2776-0.80796-0.6749-1.5869-1.3092-2.2742-1.8688l-0.00351-0.0029c-2.0149-1.6405-3.7549-3.0572-4.9655-4.4528-1.3533-1.5601-1.9836-3.0394-1.9836-4.6554 0-1.5701 0.56351-3.0186 1.5866-4.0788 1.0353-1.0728 2.4559-1.6637 4.0006-1.6637 1.1545 0 2.2118 0.34871 3.1424 1.0364 0.46967 0.34711 0.89539 0.77192 1.2704 1.2674 0.3752-0.49551 0.8008-0.92032 1.2706-1.2674 0.9306-0.68766 1.9879-1.0364 3.1424-1.0364 1.5445 0 2.9652 0.59086 4.0005 1.6637 1.0231 1.0603 1.5865 2.5088 1.5865 4.0788 0 1.616-0.6302 3.0953-1.9835 4.6553-1.2106 1.3957-2.9504 2.8123-4.965 4.4526-0.6885 0.5604-1.4687 1.1957-2.2785 1.8723-0.2138 0.1788-0.4884 0.2773-0.773 0.2773zm-4.4128-15.881c-1.2135 0-2.3283 0.46271-3.1394 1.303-0.82305 0.85298-1.2764 2.0321-1.2764 3.3202 0 1.3591 0.52871 2.5747 1.7142 3.9412 1.1458 1.321 2.85 2.7086 4.8233 4.3152l0.00366 0.0029c0.68985 0.5617 1.4719 1.1985 2.2858 1.8784 0.81878-0.6812 1.602-1.319 2.2933-1.8816 1.9731-1.6066 3.6772-2.9939 4.823-4.3148 1.1853-1.3666 1.714-2.5821 1.714-3.9412 0-1.2881-0.4534-2.4672-1.2764-3.3202-0.8109-0.84029-1.9258-1.303-3.1392-1.303-0.889 0-1.7052 0.26999-2.4258 0.80239-0.6423 0.47466-1.0897 1.0747-1.352 1.4946-0.1349 0.2159-0.3723 0.34478-0.6352 0.34478-0.26291 0-0.50034-0.12888-0.63522-0.34478-0.26215-0.41985-0.70954-1.0199-1.3519-1.4946-0.72067-0.5324-1.5369-0.80239-2.4257-0.80239z" fill="#FF6767"/>
                    </svg>
                </div>
                <div class="d-flex">
                    <div class="sms-main">
                        <div class="sms">
                          <img src="img/sms.svg" alt="sms">
                          <img class="line1" src="img/line1.svg" alt="line1">
                          <img class="line2" src="img/line2.svg" alt="line2">
                          <img class="line3" src="img/line3.svg" alt="line3">
                        </div>
                    </div>
                    <div>
                        <div class="link-id">ID: <a href="#"> ${joke.id}</a><img class=img-id src="img/icon-open-page.svg" height="10"
                          weight="10">
                        </div>
                        <div class="joke-text">${joke.value}</div>
                        <div class="time-box"><span class="time">Last update: ${joke.created_at}</span>
                        ${renderCategoryField(joke)}
                        </div>
                    </div>
                </div>
            </div>`
}

function renderCategoryField(joke) {

       return joke.categories.length ? `
                <span class="wrap-category category">
                    <label class="category-joke">${joke.categories}  
                        <input type="radio" name="option" value="${joke.categories}">
                    </label>
                </span>
              ` : '';
}

function renderFavoriteJoke (id, text, time) {
    return `
    
        <div class="heard-wrap heard-wrap-favor">
            <svg width="20" height="17" fill="none" viewBox="0 0 20 17" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 17C9.71527 17 9.44077 16.9015 9.22684 16.7224C8.41888 16.0475 7.63992 15.4132 6.95267 14.8536L6.94916 14.8507C4.93423 13.2102 3.19427 11.7935 1.98364 10.3979C0.630341 8.83778 0 7.35852 0 5.74252C0 4.17244 0.563507 2.72395 1.58661 1.66367C2.62192 0.590857 4.04251 0 5.58716 0C6.74164 0 7.79892 0.348712 8.72955 1.03637C9.19922 1.38348 9.62494 1.80829 10 2.3038C10.3752 1.80829 10.8008 1.38348 11.2706 1.03637C12.2012 0.348712 13.2585 0 14.413 0C15.9575 0 17.3782 0.590857 18.4135 1.66367C19.4366 2.72395 20 4.17244 20 5.74252C20 7.35852 19.3698 8.83778 18.0165 10.3978C16.8059 11.7935 15.0661 13.2101 13.0515 14.8504C12.363 15.4108 11.5828 16.0461 10.773 16.7227C10.5592 16.9015 10.2846 17 10 17Z" fill="#FF6767"/>
            </svg>
        </div>
        <div class="d-flex">
            <div class="sms-main sms-main-favorite background-color">
              <div class="sms">
                <img src="img/sms.svg" alt="sms">
                <img class="line4" src="img/line1.svg" alt="line1">
                <img class="line5" src="img/line2.svg" alt="line2">
                <img class="line6" src="img/line3.svg" alt="line3">
              </div>
            </div>
            <div>
                <div class="link-id">ID: <a href="#">${id} </a> <img class=img-id src="img/icon-open-page.svg" height="10"
                    weight="10"></div>
                <div class="joke-text favorite-text">${text}</div>
                <div class="time-box">${time}
                </div>
            </div>
        </div>
   `
}