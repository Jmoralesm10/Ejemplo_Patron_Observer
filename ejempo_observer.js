//En este caso la clase Youtube es el canal de youtube
var YoutubeChannel = /** @class */ (function () {
    function YoutubeChannel() {
        this.SuscriptoresCanal = [];
        this.ultimoVideoSubido = "";
    }
    YoutubeChannel.prototype.attach = function (o) {
        //Cuando un suscriptor se suscribe a nuestro canal se llama al metodo attach y se agrega a la lista de suscriptores
        this.SuscriptoresCanal.push(o);
    };
    YoutubeChannel.prototype.detach = function (o) {
        //Cuando un suscriptor se desuscribe de nuestro canal se llama al metodo detach y se elimina de la lista de suscriptores
    };
    //funcion para subir un nuevo video
    YoutubeChannel.prototype.subirVideo = function (tittle) {
        this.ultimoVideoSubido = tittle;
        console.log("Nuevo vieo subido al canal: " + tittle);
        //esto al agregar un video tiene que llamar al metodo notify
        this.notify();
    };
    //se agrega un getter para obtener el ultimo video subido
    YoutubeChannel.prototype.getUltimoVideoSubido = function () {
        return this.ultimoVideoSubido;
    };
    YoutubeChannel.prototype.notify = function () {
        //Cuando se sube un nuevo video se llama al metodo notify y se llama al metodo update de cada observer
        for (var _i = 0, _a = this.SuscriptoresCanal; _i < _a.length; _i++) {
            var suscriptor = _a[_i];
            suscriptor.update();
        }
    };
    return YoutubeChannel;
}());
//Creamos una clase que sea un suscriptor de nuestro canal de youtube
var Suscriptor = /** @class */ (function () {
    function Suscriptor(observable) {
        this.observable = observable;
    }
    //Cuando se hace un update se muestra un mensaje de que se ah subido un nuevo video y se muestra el ultimo video subido
    Suscriptor.prototype.update = function () {
        //Cuando se sube un nuevo video se llama al metodo update y se muestra un mensaje
        console.log("Se ha subido un nuevo video");
        //Tambien se puede acceder a los metodos del observable
        console.log("Ultimo video subido: " + this.observable.getUltimoVideoSubido());
    };
    return Suscriptor;
}());
//Para robar que funcione creamos un canal de youtube
var canalYoutube = new YoutubeChannel();
var s1 = new Suscriptor(canalYoutube);
var s2 = new Suscriptor(canalYoutube);
//Se suscriben dos suscriptores
canalYoutube.attach(s1);
canalYoutube.attach(s2);
//Se sube un nuevo video
canalYoutube.subirVideo("Video patron de disenio observer");
