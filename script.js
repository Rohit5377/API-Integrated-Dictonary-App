const form=document.querySelector('form');
const resultDiv= document.querySelector('.result');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) =>{
    try{
        resultDiv.innerHTML ="Fetching data......";
        
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`); 
    const data= await response.json();
    resultDiv.innerHTML = 
    ` <h2><strong>Word:</strong>${data[0].word}</h2>
    <p class="paertofspeech">${data[0].meanings[0].partOfSpeech}<p>
    <p><strong>Meaning:</strong>${data[0].meanings[0].definitions[0].definition === undefined? "Not found": data[0].meanings[0].definitions[0].definition}<p>
    <p><strong>Example:</strong>${data[0].meanings[0].definitions[0].example === undefined? "Not found": data[0].meanings[0].definitions[0].example}<p>
    <p><strong>Antonyms:</strong>
    `;

//fetching antonyms
    let def= data[0].meanings[0].definitions[0];
    if(def.antonyms.length ===0){
        resultDiv.innerHTML += `<span>Not found</span>`; 
    }
    for(let i=0; i<def.antonyms.length;i++ ){
        resultDiv.innerHTML += `<li>${def.antonyms[i]}</li>`
    }
    //Adding Read more link
    resultDiv.innerHTML +=`<div><a href="${data[0].sourceUrls}" style="text-decoration:none" target="_blank">Read more</a></div>`;
}
catch(error){
    resultDiv.innerHTML += `<p>Sorry, the word could not be found</p>`;
}
  
}