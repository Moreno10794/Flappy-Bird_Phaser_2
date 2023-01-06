var muerte;

var Game_Over = {

    preload: function () {

        
        juego.load.image('boton_muerte', 'img/repito.png');
        juego.load.image('final', 'img/final.png');
        juego.load.audio('muerte', 'sfx/muerte.mp3');

    },

    create: function () {

        muerte = juego.add.audio('muerte', 0.2, false);
        muerte.play();


        var inicio = juego.add.image(0,
            0, 'final');
        inicio.anchor.setTo(0, 0);

        var boton = this.add.button(juego.width / 2,
            juego.height / 2, 'boton_muerte', this.iniciarJuego, this);
        boton.anchor.setTo(0.5, -1.4);

        var txtPuntosEtiqueta = juego.add.text(juego.width / 2 - 50, juego.height / 2 - 85, "Puntaje final: ", { font: "bold 25px sans-serif", fill: "white", align: "center" });
        txtPuntosEtiqueta.anchor.setTo(0.4, -1.87);
        if (puntos == -1)
            puntos = 0;
        var txtPuntosNumero = juego.add.text(juego.width / 2 + 50, juego.height / 2 - 85, puntos.toString(), { font: "bold 30px sans-serif", fill: "white", align: "center" });
        txtPuntosNumero.anchor.setTo(0, -1.6);



    },

    iniciarJuego: function () {
        this.state.start('Juego');
        this.input.keyboard.enabled = true;
        muerte.stop();
    }
};