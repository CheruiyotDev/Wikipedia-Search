import getElement from './getElement.js';

const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const formDOM = getElement('.form');
const inputDOM = getElement('.form-input');
const resultsDOM = getElement('.results');

formDOM.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = inputDOM.value;
  if (!value) {
    resultsDOM.innerHTML = `<div class="error">please enter valid search term</div>`;
    return;
  }
  fetchPages(value);
});

const fetchPages = async (searchValue) => {
  resultsDOM.innerHTML = `<div class="loading"></div>`;
  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const results = data.query.search;
    if (results.length < 1) {
      resultsDOM.innerHTML = `<div class="error">No result matching results please try again...</div>`;
      return;
    }
    renderResults(results);
  } catch (error) {
    resultsDOM.innerHTML = `<div class="error">there was an error</div>`;
  }
};

const renderResults = (list) => {
  const cardList = list
    .map((item) => {
      const { title, snippet, pageid } = item;
      return `
          <a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
            <h4>${title}</h4>
            <p>
              ${snippet}
            </p>
          </a>
   `;
    })
    .join('');
  resultsDOM.innerHTML = `
  <div class="articles">
    ${cardList}
  </div>
  `;
};
