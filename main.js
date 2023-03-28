
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

//depenent del temps que faci, posem una imatge o una altra com a icone que acompanya l'estat del temps
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

//Funció per eliminar l'animació de pluja quan no toca que hi sigui, eliminant tots els elements HR 
//del document HTML creats per fer l'animació de pluja
function eliminarPluja() {
    //Declara una variable "elements" que conté tots els elements HR del document HTML 
    //utilitzant el mètode "getElementsByTagName" de l'objecte "document" i passant com a paràmetre "hr"
    let elements = document.getElementsByTagName("hr");
    //Utilitza un bucle "while" per iterar mentre hi hagi elements HR en la variable "elements"
    //A cada iteració del bucle, elimina l'element HR del document HTML utilitzant el mètode "removeChild" de 
    //l'objecte parent de l'element HR (element[0].parentNode) i passant com a paràmetre l'element HR (elements[0]).
    //El bucle torna a executar-se des de l'inici fins a que no quedi cap element HR en la variable "elements".
    //Així s'eliminaria tots els elements HR del document HTML.
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

//Funció per eliminar l'animació que genera la neu
function eliminarNeu() {
    let elements = document.getElementsByClassName("neu");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}


/* NO FUNCIONA, ja que una vegada s'ha cridat i executat un script, no se'l pot parar/eliminar

//CREO LA FUNCIÖ PER POSAR PLUJA O NEU a mode d'animació
function animacioNeu() {   
    //ara depenent del temps que faci tindrem una animació o una altra
    //Es crea la variable "script" utilitzant la funció document.createElement("script") que crea un nou element en aquest cas script.
    const script = document.createElement("script");
    //S'establix la propietat src de l'element script creat anteriorment a la url des d'on es carregarà l'script extern "https://app.embed.im/snow.js"
    script.src = "https://app.embed.im/snow.js";
    //S'establix la propietat className de l'element script creat anteriorment a "script"
    script.className = "script";
    //El mateix que abans amb la propietat id
    script.id = "scriptNeu";
    //S'establix la propietat defer de l'element script creat anteriorment a true.
    script.defer = true;
    //S'afegeix l'element script creat a l'HTML utilitzant el mètode appendChild() i passant com a paràmetre l'element script creat anteriorment.
    document.body.appendChild(script);

}

function eliminarAnimacionNeu() {
    const script = document.getElementById("scriptNeu");
    document.body.removeChild(script);
}

*/


function backImage(data) {
    //trec les dades per saber el temps general que fa sense grans concrecions i ho guardo a una variable (backUrl)
    const backUrl = (data.weather[0].main);
    const backUrlId = (data.weather[0].id);
    //dic que el color del text és blanc (el mateix que al CSS), així quan s'entra a l'if de Clouds i a dins a l'if de l'ID 801
    //i es canvia el color del text al negre, al anar a dins d'un altre if el color del text torna al blanc com correspón
    document.getElementById("card").style.color = "rgb(224, 224, 230";
    //La funció "eliminarAnimacionNeu()" només es crida si hi ha un element 
    //amb l'id "scriptNeu" i s'eviten problemes amb la càrrega de la imatge de fons.
    //A partir de la segona vegada que es busquiun lloc es borrarà (si cal) l'animació de la neu

    //ara depenent del temps que faci tindrem una foto de background o una altra
    if (backUrl == 'Thunderstorm') {
        eliminarNeu();
        //Perquè no es solapin les animacions de pluja si es van buscant llocs
        // de forma consecutiva a on plogui, elimino l'animació de neu sempre, i després la creo
        eliminarPluja();
        document.getElementById("card").style.backgroundImage = "url('images/tempesta.png')";
        //ANIMACIÓ DE PLUJA EXPLICADA
        //Es crea una variable anomenada "hrElement" per a ser utilitzada per a crear cada gota de pluja.
        let hrElement;
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
            //"hrElement" i es fa servir el mètode "createElement" per crear un element HR.
            hrElement = document.createElement('HR');
            //S'estableix la posició de la gota de pluja en l'eix X utilitzant la variable 
            //"espaiament" per calcular la posició correcta.
            hrElement.style.left = (i * espaiament) + 'px';
            //S'estableix la durada de l'animació de la gota de pluja utilitzant la 
            //funció "Math.random" per generar un valor aleatori entre 0,3 i 0,6 segons.
            hrElement.style.animationDuration = 0.3 + Math.random() * 0.6 + 's';
            //Per canviar la durada de l'animació, si la vull fer més ràpida haig de baixar els valors de
            //animationDuration i pujar els de animationDelay
            hrElement.style.animationDelay = Math.random() * 4 + 's';
            //S'afegeix l'element "HR" al document mitjançant el mètode "appendChild".
            document.body.appendChild(hrElement);
        }
    } else if (backUrl == 'Clear') {
        eliminarNeu();
        eliminarPluja();
        document.getElementById("card").style.backgroundImage = "url('images/cel clar.png')";
    } else if (backUrl == 'Clouds') {
        eliminarNeu();
        eliminarPluja();
        //Si l'id del temps és el següent vol dir que hi ha pocs núvols (few clouds: 11-25%) i per tant poso una imatge que es correspongui
        if (backUrlId == 801) {
            document.getElementById("card").style.backgroundImage = "url('images/lleugerament ennuvolat.png')";
            //Pinto el text de color negre perquè es vegi bé amb aquesta imatge
            document.getElementById("card").style.color = "#01081d";
            //Núvols del 26-50%
        } else if (backUrlId == 802) {
            document.getElementById("card").style.backgroundImage = "url('images/nuvolositat variable.png')";
            document.getElementById("card").style.color = "#01081d";
        } else {
            document.getElementById("card").style.backgroundImage = "url('images/nuvols.png')";
        }
    } else if (backUrl == 'Drizzle') {
        eliminarNeu();
        eliminarPluja();
        document.getElementById("card").style.backgroundImage = "url('images/pluja.png')";
        let hrElement;
        let comptador = 10;
        let espaiament = window.innerWidth / comptador;
        for (let i = 0; i < comptador; i++) {
            hrElement = document.createElement('HR');
            hrElement.style.left = (i * espaiament) + 'px';
            hrElement.style.animationDuration = 0.3 + Math.random() * 0.6 + 's';
            hrElement.style.animationDelay = Math.random() * 4 + 's';
            document.body.appendChild(hrElement);
        }

    } else if (backUrl == 'Rain') {
        eliminarNeu();
        eliminarPluja();
        document.getElementById("card").style.backgroundImage = "url('images/pluja.png')";
        let hrElement;
        let comptador = 10;
        let espaiament = window.innerWidth / comptador;
        for (let i = 0; i < comptador; i++) {
            hrElement = document.createElement('HR');
            hrElement.style.left = (i * espaiament) + 'px';
            hrElement.style.animationDuration = 0.3 + Math.random() * 0.6 + 's';
            hrElement.style.animationDelay = Math.random() * 4 + 's';
            document.body.appendChild(hrElement);
        }

    } else if (backUrl == 'Snow') {
        eliminarPluja();
        eliminarNeu();
        document.getElementById("card").style.backgroundImage = "url('images/neu.png')";
        //FUNCIÓ CREACIÓ ANIMACIÓ DE NEU EXPLICADA
        //Crea 15 flocs de neu que apareixen en una posició aleatòria de la pantalla, 
        //amb una animació de caure i una duració i delay aleatori, i una vegada finalitza la animació es crea un de nou.

        //La primera línia declara una variable "neuElement" que es utilitzarà per crear cada 
        //element DIV que representarà un floc de neu.
        let neuElement;
        //És la quantitat de flocs de neu que es crearan.
        let comptador = 28;

        //Funció que crea cada floc de neu
        function crearFlocNeu() {
            //Es crea un element DIV utilitzant el mètode "createElement" de l'objecte "document" i passant com a paràmetre "DIV".
            neuElement = document.createElement('DIV');
            //Utilitzant el mètode "classList.add" s'afegeix la classe "neu" a l'element DIV creat anteriorment.
            neuElement.classList.add('neu');
            //Utilitzant l'objecte style es assigna una posició aleatòria en l'eix x i en l'eix y a l'element DIV.
            neuElement.style.left = Math.floor(Math.random() * window.innerWidth) + 'px';
            neuElement.style.top = Math.floor(Math.random() * window.innerHeight) + 'px';
            //Utilitzant l'objecte l'style es defineix l'animació que es farà sobre 
            //l'element DIV, en aquest cas es defineix l'animació "caureNeu" que s'ha de definir en el CSS (@keyframes)
            neuElement.style.animationName = 'caureNeu';
            //Utilitzo l'style per definir la duració d'animació entre 5s i 10s i un delay entre 0s i 5s.
            neuElement.style.animationDuration = (13 + Math.random() * 90) + 's';
            //Afegint un event listener al element DIV, es detecta quan l'animació finalitza, 
            //esborrant així l'element i creant un de nou.
            neuElement.addEventListener('animationend', function () {
                this.remove();
                crearFlocNeu();
            });
            //Finalment s'afegeix l'element DIV al document HTML 
            //utilitzant el mètode "appendChild" de l'objecte "body" i passant com a paràmetre l'element DIV.
            document.body.appendChild(neuElement);

        }

        //La segona part del codi és un bucle "for" que executa la funció "crearFlocNeu" 15 vegades 
        //( el valor del comptador en aquest cas concret)
        for (let i = 0; i < comptador; i++) {
            crearFlocNeu();
        }

        //hi podria o hauria d'haver posat un else
    } else if (backUrl == 701 || 711 || 721 || 731 || 741 || 751 || 761 || 762 || 771 || 781) {
        eliminarNeu();
        eliminarPluja();
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
            idiomaFetch = 'ca';
            //Agafo l'element amb l'id searchbox (que és el buscador), accedeixo a .placeholder 
            //(el .placeholder és una propietat de l'objecte input en HTML que es pot accedir i modificar mitjançant JavaScript. 
            //Amb aquesta propietat es pot canviar el text que apareix dins d'un quadre d'entrada quan aquest està buit i no s'ha escrit encara cap valor)
            //i a dins depenent de l'idioma amb el qual s'estigui apareixerà a la barra de búsqueda 
            //una cosa o una altra
            document.getElementById("searchbox").placeholder = "Busca una localitat: ";
            //Canviar l'idioma del footer depenent de l'idioma que es seleccioni
            document.getElementById("footerText").innerHTML = "Creat per <a href='https://www.linkedin.com/in/pol-murillas-ledesma-29b23b241/'>Pol Murillas Ledesma</a>";
            break;

        case 'Español':
            idiomaFetch = 'es';
            //He decidit utilitzar aquesta sintaxi, però també es podria utilitzar: document.getElementById("searchbox").setAttribute("placeholder", "Busca una localidad: ");
            //a sintaxi .setAttribute("placeholder", "Busca una localidad: ") és una manera més general d'afegir o modificar atributs en un element HTML a través de JavaScript. 
            //Significa que es pot utilitzar per a qualsevol atribut, no només per a "placeholder". Per contra, la sintaxi .placeholder = "Busca una localidad: " és una forma més 
            //curta i específica per a modificar el valor de l'atribut "placeholder" en un element HTML, ja que el navegador té una propietat que li correspon específicament.
            //La informació que he trobat diu que es recomana usar .setAttribute per a la compatibilitat entre navegadors, mentre que .placeholder és més còmode per a aplicacions web modernes.
            document.getElementById("searchbox").placeholder = "Busca una localidad: ";
            document.getElementById("footerText").innerHTML = "Creado por <a href='https://www.linkedin.com/in/pol-murillas-ledesma-29b23b241/'>Pol Murillas Ledesma</a>";
            break;

        case 'English':
            idiomaFetch = 'en';
            document.getElementById("searchbox").placeholder = "Search for a location: ";
            document.getElementById("footerText").innerHTML = "Created by <a href='https://www.linkedin.com/in/pol-murillas-ledesma-29b23b241/'>Pol Murillas Ledesma</a>";
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
}

//error: aquesta funció és cridada si hi ha un error en obtenir les dades de geolocalització. L'argument de la funció és un 
//objecte err que conté informació sobre l'error.
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

//L'Event Listener: document.getElementById("getLocation").addEventListener("click", function() { ... }: aquesta línia assigna a 
//un event listener al botó amb id "getLocation". Quan l'usuari cliqui aquest botó, es cridarà la funció navigator.geolocation.getCurrentPosition 
//amb les opcions especificades a options, les funcions success i error com a arguments, i es passaran les dades obtingudes a la funció success.
document.getElementById("getLocation").addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(success, error, options);
});

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


async function success(pos) {

    //Agafo la longitud i la latitud obtingudes amb la funció getLocationSuccess i les guardo a les variables creades lat i lon
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    //la mateixa crida a la api que a la funció d'abaix, però en comptes d'extreure les dades per nom de població, es fa per geolocalització (latitud i longitud)
    const response = await fetch(`${api.url}?lat=${lat}&lon=${lon}&appid=${api.key}&lang=${selectIdiom()}&units=metric`);
    const data = await response.json();
    //amb l'id card fem que no surti el card amb la info fins que no busquem
    //la primera ciutat
    card.style.display = 'block';
    //per assegurarnos que la data està sent passada
    //anem a remplaçar les dades que tenim per les que ens dona la api
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    date.innerHTML = (new Date()).toLocaleDateString();
    temp.innerHTML = `${(data.main.temp)} ºC`;
    weather.innerHTML = data.weather[0].description;
    range.innerHTML = `Temp min/mx: ${(data.main.temp_min)} ºC / ${(data.main.temp_max)} ºC`;
    humidity.innerHTML = `Hum: ${data.main.humidity}%`;
    wind.innerHTML = `Vel : ${data.wind.speed} Met./seg.`;
    pressioAtmos.innerHTML = `Pres. Atmos: ${data.main.pressure} hPa`;
    //Ara mateix no utilitzo la sensació tèrmica
    //sensaTermi.innerHTML = `Sens. Term: ${data.main.feels_like} ºC`;

    //primer declaro la variable idiomSun (amb el let ja que el seu valor es pot modificar posteriorment) que tindra el resultat que retorna la funció selectIdiom()
    let idiomSun = selectIdiom();
    //depenent de l'idioma que em retorni la funció selectIdiom escric quan surt i es pon el sol en un idioma o un altre
    if (idiomSun === 'ca') {
        //s'envien els valors data.sys.sunrise, data.sys.sunset a la funció formatSunRiseSetHour, aquesta processa aquests valors en format UNIX que contenen
        //la hora en que surt i es pon el sol, i la mateixa funció amb el .formattedSunrise o .formattedSunset retorna el valor caluclat en la funció formatSunRiseSetHour
        //que serà o bé la hora en que surt o es pon el sol en format comprensible (hores normals)
        //com es pot veure S'utilitza la notació de punt per accedir a les propietats formattedSunrise i formattedSunset de l'objecte retornat, 
        //que contenen les cadenes formatejades corresponents a l'hora que surt el sol i quan es pon, respectivament.
        sunRiseSet.innerHTML = `<img src="images/sunrise.png" alt="sunrise" class="RaiseSun-img"> Sortida del sol: ${formatSunRiseSetHour(data.sys.sunrise, data.sys.sunset).formattedSunrise}
          <img src="images/sunset.png" alt="sunset" class="RaiseSun-img"> Posta de sol:
            ${formatSunRiseSetHour(data.sys.sunrise, data.sys.sunset).formattedSunset}`;

    } else if (idiomSun === 'es') {
        sunRiseSet.innerHTML = `<img src="images/sunrise.png" alt="sunrise" class="RaiseSun-img">  Amanece a las: ${formatSunRiseSetHour(data.sys.sunrise, data.sys.sunset).formattedSunrise}
          <img src="images/sunset.png" alt="sunset" class="RaiseSun-img"> El ocaso a las:
            ${formatSunRiseSetHour(data.sys.sunrise, data.sys.sunset).formattedSunset}`;
    } else {
        sunRiseSet.innerHTML = `<img src="images/sunrise.png" alt="sunrise" class="RaiseSun-img"> The sunrise is : ${formatSunRiseSetHour(data.sys.sunrise, data.sys.sunset).formattedSunrise}
          <img src="images/sunset.png" alt="sunset" class="RaiseSun-img"> The sunset is :
            ${formatSunRiseSetHour(data.sys.sunrise, data.sys.sunset).formattedSunset}`;
    }

    //basat en la temperatura, posem una imatge o una altra
    //i el mateix amb el temps que faci i amb això li posaré també una imatge de fons o una altra
    updateImages(data);
    updateWeatherImage(data);
    backImage(data);
    //natejem el nom de la ciutat buscada amb aquesta funció
    clearName();
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
        temp.innerHTML = `${(data.main.temp)} ºC`;
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `Temp min/mx: ${(data.main.temp_min)} ºC / ${(data.main.temp_max)} ºC`;
        humidity.innerHTML = `Hum: ${data.main.humidity}%`;
        wind.innerHTML = `Vel : ${data.wind.speed} Met./seg.`;
        pressioAtmos.innerHTML = `Pres. Atmos: ${data.main.pressure} hPa`;
        //sensaTermi.innerHTML = `Sens. Term: ${data.main.feels_like} ºC`;
        let idiomSun = selectIdiom();
        if (idiomSun === 'ca') {
            sunRiseSet.innerHTML = `<img src="images/sunrise.png" alt="sunrise" class="RaiseSun-img"> Sortida del sol: ${formatSunRiseSetHour(data.sys.sunrise, data.sys.sunset).formattedSunrise}
          <img src="images/sunset.png" alt="sunset" class="RaiseSun-img"> Posta de sol:
            ${formatSunRiseSetHour(data.sys.sunrise, data.sys.sunset).formattedSunset}`;
        } else if (idiomSun === 'es') {
            sunRiseSet.innerHTML = `<img src="images/sunrise.png" alt="sunrise" class="RaiseSun-img">  Amanece a las: ${formatSunRiseSetHour(data.sys.sunrise, data.sys.sunset).formattedSunrise}
          <img src="images/sunset.png" alt="sunset" class="RaiseSun-img"> El ocaso a las:
            ${formatSunRiseSetHour(data.sys.sunrise, data.sys.sunset).formattedSunset}`;
        } else {
            sunRiseSet.innerHTML = `<img src="images/sunrise.png" alt="sunrise" class="RaiseSun-img"> The sunrise is : ${formatSunRiseSetHour(data.sys.sunrise, data.sys.sunset).formattedSunrise}
          <img src="images/sunset.png" alt="sunset" class="RaiseSun-img"> The sunset is :
            ${formatSunRiseSetHour(data.sys.sunrise, data.sys.sunset).formattedSunset}`;
        }

        //basat en la temperatura, posem una imatge o una altra
        //i el mateix amb el temps que faci i amb això li posaré també una imatge de fons o una altra
        updateImages(data);
        updateWeatherImage(data);
        backImage(data);
        //natejem el nom de la ciutat buscada amb aquesta funció
        clearName();
    } catch (err) {
        console.log(err);
        //El missatge d'alerta que apareix a la pantalla/navegador quan algú posa dades incorrectes
        alert('POSA UN NOM VÀLID');
    }
}

//convertim la temperatura a Celsius
//funció que utilitzava quan no sabia que les dades de l'API ja es podien cridar en Celsius
//function toCelsius (kelvin) {
    //return Math.round(kelvin - 273.15);
//} 









