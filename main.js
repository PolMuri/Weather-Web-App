const api = {
    //la clau que ens han donat i la url de la api
    key: '1e424e189616344992363ad081adfbe6',
    url: 'https://api.openweathermap.org/data/2.5/weather'
}

const card = document.getElementById('card');
//hem de posar id a index html per poder obtenirlos aquí en javascript
//per obtenir els id:
const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

//li passem l'id de search form
const searchform = document.getElementById('search-form');
//volem obtenir l'informacio dels searchbox
const searchbox = document.getElementById('searchbox');
//a aquest form quan hi ha un event vamos a correr una funcio
searchform.addEventListener('submit', onSubmit, true);

//Creem la funcio de OnSubmit que rep un event
function onSubmit(event) {
    //important el preventDefault perquè no faci una 
    //redenderització de la p+àgina quan perdem el submit
    event.preventDefault();
    //posem la informació de dins el searchbox,és a dir, si escric barcelona i apreto, sortirà barcelona
    search(searchbox.value);
}

//basat en la temperatura, posem una imatge o una altra
function updateImages(data){
    const temp = toCelsius(data.main.temp);
    let src='images/temp-mid.png';
    if(temp>=30){
      src= 'images/temp-high.png';
    }else if(temp<20) {
      src='images/temp-low.png';
    }
    tempImg.src=src;
}

//funció que ens permetrà treure la informació de la api
async function search(query) {
    try {
        //fetch per obtenir la informació
        //agafem la url per buscar, la q per buscar el pais o ciutat i a 
        //part li passem la clau de l'api i el llenguatge que és espanyol
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        //per obtenir la data
        const data = await response.json();
        //amb l'id card fem que no surti el card amb la info fins que no busquem
        //la primera ciutat
        card.style.display = 'block';
        //per assegurarnos que la data est`s sent passada
        //anem a remplaçar les dades que tenim per les que ens dona la api
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        date.innerHTML = (new Date()).toLocaleDateString();
        temp.innerHTML = `${toCelsius(data.main.temp)}c`;
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `${toCelsius(data.main.temp_min)}c / ${toCelsius(data.main.temp_max)}c`;
        //basat en la temperatura, posem una imatge o una altra
        updateImages(data);
    } catch (err) {
        console.log(err);
        alert('HO SENTIM, hi ha hagut un ERROR!!')
    }
}

function toCelsius (kelvin) {
    return Math.round(kelvin - 273.15);
}



