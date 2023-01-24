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
const weatherScript = document.getElementById('script');

//EFECTE DE NEU
//Això fa que s'afegixi un element script al document 
//HTML amb les propietats especificades i la font de l'script extern. Bàsicament fa que el navegador carregui i executi 
//l'script des de la font externa quan la pàgina estigui carregada.

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
    //La funció "eliminarAnimacionNeu()" només es crida si hi ha un element 
    //amb l'id "scriptNeu" i s'eviten problemes amb la càrrega de la imatge de fons.
    //A partir de la segona vegada que es busquiun lloc es borrarà (si cal) l'animació de la neu

    //ara depenent del temps que faci tindrem una foto de background o una altra
    if (backUrl == 'Thunderstorm') {
        eliminarNeu();
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
        document.getElementById("card").style.backgroundImage = "url('images/nuvols.png')";
    } else if (backUrl == 'Drizzle') {
        eliminarNeu();
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
        document.getElementById("card").style.backgroundImage = "url('images/neu.png')";
        //FUNCIÓ CREACIÓ ANIMACIÓ DE NEU EXPLICADA
        //Crea 15 flocs de neu que apareixen en una posició aleatòria de la pantalla, 
        //amb una animació de caure i una duració i delay aleatori, i una vegada finalitza la animació es crea un de nou.

        //La primera línia declara una variable "neuElement" que es utilitzarà per crear cada 
        //element DIV que representarà un floc de neu.
        let neuElement;
        //És la quantitat de flocs de neu que es crearan.
        let comptador = 15;

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
            neuElement.style.animationDuration = (5 + Math.random() * 5) + 's';
            neuElement.style.animationDelay = Math.random() * 5 + 's';
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









