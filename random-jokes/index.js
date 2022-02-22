console.log("1.Оценка - 70 балла(ов)\n2.Все пункты выполнены полностью!")

const quters = document.querySelector('.quoter_inner')
const author = quters.querySelector('.quoter__author')
const btn = quters.querySelector('.quoter__btn')
const quoteDisplay = quters.querySelector('.quoter__display')
const lgRu = quters.querySelector('.checkbox')
let quotes
let autho

 function lgToggle() {
    lgRu.classList.toggle('active')
}


function lgIs(){
    if (lgRu.classList.contains('active')){
        quotes = 'dataRU.json'
        autho = 'Автор'
   }
   else {
        quotes = 'data.json'
        autho = 'Author'
   }
}

async function getQuotes() {
    lgIs()
    const res = await fetch(quotes);
    const data = await res.json();
    shouData(data)
  }
getQuotes()


function shouData(data){
    let randomNumber = Math.floor(Math.random() * data.length)
    quoteDisplay.innerHTML = `"${data[randomNumber].text}"`
    author.innerHTML = `${autho}: ${data[randomNumber].author}`
    if(data[randomNumber].author == null){author.innerHTML = `${autho}: ???`}

}


function randomBg(){ //dark color onli
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10)     
    }           
    document.documentElement.style.setProperty('--bg-color', `${color}`)
}

btn.addEventListener('click',getQuotes)
btn.addEventListener('click',randomBg)
lgRu.addEventListener("click",lgToggle)
lgRu.addEventListener("click",getQuotes)

















