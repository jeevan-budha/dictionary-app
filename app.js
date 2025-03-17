const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");
// const form = document.querySelector('form');
// const form = document.querySelector('form');☻

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  getwordInfo(form.elements[0].value);
});

const getwordInfo = async (word) => {
  try {
    resultDiv.innerHTML =`<span class="loader"></span>`;
    const dictionaryAPi = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await fetch(dictionaryAPi);
    const finaData = await response.json();
    let definitions = finaData[0].meanings[0].definitions[0];
    resultDiv.innerHTML = `
  <h2><strong>Word:</strong> ${finaData[0].word}</h2>
  <p class="partofspeech">${finaData[0].meanings[0].partOfSpeech}</p>
  <p><strong>Meaning:</strong>${
    definitions.definition === undefined ? "Not Found" : definitions.definition
  }</p>
  <p><strong>Example:</strong>${
    definitions.example === undefined ? "Not Found" : definitions.example
  }</p>
  <p><strong>Antonyms:</strong></p>
  `;
  // console.log(finaData);
    //fetching antoyms
    if (definitions.antonyms.length === 0) {
      resultDiv.innerHTML += `<span> Not Found</span>`;
    } else {
      for (let i = 0; i < definitions.antonyms.length; i++) {
        resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`;
      }
    }

    //fetching synonyms
    resultDiv.innerHTML +=`<p><strong>Synonyms: </strong></p>`
    if(finaData[0].meanings[0].synonyms.length===0){
      resultDiv.innerHTML +=`<span>Not Foud</span>`
    }else{
      for(let j of finaData[0].meanings[0].synonyms){
        resultDiv.innerHTML += `<li>${j}</li>`
      }
    }
    // adding read more button
    resultDiv.innerHTML += `<div><a href ="${finaData[0].sourceUrls}" target ="_blank">ReadMore</a></div>`;
  } catch (error) {
    resultDiv.innerHTML =`<p>Sorry, the word could not be found</p>`
  }
};


