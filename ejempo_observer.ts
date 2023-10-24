//Lo primero para crear el patron de disenio es crear las interfaces abstractas
//En este caso el Observable seria nuestro canal de youtube por ejemplo
interface Observable {
    //En la interfaz observable se definen los metodos que se van a utilizar
    attach(o: Observer);
    detach(o: Observer);
    //La funcion notify va a llamar al metodo update de cada observer
    notify();
}

//En este caso el Observer seria el suscriptor de nuestro canal de youtube
interface Observer {
    //Cada observador debe tener un metodo update
    update();
}

//En este caso la clase Youtube es el canal de youtube
class YoutubeChannel implements Observable {
    private SuscriptoresCanal:Observer[] = [];
    private ultimoVideoSubido:string = "";
    attach(o: Observer) {
        //Cuando un suscriptor se suscribe a nuestro canal se llama al metodo attach y se agrega a la lista de suscriptores
        this.SuscriptoresCanal.push(o);
    }
    detach(o: Observer) {
        //Cuando un suscriptor se desuscribe de nuestro canal se llama al metodo detach y se elimina de la lista de suscriptores
    }

    //funcion para subir un nuevo video
    subirVideo(tittle: string) {
        this.ultimoVideoSubido = tittle;
        console.log("Nuevo vieo subido al canal: " + tittle);
        //esto al agregar un video tiene que llamar al metodo notify
        this.notify();
    }

    //se agrega un getter para obtener el ultimo video subido
    getUltimoVideoSubido() {
        return this.ultimoVideoSubido;
    }

    notify() {
        //Cuando se sube un nuevo video se llama al metodo notify y se llama al metodo update de cada observer
        for (let suscriptor of this.SuscriptoresCanal) {
            suscriptor.update();
        }
    }
}

//Creamos una clase que sea un suscriptor de nuestro canal de youtube
class Suscriptor implements Observer {
    //El constructor recibe como parametro el canal al que se va a suscribir
    private observable: YoutubeChannel;
    constructor(observable: YoutubeChannel) {
        this.observable = observable;
    }

    //Cuando se hace un update se muestra un mensaje de que se ah subido un nuevo video y se muestra el ultimo video subido
    update() {
        //Cuando se sube un nuevo video se llama al metodo update y se muestra un mensaje
        console.log("Se ha subido un nuevo video");
        //Tambien se puede acceder a los metodos del observable
        console.log("Ultimo video subido: " + this.observable.getUltimoVideoSubido());
    }
}

//Para robar que funcione creamos un canal de youtube
let canalYoutube = new YoutubeChannel();
let s1 = new Suscriptor(canalYoutube);
let s2 = new Suscriptor(canalYoutube);

//Se suscriben dos suscriptores
canalYoutube.attach(s1);
canalYoutube.attach(s2);

//Se sube un nuevo video
canalYoutube.subirVideo("Video patron de disenio observer");