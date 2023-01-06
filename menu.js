var Menu = {

  preload: function () {

    juego.stage.backgroundColor = '#144c41';
    juego.load.image('boton', 'img/play.png');
    juego.load.image('inicio', 'img/inicio.png');
    juego.load.audio('menu', 'sfx/menu.mp3');

  },

  create: function () {

    menumusic = juego.add.audio('menu', 0.2, false);
    menumusic.play();
    menumusic.loop = true;

    var inicio = juego.add.image(0,
      0, 'inicio');
    inicio.anchor.setTo(0, 0);

    var boton = this.add.button(juego.width / 2,
      juego.height / 2, 'boton', this.iniciarJuego, this);
    boton.anchor.setTo(0.5, -0.7);

    var txtPlay = juego.add.text(juego.width / 2 - 50, juego.height / 2 - 85, "Oprime el boton para jugar", { font: "bold 25px sans-serif", fill: "white", align: "center" });
    txtPlay.anchor.setTo(0.35, -2.5);

  },

  iniciarJuego: function () {
    this.state.start('Juego');
   
  }

};