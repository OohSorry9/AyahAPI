const MatnElement = document.getElementById('matn')
const TranslationElement = document.getElementById('translation')
const engVerseInfo = document.getElementById('verseInfoEnglish')
const arbVerseInfo = document.getElementById('verseInfoArabic')
const button = document.getElementById('init')
const matnloader = document.getElementById('matnLoader')
const translationLoader = document.getElementById('translationLoader')


//Enviornmental Variables

let matnloaded = false;
let translationloaded = false;


button.addEventListener('click', init)


function init(){


    matnloaded = false;
    translationloaded = false;
    TranslationElement.innerText = ' '
    MatnElement.innerText = ' '
    arbVerseInfo.innerText = 'loading ayah'
    engVerseInfo.innerText = 'loading translation'


    if(!matnloaded) matnloader.classList.remove('hidden')
    if(!translationloaded) translationLoader.classList.remove('hidden')
    setTimeout(getVerses,1000)

}



function getVerses(){

    const random = Math.floor(Math.random() * 6000)
    const reference = random
    const matnURL = `https://api.quran.com/api/v4/quran/verses/uthmani`
    const translate = `https://api.alquran.cloud/v1/ayah/${reference + 1}/en.asad`


    fetch(matnURL).then(res => {
        res.json()
            .then(data => {
    
                let arrayData = Array.from(data.verses)
                let verse = arrayData[reference]
                matnloader.classList.add('hidden')
                MatnElement.innerText = verse.text_uthmani;
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





