
const api = {
    //L'API key d'openweathermap i la url de l'api
    key: '1e424e189616344992363ad081adfbe6',
    url: 'https://api.openweathermap.org/data/3.0/onecall'
}

//hem de posar id a index html per poder obtenirlos de l'html aquí en javascript
//per obtenir els id (o podrien ser class):
const card = document.getElementById('card');
const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const temp = document.getElementById('temp');
const weather = document.getElementById('weatherType');
const range = document.getElementById('range');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const pressioAtmos = document.getElementById('pressioAtmos');
//ara mateix no utilizo la sensació tèrmica
//const sensaTermi = document.getElementById('sensaTermi');
const weatherImg = document.getElementById('weather-img');
const weatherScript = document.getElementById('script');
const sunRiseSet = document.getElementById('sunRiseSet');

//appendChild() és un mètode de l'objecte Node en JavaScript que permet afegir un nou node com a darrer fill d'un node existent. 
//Això significa que, en aquest cas, l'element script creat dinàmicament s'afegirà com a darrer fill de l'element que es passa com a paràmetre, 
//que en aquest cas és el body del document. Això permet afegir elements dinàmicament al document HTML sense necessitat de 
//modificar el codi HTML original. 

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
    //la crida a la funció getWeatherByLocation es fa des de la funció onSubmit, que s'executa quan l'usuari envia el formulari, 
    //en aquesta crida, s'hi passa el valor que l'usuari ha escrit dins la casella de cerca, que es guarda a la variable searchbox.value
    //i es passa com a argument a la funció getWeatherByLocation(cityName)
    getWeatherByName(searchbox.value);
    //Funció per obtenir el temps dels propers 5 dies
    getWeatherByLocationFive(searchbox.value);
}

//Basat en la temperatura, posem una imatge o una altra
function updateImages(responseData) {
    const temp = (responseData.current.temp);
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

//depenent del temps que faci, posem una imatge o una altra com a icona que acompanya l'estat del temps
function updateWeatherImage(data) {
    // les dades tretes d'aquí, que em donen les categories generals del temps
    // i hi veig si és categoria de pluja, núvols , etc per posar l'icone corresponent
    // accedim a les dades del temps dins de l'objecte 'current'
    const weatherIcon = (data.current.weather[0].main);
    //les dades tretes per categoria, però no per nom com la variable anterior, si no per id
    //ja que hi ha una categoria general de temps que les seves subcatgeories tenen noms diferents
    //a la categoria general i ho haig de fer per id llavors, que cada una de les subcategories té el seu
    const weatherIconID = (data.current.weather[0].id);
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
    } else if (weatherIconID >= 701 && weatherIconID <= 781) {
        src = 'images/foggy.png';
    }
    //m'injecta la imatge aquí de l'HTML, que és weather.img per el seu ID
    weatherImg.src = src;
}

//Funció per eliminar l'animació de pluja quan no toca que hi sigui, eliminant tots els elements rain 
//del document HTML creats per fer l'animació de pluja
function removeRain() {
    //Declara una variable "elements" que conté tots els elements rain del document HTML 
    //utilitzant el mètode "getElementsByTagName" de l'objecte "document" i passant com a paràmetre "rain"
    let elements = document.getElementsByTagName("HR");
    //Utilitza un bucle "while" per iterar mentre hi hagi elements rain en la variable "elements"
    //A cada iteració del bucle, elimina l'element rain del document HTML utilitzant el mètode "removeChild" de 
    //l'objecte parent de l'element rain (element[0].parentNode) i passant com a paràmetre l'element rain (elements[0]).
    //El bucle torna a executar-se des de l'inici fins a que no quedi cap element rain en la variable "elements".
    //Així s'eliminaria tots els elements rain del document HTML.
    while (elements.length > 0) {
        //A cada iteració del while, l'element que es vol eliminar és sempre l'element que ocupa la primera posició. 
        //Això permet recórrer tots els elements de la llista, ja que a mesura que es van eliminant, 
        //la resta d'elements es mouen cap a l'esquerra i la següent iteració del bucle processa l'element següent que ara es troba a la primera posició de la llista.
        elements[0].parentNode.removeChild(elements[0]);
    }
}

//Funció per eliminar l'animació que genera la snow
function removeSnow() {
    let elements = document.getElementsByClassName("snow");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}


/* NO FUNCIONA, ja que una vegada s'ha cridat i executat un script, no se'l pot parar/eliminar

//CREO LA FUNCIÖ PER POSAR PLUJA O snow a mode d'animació
function animaciosnow() {   
    //ara depenent del temps que faci tindrem una animació o una altra
    //Es crea la variable "script" utilitzant la funció document.createElement("script") que crea un nou element en aquest cas script.
    const script = document.createElement("script");
    //S'establix la propietat src de l'element script creat anteriorment a la url des d'on es carregarà l'script extern "https://app.embed.im/snow.js"
    script.src = "https://app.embed.im/snow.js";
    //S'establix la propietat className de l'element script creat anteriorment a "script"
    script.className = "script";
    //El mateix que abans amb la propietat id
    script.id = "scriptsnow";
    //S'establix la propietat defer de l'element script creat anteriorment a true.
    script.defer = true;
    //S'afegeix l'element script creat a l'HTML utilitzant el mètode appendChild() i passant com a paràmetre l'element script creat anteriorment.
    document.body.appendChild(script);

}

function eliminarAnimacionsnow() {
    const script = document.getElementById("scriptsnow");
    document.body.removeChild(script);
}

*/

// Depèn del temps que faci posem una imatge de background o una altra
function backImage(data) {
    // Accedim al temps actual dins de l'objecte 'current'
    const currentWeather = data.current.weather[0];
    // Trec les dades per saber el temps general que fa sense grans concrecions i ho guardo a una variable (backUrl)
    const backUrl = currentWeather.main;
    const backUrlId = currentWeather.id;
    // Dic que el color del text és blanc (el mateix que al CSS)
    document.getElementById("card").style.color = "rgb(224, 224, 230)";
    //La funció "eliminarAnimacionsnow()" només es crida si hi ha un element 
    //amb l'id "scriptsnow" i s'eviten problemes amb la càrrega de la imatge de fons.
    //A partir de la segona vegada que es busquiun lloc es borrarà (si cal) l'animació de la snow

    //ara depenent del temps que faci tindrem una foto de background o una altra
    if (backUrl == 'Thunderstorm') {
        removeSnow();
        //Perquè no es solapin les animacions de pluja si es van buscant llocs
        // de forma consecutiva a on plogui, elimino l'animació de snow sempre, i després la creo
        removeRain();
        document.getElementById("card").style.backgroundImage = "url('images/tempesta.webp')";
        //ANIMACIÓ DE PLUJA EXPLICADA
        //Es crea una variable anomenada "rainElement" per a ser utilitzada per a crear cada gota de pluja.
        let rainElement;
        //Es crea una variable anomenada "comptador" i es defineix com 10.
        //Aquesta variable es utilitza per a determinar quantes gotes de pluja es crearan.
        let comptador = 10;
        //Es crea una variable anomenada "espaiament" i es defineix com la amplada de la 
        //finestra del navegador dividit pel comptador. Aquesta variable es utilitzada per 
        //a determinar l'espai entre cada gota de pluja.
        let espaiament = window.innerWidth / comptador;
        //Es crea un bucle "for" que itera fins a quan i és més petit que el comptador.
        for (let i = 0; i < comptador; i++) {
            //Dins del bucle, es crea una nova gota de pluja utilitzant la variable 
            //"rainElement" i es fa servir el mètode "createElement" per crear un element rain.
            rainElement = document.createElement('HR');
            //S'estableix la posició de la gota de pluja en l'eix X utilitzant la variable 
            //"espaiament" per calcular la posició correcta.
            rainElement.style.left = (i * espaiament) + 'px';
            //S'estableix la durada de l'animació de la gota de pluja utilitzant la 
            //funció "Math.random" per generar un valor aleatori entre 0,3 i 0,6 segons.
            rainElement.style.animationDuration = 0.3 + Math.random() * 0.6 + 's';
            //Per canviar la durada de l'animació, si la vull fer més ràpida haig de baixar els valors de
            //animationDuration i pujar els de animationDelay
            rainElement.style.animationDelay = Math.random() * 4 + 's';
            //S'afegeix l'element "rain" al document mitjançant el mètode "appendChild".
            document.body.appendChild(rainElement);
        }
    } else if (backUrl == 'Clear') {
        removeSnow();
        removeRain();
        document.getElementById("card").style.backgroundImage = "url('images/cel clar.webp')";
    } else if (backUrl == 'Clouds') {
        removeSnow();
        removeRain();
        //Si l'id del temps és el següent vol dir que hi ha pocs núvols (few clouds: 11-25%) i per tant poso una imatge que es correspongui
        if (backUrlId == 801) {
            document.getElementById("card").style.backgroundImage = "url('images/lleugerament ennuvolat.webp')";
            //Pinto el text de color negre perquè es vegi bé amb aquesta imatge
            document.getElementById("card").style.color = "#01081d";
            //Núvols del 26-50%
        } else if (backUrlId == 802) {
            document.getElementById("card").style.backgroundImage = "url('images/nuvolositat variable.webp')";
            document.getElementById("card").style.color = "#01081d";
        } else {
            document.getElementById("card").style.backgroundImage = "url('images/nuvols.webp')";
            document.getElementById("card").style.color = "#01081d";
        }
    } else if (backUrl == 'Drizzle') {
        removeSnow();
        removeRain();
        document.getElementById("card").style.backgroundImage = "url('images/pluja.webp')";
        let rainElement;
        let comptador = 10;
        let espaiament = window.innerWidth / comptador;
        for (let i = 0; i < comptador; i++) {
            rainElement = document.createElement('HR');
            rainElement.style.left = (i * espaiament) + 'px';
            rainElement.style.animationDuration = 0.3 + Math.random() * 0.6 + 's';
            rainElement.style.animationDelay = Math.random() * 4 + 's';
            document.body.appendChild(rainElement);
        }

    } else if (backUrl == 'Rain') {
        removeSnow();
        removeRain();
        document.getElementById("card").style.backgroundImage = "url('images/pluja.webp')";
        let rainElement;
        let comptador = 10;
        let espaiament = window.innerWidth / comptador;
        for (let i = 0; i < comptador; i++) {
            rainElement = document.createElement('HR');
            rainElement.style.left = (i * espaiament) + 'px';
            rainElement.style.animationDuration = 0.3 + Math.random() * 0.6 + 's';
            rainElement.style.animationDelay = Math.random() * 4 + 's';
            document.body.appendChild(rainElement);
        }

    } else if (backUrl == 'Snow') {
        removeRain();
        removeSnow();
        document.getElementById("card").style.backgroundImage = "url('images/neu.webp')";
        //FUNCIÓ CREACIÓ ANIMACIÓ DE snow EXPLICADA
        //Crea 15 flocs de snow que apareixen en una posició aleatòria de la pantalla, 
        //amb una animació de caure i una duració i delay aleatori, i una vegada finalitza la animació es crea un de nou.

        //La primera línia declara una variable "snowElement" que es utilitzarà per crear cada 
        //element DIV que representarà un floc de snow.
        let snowElement;
        //És la quantitat de flocs de snow que es crearan.
        let comptador = 28;

        //Funció que crea cada floc de snow
        function createSnow() {
            //Es crea un element DIV utilitzant el mètode "createElement" de l'objecte "document" i passant com a paràmetre "DIV".
            snowElement = document.createElement('DIV');
            //Utilitzant el mètode "classList.add" s'afegeix la classe "snow" a l'element DIV creat anteriorment.
            snowElement.classList.add('snow');
            //Utilitzant l'objecte style es assigna una posició aleatòria en l'eix x i en l'eix y a l'element DIV.
            snowElement.style.left = Math.floor(Math.random() * window.innerWidth) + 'px';
            snowElement.style.top = Math.floor(Math.random() * window.innerHeight) + 'px';
            //Utilitzant l'objecte l'style es defineix l'animació que es farà sobre 
            //l'element DIV, en aquest cas es defineix l'animació "cauresnow" que s'ha de definir en el CSS (@keyframes)
            snowElement.style.animationName = 'snowing';
            //Utilitzo l'style per definir la duració d'animació entre 5s i 10s i un delay entre 0s i 5s.
            snowElement.style.animationDuration = (13 + Math.random() * 90) + 's';
            //Afegint un event listener al element DIV, es detecta quan l'animació finalitza, 
            //esborrant així l'element i creant un de nou.
            snowElement.addEventListener('animationend', function () {
                this.remove();
                createSnow();
            });
            //Finalment s'afegeix l'element DIV al document HTML 
            //utilitzant el mètode "appendChild" de l'objecte "body" i passant com a paràmetre l'element DIV.
            document.body.appendChild(snowElement);

        }

        //La segona part del codi és un bucle "for" que executa la funció "createSnow" 15 vegades 
        //( el valor del comptador en aquest cas concret)
        for (let i = 0; i < comptador; i++) {
            createSnow();
        }

        //hi podria o hauria d'haver posat un else
    } else if (backUrl == 701 || 711 || 721 || 731 || 741 || 751 || 761 || 762 || 771 || 781) {
        removeSnow();
        removeRain();
        document.getElementById("card").style.backgroundImage = "url('images/boira.webp')";
    }
}

//natejem el nom de la ciutat buscada, així ho deixem llest per buscar la següent
const clearName = () => {
    searchbox.value = "";
}

//A l'html hi ha l'onchange al select, que dirigeix a la funcio selectIdiom
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
            idiomaFetch = 'ca';
            //Agafo l'element amb l'id searchbox (que és el buscador), accedeixo a .placeholder 
            //(el .placeholder és una propietat de l'objecte input en HTML que es pot accedir i modificar mitjançant JavaScript. 
            //Amb aquesta propietat es pot canviar el text que apareix dins d'un quadre d'entrada quan aquest està buit i no s'ha escrit encara cap valor)
            //i a dins depenent de l'idioma amb el qual s'estigui apareixerà a la barra de búsqueda 
            //una cosa o una altra
            document.getElementById("searchbox").placeholder = "Busca una població ";
            //Canviar l'idioma del footer depenent de l'idioma que es seleccioni
            document.getElementById("creatorText").innerHTML = "Creat per <a href='https://www.linkedin.com/in/pol-murillas-ledesma-29b23b241/'>Pol Murillas Ledesma</a>";
            //Agafo l'id posat a l'html d'aquesta part del footer per modificar-la amb JS depenent de l'idioma seleccionat
            document.getElementById("dataText").innerHTML = "Dades d' <a href='https://openweathermap.org/'>OpenWeather</a>";
            break;

        case 'Español':
            idiomaFetch = 'es';
            //He decidit utilitzar aquesta sintaxi, però també es podria utilitzar: document.getElementById("searchbox").setAttribute("placeholder", "Busca una población: ");
            //a sintaxi .setAttribute("placeholder", "Busca una población: ") és una manera més general d'afegir o modificar atributs en un element HTML a través de JavaScript. 
            //Significa que es pot utilitzar per a qualsevol atribut, no només per a "placeholder". Per contra, la sintaxi .placeholder = "Busca una población: " és una forma més 
            //curta i específica per a modificar el valor de l'atribut "placeholder" en un element HTML, ja que el navegador té una propietat que li correspon específicament.
            //La informació que he trobat diu que es recomana usar .setAttribute per a la compatibilitat entre navegadors, mentre que .placeholder és més còmode per a aplicacions web modernes.
            document.getElementById("searchbox").placeholder = "Busca una población ";
            document.getElementById("creatorText").innerHTML = "Creado por <a href='https://www.linkedin.com/in/pol-murillas-ledesma-29b23b241/'>Pol Murillas Ledesma</a>";
            document.getElementById("dataText").innerHTML = "Datos de <a href='https://openweathermap.org/'>OpenWeather</a>";
            break;

        case 'English':
            idiomaFetch = 'en';
            document.getElementById("searchbox").placeholder = "Search for a location ";
            document.getElementById("creatorText").innerHTML = "Created by <a href='https://www.linkedin.com/in/pol-murillas-ledesma-29b23b241/'>Pol Murillas Ledesma</a>";
            document.getElementById("dataText").innerHTML = "Powered by <a href='https://openweathermap.org/'>OpenWeather</a>";
            break;
    }
    return idiomaFetch;

}

//options: és un objecte que conté les opcions per a la funció 
const options = {
    //indica si s'ha d'utilitzar una alta precisió (true) o no (false)
    enableHighAccuracy: true,
    //timeout indica el temps en mil·lisegons que esperarà per obtenir les dades de geolocalització. 
    timeout: 5000,
    //maximumAge indica la quantitat de temps en mil·lisegons que es pot retornar les dades de geolocalització que s'han obtingut previament.
    maximumAge: 0
};

//getLocationSuccess: aquesta funció és cridada si s'obtenen les dades de geolocalització amb èxit. 
//L'argument de la funció és un objecte pos que conté les dades de geolocalització, incloent les coordenades de latitud i longitud.
function getLocationSuccess(pos) {
    const crd = pos.coords;
    //Per consola es mostren les dades també 
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    //A continuació, la funció getLocationSuccess crida aquesta funció GetWeatherByCoordsFive amb la latitud i longitud obtingudes per obtenir el temps
    GetWeatherByCoordsFive(crd.latitude, crd.longitude);
}

//error: aquesta funció és cridada si hi ha un error en obtenir les dades de geolocalització. L'argument de la funció és un 
//objecte err que conté informació sobre l'error.
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

//L'Event Listener: document.getElementById("getLocation").addEventListener("click", function() { ... }: aquesta línia assigna a 
//un event listener al botó amb id "getLocation". Quan l'usuari cliqui aquest botó, es cridarà la funció navigator.geolocation.getCurrentPosition 
//amb les opcions especificades a options, les funcions GetWeatherByCoords i error com a arguments, i es passaran les dades obtingudes a la funció GetWeatherByCoords.
document.getElementById("getLocation").addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(GetWeatherByCoords, error, options);
});

/* és un esdeveniment d'onclick que s'afegeix a l'element amb l'identificador "getLocation" a 
través de la funció addEventListener(). Quan l'usuari fa clic en aquest element, es crida la funció getLocation().*/
document.getElementById("getLocation").addEventListener("click", function () {
    getLocation();
});

/* La funció getLocation() utilitza la API de geolocalització del navegador per obtenir les coordenades de l'usuari mitjançant la funció getCurrentPosition(). 
El resultat és passat com a argument a la funció getLocationSuccess(), que tracta les dades de geolocalització i actualitza la informació del temps per aqust lloc.*/
function getLocation() {
    navigator.geolocation.getCurrentPosition(getLocationSuccess);
}



//La funció formatSunRiseSetHour accepta dos arguments: sunrise i sunset
function formatSunRiseSetHour(sunrise, sunset) {
    //sunriseTime i sunsetTime són variables creades per emmagatzemar el valor dels arguments sunrise i sunset convertits a objectes de data.
    //La multiplicació per 1000 converteix el temps Unix a mil·lisegons, que és el format que utilitza el constructor de Date() per crear un objecte de data. 
    //Per tant aquí la variable const sunriseTime = new Date(sunrise * 1000); crea un objecte de data a partir del valor de sunrise que està en format Unix Time(convertit a mil·lisegons)
    const sunriseTime = new Date(sunrise * 1000);
    const sunsetTime = new Date(sunset * 1000);

    //Les variables formattedSunrise i formattedSunset es declaren per emmagatzemar les hores de sortida del sol i posta del sol formatades.
    let formattedSunrise, formattedSunset;
        //les hores formatades s'assignen utilitzant el mètode toLocaleTimeString() de l'objecte de data,
        //que formata l'hora segons les convencions d'idioma i regió de l'usuari.
        formattedSunrise = `${sunriseTime.toLocaleTimeString()} h`;
        formattedSunset = `${sunsetTime.toLocaleTimeString()} h`;
 

    return {
        //La funció retorna un objecte que conté les propietats formattedSunrise i formattedSunset que contenen les hores formatades de sortida del sol i posta del sol, respectivament.
        formattedSunrise,
        formattedSunset
    }
}

// Obtinc les dades meteorològiques per a les coordenades proporcionades per l'objecte pos que es passa com a paràmetre
// En resum, la funció GetWeatherByCoords(pos) és la que s'encarrega d'obtenir i mostrar les dades meteorològiques 
// basades en les coordenades de geolocalització rebudes de l'usuari a través de la funció getLocationSuccess(pos).
async function GetWeatherByCoords(pos) {
    try {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        // Obtenir el nom de la ciutat utilitzant les coordenades a través del Reverse Geocoding
        const reverseGeoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${api.key}`);
        const reverseGeoData = await reverseGeoResponse.json();

        // Assegura't que la crida a l'API va bé i que la resposta conté el nom de la ciutat
        if (reverseGeoData && reverseGeoData.length > 0 && reverseGeoData[0].name) {
            const cityName = reverseGeoData[0].name;

            // Obtenir les dades meteorològiques utilitzant les coordenades
            const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&lang=${selectIdiom()}&appid=${api.key}`);
            const responseData = await response.json();

            // Mostrar les dades a la interfície d'usuari
            card.style.display = 'block';
            city.innerHTML = cityName;
            date.innerHTML = (new Date()).toLocaleDateString();
            temp.innerHTML = `${(responseData.current.temp.toFixed(1))} ºC`;
            weather.innerHTML = responseData.current.weather[0].description;
            range.innerHTML = `Temp min/max: ${(responseData.daily[0].temp.min.toFixed(1))} ºC / ${(responseData.daily[0].temp.max.toFixed(1))} ºC`;
            humidity.innerHTML = `Hum: ${responseData.current.humidity}%`;
            wind.innerHTML = `Vel: ${responseData.current.wind_speed} Met./seg.`;
            pressioAtmos.innerHTML = `Pres. Atmos: ${responseData.current.pressure} hPa`;

            //primer declaro la variable idiomSun (amb el let ja que el seu valor es pot modificar posteriorment) que tindra el resultat que retorna la funció selectIdiom()
            let idiomSun = selectIdiom();
            //depenent de l'idioma que em retorni la funció selectIdiom escric quan surt i es pon el sol en un idioma o un altre
            if (idiomSun === 'ca') {
                //s'envien els valors data.sys.sunrise, data.sys.sunset a la funció formatSunRiseSetHour, aquesta processa aquests valors en format UNIX que contenen
                //la hora en que surt i es pon el sol, i la mateixa funció amb el .formattedSunrise o .formattedSunset retorna el valor caluclat en la funció formatSunRiseSetHour
                //que serà o bé la hora en que surt o es pon el sol en format comprensible (hores normals)
                //com es pot veure S'utilitza la notació de punt per accedir a les propietats formattedSunrise i formattedSunset de l'objecte retornat, 
                //que contenen les cadenes formatejades corresponents a l'hora que surt el sol i quan es pon, respectivament.
                sunRiseSet.innerHTML = `<img src="images/sunrise.png" alt="sunrise" class="RaiseSun-img"> Sortida del sol: ${formatSunRiseSetHour(responseData.current.sunrise, responseData.current.sunset).formattedSunrise}
                <img src="images/sunset.png" alt="sunset" class="RaiseSun-img"> Posta de sol:
                ${formatSunRiseSetHour(responseData.current.sunrise, responseData.current.sunset).formattedSunset}`;
            } else if (idiomSun === 'es') {
                sunRiseSet.innerHTML = `<img src="images/sunrise.png" alt="sunrise" class="RaiseSun-img">  Amanece a las: ${formatSunRiseSetHour(responseData.current.sunrise, responseData.current.sunset).formattedSunrise}
                <img src="images/sunset.png" alt="sunset" class="RaiseSun-img"> El ocaso a las:
                ${formatSunRiseSetHour(responseData.current.sunrise, responseData.current.sunset).formattedSunset}`;
            } else {
                sunRiseSet.innerHTML = `<img src="images/sunrise.png" alt="sunrise" class="RaiseSun-img"> The sunrise is : ${formatSunRiseSetHour(responseData.current.sunrise, responseData.current.sunset).formattedSunrise}
                <img src="images/sunset.png" alt="sunset" class="RaiseSun-img"> The sunset is :
                ${formatSunRiseSetHour(responseData.current.sunrise, responseData.current.sunset).formattedSunset}`;
            }

            // Basat en la temperatura, posem una imatge o una altra
            // i el mateix amb el temps que faci i amb això li posaré també una imatge de fons o una altra
            updateImages(responseData);
            updateWeatherImage(responseData);
            backImage(responseData);
            // Netejem el nom de la ciutat buscada amb aquesta funció
            clearName();
        } else {
            // Mostro a la consola que no es poden obtenir les dades per geolocalització així puc veure l'error
            console.error('The location name is incorrect or cannot be found.');
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

// Funció per processar les dades de previsió meteorològiques dels propers 5 dies i mostrar-les
function processWeatherDataFive(data) {
    // Recorre les dades meteorològiques per als propers 5 dies
    for (let i = 0; i < 5; i++) {
        // Obté i arrodoneix la temperatura mínima per al dia actual i la converteix en string amb una decimal
        // Utilitzem const perquè minTemp i maxTemps no canvien dins de l'iteració
        const minTemp = data.daily[i].temp.min.toFixed(1);
        // Obté i arrodoneix la temperatura màxima per al dia actual i la converteix en string amb una decimal
        const maxTemp = data.daily[i].temp.max.toFixed(1);
        // Actualitza el contingut HTML dels elements d'etiqueta "span" per mostrar la temperatura mínima i màxima
        document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + minTemp + "ºC";
        document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + maxTemp + "ºC";
       // Obté el codi de la icona del temps per al dia actual
        const iconCode = data.daily[i].weather[0].icon;
        // Obté l'element de la imatge corresponent a l'índex actual (del dia)
        const imgElement = document.getElementById("img" + (i + 1));
        // Assigna la icona corresponent basada en el codi de l'ícona proporcionat per l'API
        if (iconCode === "01d" || iconCode === "01n") {
            imgElement.src = "images/sun.png";
        } else if (iconCode === "02d" || iconCode === "02n") {
            imgElement.src = "images/few clouds.png";
        } else if (iconCode === "03d" || iconCode === "03n") {
            imgElement.src = "images/clouds.png";
        } else if (iconCode === "04d" || iconCode === "04n") {
            imgElement.src = "images/clouds.png";
        } else if (iconCode === "09d" || iconCode === "09n") {
            imgElement.src = "images/drizzle.png";
        } else if (iconCode === "10d" || iconCode === "10n") {
            imgElement.src = "images/rain.png";
        } else if (iconCode === "11d" || iconCode === "11n") {
            imgElement.src = "images/storm.png";
        } else if (iconCode === "13d" || iconCode === "13n") {
            imgElement.src = "images/snow.png";
        } else if (iconCode === "50d" || iconCode === "50n") {
            imgElement.src = "images/foggy.png";
        } else {
            //Per defecte: si el codi de l'icona no coincideix amb cap dels casos anteriors, es mostra una imatge de sol per defecte
            imgElement.src = "images/sun.png";
        }
    }
}

// Funció per obtenir les dades del temps pels propers 5 dies a partir de la geolocalització
function GetWeatherByCoordsFive(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${api.key}&units=metric`)
    .then(response => response.json())
    .then(data => {
        processWeatherDataFive(data); // Processar les dades de previsió del temps
    })
    .catch(err => alert("ERROR: Failed to get five days weather information"));
}

/* Funció asíncrona per fer la crida a l'API de geolocalització utilitzant el nom de la ciutat:
Aquesta funció és responsable d'obtenir les coordenades geogràfiques (latitud i longitud) d'una ciutat donada.
Fa una crida a l'API de geolocalització d'OpenWeatherMap utilitzant el nom de la ciutat.
Converteix la resposta en format JSON.
Comprova si s'ha obtingut alguna dada vàlida de geolocalització i retorna un objecte amb les coordenades de latitud i longitud. Si no es troben dades vàlides, retorna null.*/
async function getCoordinatesByCityName(cityName) {
    // Realitza una crida a l'API de geolocalització utilitzant el nom de la ciutat proporcionat
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api.key}`);
    // Espera la resposta de la crida i la converteix en format JSON
    const data = await response.json();
    // Comprova si s'ha obtingut alguna dada vàlida de geolocalització
    // Si s'ha obtingut, retorna un objecte amb les coordenades de latitud i longitud
    // Si no s'ha obtingut cap dada, retorna null
    return data.length > 0 ? { lat: data[0].lat, lon: data[0].lon } : null;
}

// Funció per obtenir el temps actual per una ubicació específica
async function getWeatherByName(cityName) {
    try {
        // Crida a la funció per obtenir les coordenades de la ciutat
        const coordinates = await getCoordinatesByCityName(cityName);

        if (coordinates) {
            const { lat, lon } = coordinates;
            // Ara pots fer servir aquestes coordenades per fer la crida a la nova API One Call 3.0
            // Exemple: getWeatherData(lat, lon);

            // fetch per obtenir la informació de l'API One Call 3.0
            const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&lang=${selectIdiom()}&appid=${api.key}`);
            const responseData = await response.json(); // Converteix la resposta a JSON

            // Amb l'id card fem que no surti el card amb la info fins que no busquem la primera ciutat
            card.style.display = 'block';

            // Substitueix les dades de la API 2.5 per les de la API 3.0
            city.innerHTML = cityName;
            date.innerHTML = (new Date()).toLocaleDateString();
            temp.innerHTML = `${(responseData.current.temp.toFixed(1))} ºC`;
            weather.innerHTML = responseData.current.weather[0].description;
            range.innerHTML = `Temp min/max: ${(responseData.daily[0].temp.min.toFixed(1))} ºC / ${(responseData.daily[0].temp.max.toFixed(1))} ºC`;
            humidity.innerHTML = `Hum: ${responseData.current.humidity}%`;
            wind.innerHTML = `Vel: ${responseData.current.wind_speed} Met./seg.`;
            pressioAtmos.innerHTML = `Pres. Atmos: ${responseData.current.pressure} hPa`;

            // Afegeixes la lògica per a l'hora dels sols
            let idiomSun = selectIdiom();
            if (idiomSun === 'ca') {
                sunRiseSet.innerHTML = `<img src="images/sunrise.png" alt="sunrise" class="RaiseSun-img"> Sortida del sol: ${formatSunRiseSetHour(responseData.current.sunrise, responseData.current.sunset).formattedSunrise}
                <img src="images/sunset.png" alt="sunset" class="RaiseSun-img"> Posta de sol:
                ${formatSunRiseSetHour(responseData.current.sunrise, responseData.current.sunset).formattedSunset}`;
            } else if (idiomSun === 'es') {
                sunRiseSet.innerHTML = `<img src="images/sunrise.png" alt="sunrise" class="RaiseSun-img">  Amanece a las: ${formatSunRiseSetHour(responseData.current.sunrise, responseData.current.sunset).formattedSunrise}
                <img src="images/sunset.png" alt="sunset" class="RaiseSun-img"> El ocaso a las:
                ${formatSunRiseSetHour(responseData.current.sunrise, responseData.current.sunset).formattedSunset}`;
            } else {
                sunRiseSet.innerHTML = `<img src="images/sunrise.png" alt="sunrise" class="RaiseSun-img"> The sunrise is : ${formatSunRiseSetHour(responseData.current.sunrise, responseData.current.sunset).formattedSunrise}
                <img src="images/sunset.png" alt="sunset" class="RaiseSun-img"> The sunset is :
                ${formatSunRiseSetHour(responseData.current.sunrise, responseData.current.sunset).formattedSunset}`;
            }

            // Basat en la temperatura, posem una imatge o una altra
            // i el mateix amb el temps que faci i amb això li posaré també una imatge de fons o una altra
            updateImages(responseData);
            updateWeatherImage(responseData);
            backImage(responseData);
            // Netejem el nom de la ciutat buscada amb aquesta funció
            clearName();
        } else {
            // Alert que avisa per pantalla quan no es troba la població o el nom posat és incorrecte 
            alert('The location name is incorrect or cannot be found.');
        }
    } catch (err) {
        // No hi poso missatge, faig que només surti al cridar el temps dels 5 dies per no duplicar el missatge d'error que rep l'usuari
    }
}


/*Aquesta funció és responsable d'obtenir la previsió meteorològica per als propers 5 dies per a una ubicació específica (ciutat).
Utilitza la funció getCoordinatesByCityName(cityName) per obtenir les coordenades de la ciutat.
Si les coordenades són vàlides, fa una crida a l'API One Call 3.0 d'OpenWeatherMap utilitzant aquestes coordenades per obtenir la previsió meteorològica.
Converteix la resposta en format JSON i processa les dades de previsió del temps amb una funció auxiliar processWeatherDataFive(data).
*/
async function getWeatherByLocationFive(cityName) {
    try {
        // Obtenir les coordenades de la ciutat
        const coordinates = await getCoordinatesByCityName(cityName);

        if (coordinates) {
            const { lat, lon } = coordinates;
            // Fer la crida a l'API One Call 3.0 amb les coordenades obtingudes
            const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${api.key}&units=metric`);
            const data = await response.json();
            processWeatherDataFive(data); // Processar les dades de previsió del temps
        } else {
            // Mostro el missatge per consola per jo poder veure què falla
            console.error('The location name is incorrect or cannot be found.');
        }
    } catch (err) {
        // Mostro el missatge per consola per jo poder veure què falla
        console.error('The location name is incorrect or cannot be found.s', err);
    }
}

//Aconseguim el número correcte que es correspon al dia correcte
/*S'afegeix el número del dia actual (obtingut a través de la funció getDay() que retorna un número del 0 al 6 representant diumenge a dissabte) al número del dia que es vol consultar. 
Si la suma supera 6 (que és el número màxim de dies que té una setmana), significa que el dia correspon a la següent setmana, 
així que se li resta 7 per obtenir el número correcte de la setmana. 
Si la suma no supera 6, vol dir que el dia correspon a la mateixa setmana, per tant s'obté directament el número corresponent a través de la funció.*/
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

/* aquestes línies de codi defineixen les variables que s'utilitzen més endavant en la funció selectIdiomFive(). 
La variable d no s'utilitza en aquesta funció, però podria ser útil en altres parts del codi. La variable weekday 
s'inicialitza amb els noms dels dies de la setmana en català per defecte, però es sobreescriu amb els noms 
en l'idioma seleccionat a través del select del formulari.*/ 
var d = new Date();
var weekday = ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte",];

/*Aquesta funció primer obté l'idioma seleccionat del desplegable amb id Llenguatges. Després amb el
switch s'assigna a l'array weekday l'array de noms de dies corresponent a l'idioma seleccionat. Finalment, la 
funció utilitza l'array weekday per posar els noms dels dies a la pantalla. */

function selectIdiomFive() {
    let idioma = document.getElementById("Llenguatges").value;
    let weekday = [];

    switch (idioma) {
        case 'Català':
            weekday = ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"];
            break;

        case 'Español':
            weekday = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            break;

        case 'English':
            weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            break;
    }

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    }
}
//Crido la funció al acabar el codi per mostrar els dies per defecte al carregar la pàgina
//si no la cridés caldria canviar d'idioma amb el select perquè sortís el nom dels dies
selectIdiomFive();
  

//convertim la temperatura a Celsius
//funció que utilitzava quan no sabia que les dades de l'API ja es podien cridar en Celsius
//function toCelsius (kelvin) {
    //return Math.round(kelvin - 273.15);
//} 









