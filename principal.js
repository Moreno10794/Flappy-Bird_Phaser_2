var juego = new Phaser.Game(370, 550, Phaser.AUTO, 'bloque_juego');

juego.state.add('Menu', Menu);
juego.state.add('Juego', Juego);
juego.state.add('Game_Over', Game_Over);

juego.state.start('Menu');