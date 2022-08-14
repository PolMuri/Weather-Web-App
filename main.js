const api = {
    //la clau que ens han donat i la url de la api
    key: '1e424e189616344992363ad081adfbe6',
    url: 'https://api.openweathermap.org/data/2.5/weather'
}

const card = document.getElementById('card');
//hem de posar id a index html per poder obtenirlos de l'html aquí en javascript
//per obtenir els id (o podrien ser class):
const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const temp = document.getElementById('temp');
const weather = document.getElementById('weatherType');
const range = document.getElementById('range');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const pressioAtmos = document.getElementById('pressioAtmos');
const sensaTermi = document.getElementById('sensaTermi');
const weatherImg = document.getElementById('weather-img');


//li passem l'id de search form
const searchform = document.getElementById('search-form');
//volem obtenir l'informacio dels searchbox
const searchbox = document.getElementById('searchbox');
//a aquest form quan hi ha un event hi farem anar una funcio

searchform.addEventListener('submit', onSubmit, true);

//Creem la funcio de OnSubmit que rep un event
function onSubmit(event) {
    //important el preventDefault perquè no faci una 
    //redenderització de la pàgina quan perdem el submit
    event.preventDefault();
    //posem la informació de dins el searchbox,és a dir, si escric barcelona i apreto, sortirà barcelona
    search(searchbox.value);
}

//basat en la temperatura, posem una imatge o una altra
function updateImages(data) {
    const temp = (data.main.temp);
    //variable que funciona a dins d'aquesta funció
    //let us permet declarar variables limitant el vostre abast (scope) al bloc, declaració,
    // o expressió on s'està usant.a diferència de la paraula clau var la qual defineix una
    // variable global o local en una funció sense importar l'àmbit del bloc. L'altra 
    //diferència entre var i let és que aquest darrer s'inicialitza a un valor només quan un 
    //analitzador ho avalua
    let src = 'images/temp-mid.png';
    if (temp >= 30) {
        src = 'images/temp-high.png';
    } else if (temp < 18) {
        src = 'images/temp-low.png';
    }
    //me l'injectes aquí
    tempImg.src = src;
}

//depenent del temps que faci, posem una imatge o una altra
function updateWeatherImage(data) {
    //les dades tretes d'aquí, que em doenn les categories generals del temps
    //i hi veig si és categoria de pluja, núvols , etc per posar l'icone corresponent
    const weatherIcon = (data.weather[0].main);
    //les dades tretes per categoria, però no per nom com la variable anterior, si no per id
    //ja que hi ha una categoria general de temps que les seves subcatgeories tenen noms diferents
    //a la categoria general i ho haig de fer per id llavors, que cada una de les subcategories té el seu
    const weatherIconID = (data.weather[0].id);
    if (weatherIcon == 'Thunderstorm') {
        src = 'images/storm.png';
    } else if (weatherIcon == 'Clear') {
        src = 'images/sun.png';
    } else if (weatherIcon == 'Clouds') {
        src = 'images/clouds.png';
    } else if (weatherIcon == 'Drizzle') {
        src = 'images/drizzle.png';
    } else if (weatherIcon == 'Rain') {
        src = 'images/rain.png';
    } else if (weatherIcon == 'Snow') {
        src = 'images/snow.png';
        //hi podria o hauria d'haver posat un else
    } else if (weatherIconID == 701 || 711 || 721 || 731 || 741 || 751 || 761 || 762 || 771 || 781) {
        src = 'images/foggy.png';
    }
    //m'injecta la imatge aquí de l'HTML, que és weather.img per el seu ID
    weatherImg.src = src;
}

function backImage(data) {
    //trec les dades per saber el temps general que fa sense grans concrecions i ho guardo a una variable (backUrl)
    const backUrl = (data.weather[0].main);
    //ara depenent del temps qeu faci tindrem una foto de background o una altra
    if (backUrl == 'Thunderstorm') {
        document.getElementById("card").style.backgroundImage = "url('images/tempesta.png')";
    } else if (backUrl == 'Clear') {
        document.getElementById("card").style.backgroundImage = "url('images/sol.png')";
    } else if (backUrl == 'Clouds') {
        document.getElementById("card").style.backgroundImage = "url('images/nuvols.png')";
    } else if (backUrl == 'Drizzle') {
        document.getElementById("card").style.backgroundImage = "url('images/pluja.png')";
    } else if (backUrl == 'Rain') {
        document.getElementById("card").style.backgroundImage = "url('images/pluja.png')";
    } else if (backUrl == 'Snow') {
        document.getElementById("card").style.backgroundImage = "url('images/neu.png')";
        //hi podria o hauria d'haver posat un else
    } else if (backUrl == 701 || 711 || 721 || 731 || 741 || 751 || 761 || 762 || 771 || 781) {
        document.getElementById("card").style.backgroundImage = "url('images/boira.png')";
    }
}
//natejem el nom de la ciutat buscada, així ho deixem llest per buscar la següent
const clearName = () => {
    searchbox.value = "";
}

//a l'html hi ha l'onchange al select, que dirigeix a la funcio selectIdiom

function selectIdiom() {
    //extreiem per id del select (Llenguatges) les dades
    //el .value és perquè són les dades de l'apartat value del select a l'html
    //creo la variable idioma on hi guardo les dades del select-option-value
    //ara les dades de dins el value de l'html les tinc a idioma
    let idioma = document.getElementById("Llenguatges").value;

    //ara li passo idioma al switch(que com diu la variable guarden l'idioma tret de value)

    //creo la variable idiomaFetch,i li guardo un idioma o un altre per el fetch a l'hora de fer la crida de l'api
    //depenent del case que li arribi per idioma ( a idioma s'hi guarda el value del select, que
    // és el que posem al case)
    let idiomaFetch;
    switch (idioma) {
        case 'Català':
            idiomaFetch = 'ca'
            //agafo l'element amb l'id searchbox (que és el buscador), accedeixo a .placeholder
            //i a dins depenent de l'idioma amb el qual s'estigui apareixerà a la barra de búsqueda 
            //una cosa o una altra
            document.getElementById("searchbox").placeholder = "Busca una localitat: ";
            break;

        case 'Español':
            idiomaFetch = 'es'
            document.getElementById("searchbox").placeholder = "Busca una localidad: ";
            break;

        case 'English':
            idiomaFetch = 'en'
            document.getElementById("searchbox").placeholder = "Search for a location: ";
            break;
    }
    return idiomaFetch;

}

async function search(cityName) {

    try {
        //fetch per obtenir la informació
        //agafem la url per buscar, la q per buscar el pais o ciutat i a 
        //part li passem la clau de l'api i l'idioma amb la funcio selectIdiom(),
        const response = await fetch(`${api.url}?q=${cityName}&appid=${api.key}&lang=${selectIdiom()}&units=metric`);

        //per obtenir la data
        const data = await response.json();
        //amb l'id card fem que no surti el card amb la info fins que no busquem
        //la primera ciutat
        card.style.display = 'block';
        //per assegurarnos que la data està sent passada
        //anem a remplaçar les dades que tenim per les que ens dona la api
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        date.innerHTML = (new Date()).toLocaleDateString();
        temp.innerHTML = `${(data.main.temp)}º`;
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `Temp min/mx: ${(data.main.temp_min)}c / ${(data.main.temp_max)}c`;
        humidity.innerHTML = `Hum: ${data.main.humidity}%`;
        wind.innerHTML = `Vel : ${data.wind.speed} Met./seg.`;
        pressioAtmos.innerHTML = `Pres. Atmos: ${data.main.pressure} hPa`;
        sensaTermi.innerHTML = `Sens. Term: ${data.main.feels_like}º`;



        //basat en la temperatura, posem una imatge o una altra
        //i el mateix amb el temps que faci i amb això li posaré també una imatge de fons o una altra
        updateImages(data);
        updateWeatherImage(data)
        backImage(data)
        //natejem el nom de la ciutat buscada amb aquesta funció
        clearName();
    } catch (err) {
        console.log(err);
        //El missatge d'alerta que apareix a la pantalla/navegador quan algú posa dades incorrectes
        alert('HI HA HAGUT UN ERROR! POSA UN NOM VÀLID!');
    }
}

//convertim la temperatura a Celsius
//funció que utilitzava quan no sabia que les dades de l'API ja es podien cridar en Celsius
//function toCelsius (kelvin) {
    //return Math.round(kelvin - 273.15);
//} 









