const MatnElement = document.getElementById('matn')
const TranslationElement = document.getElementById('translation')
const engVerseInfo = document.getElementById('verseInfoEnglish')
const arbVerseInfo = document.getElementById('verseInfoArabic')
const button = document.getElementById('init')
const matnloader = document.getElementById('matnLoader')
const translationLoader = document.getElementById('translationLoader')
const recite = document.getElementById('recite')
const pause = document.getElementById('pause')


//Enviornmental Variables

let matnloaded = false;
let translationloaded = false;
let isPlaying = false
let ayahNum;
let recitation = new Audio()


button.addEventListener('click', init)
recite.addEventListener('click', () =>{
    togglePlay(recitation)
})
pause.addEventListener('click', ()=>{
    togglePause(recitation)
})


function init(){


    matnloaded = false;
    translationloaded = false;
    TranslationElement.innerText = ' '
    MatnElement.innerText = ' '
    arbVerseInfo.innerText = 'loading ayah'
    engVerseInfo.innerText = 'loading translation'
    togglePause(recitation)

    if(!matnloaded) matnloader.classList.remove('hidden')
    if(!translationloaded) translationLoader.classList.remove('hidden')
    setTimeout(getVerses,1000)

}



function getVerses(){

    const random = Math.floor(Math.random() * 6000)
    const reference = random
    const matnURL = `https://api.quran.com/api/v4/quran/verses/uthmani`
    const translate = `http://api.alquran.cloud/v1/ayah/${reference + 1}/en.asad`


    fetch(matnURL).then(res => {
        res.json()
            .then(data => {
    
                let arrayData = Array.from(data.verses)
                let verse = arrayData[reference]
                matnloader.classList.add('hidden')
                MatnElement.innerText = verse.text_uthmani;
                console.log(verse)
                console.log(verse.id)
                ayahNum = verse.id
            })
    })

    fetch(translate).then(res => {
        res.json()
            .then(data => {
    
                let data2 = data.data
                
                translationLoader.classList.add('hidden')
                TranslationElement.innerText = `"` + data2.text + `"`;
                arbVerseInfo.innerText = data2.surah.name + ` | | ` + data2.numberInSurah;
                engVerseInfo.innerText = `Surah: ` + data2.surah.englishName + ` | | ` + data2.numberInSurah;
                
            })

    })

    
}

function update(){
    requestAnimationFrame(update)
    console.log('audio playback is ' + isPlaying)
}

update()


function togglePlay(audio){

    isPlaying = false
    audio.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahNum}.mp3`



        
    audio.onplay = () =>{
        isPlaying = true
    }


    if(isPlaying){
        audio.pause()

    }else{
        audio.play()
        
    }
}

function togglePause(audio){
    if(!isPlaying) return
    audio.pause()
}