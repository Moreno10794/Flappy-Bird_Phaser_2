var bg;
var tubos;
var flappy;
var salto;
var timer;
var puntos;
var txtPuntos;


var Juego = {

    preload: function () {
        juego.load.image('bg', 'img/Fondo.jpg');
        juego.load.spritesheet('pajaro', 'img/Pajarito_Sheet_100x100.png',
            100, 100);
        juego.load.image('tubo', 'img/tubo.png');
        juego.load.audio('aleteo', 'sfx/aleteo.mp3');
        juego.load.audio('pegarse', 'sfx/morir.mp3');
        juego.load.audio('puntos', 'sfx/pasar.mp3');

        juego.forceSingleUpdate = true;

    },

    create: function () {
        
        aleteosfx = juego.add.audio('aleteo', 0.2, false);
       morirsfx = juego.add.audio('pegarse', 0.2, false);
       pasarsfx = juego.add.audio('puntos', 0.2, false);

        bg = juego.add.tileSprite(0, 0, 370, 550, 'bg');
        juego.physics.startSystem(Phaser.Physics.ARCADE);

        tubos = juego.add.group();
        tubos.enableBody = true;
        tubos.createMultiple(20, 'tubo');

        flappy = juego.add.sprite(10, 235, 'pajaro');
        flappy.frame = 0;
        flappy.anchor.setTo(0, 0.5);
        flappy.animations.add('vuelo', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 20,
            true);

            

        juego.physics.arcade.enable(flappy);

        flappy.body.gravity.y = 1200;
        flappy.body.setSize(50, 35, 25, 10);

        salto = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        salto.onDown.add(this.saltar, this);

        timer = juego.time.events.loop(2000, this.crearColumna, this);

        puntos = -1;
        txtPuntos = juego.add.text(20, 20, "Puntaje: 0", {font: "30px Arial", fill: "#FFF"});
    },

    update: function () {
        menumusic.stop();
        if (flappy.inWorld == false) {
            this.state.start('Game_Over');
        }
        else if (flappy.position.y > 550) {
            flappy.alive = false;
            tubos.forEachAlive(function (t) {
                t.body.velocity.x = 0;
            }, this);

        }
        else {
            bg.tilePosition.x -= 1;
        }


        juego.physics.arcade.overlap(flappy, tubos, this.tocoTubo, null, this);

        flappy.animations.play('vuelo');
        if (flappy.angle < 10) {
            flappy.angle += 1;
        }
    },

    saltar: function () {
        aleteosfx.play();
        flappy.body.velocity.y = -350;
        juego.add.tween(flappy).to({ angle: -10 }, 100).start();
    },

    crearColumna: function () {
        var hueco = Math.floor(Math.random() * 5) + 1;
        for (var i = 0; i < 10; i++) {

            if (i != hueco && i != hueco + 1) {

                this.crearUnTubo(370, i * 55 + 0);
            }
        }

        puntos +=1;
        txtPuntos.text ="Puntaje: " + puntos;
        if (puntos>0){
        pasarsfx.play();
        }

    },

    crearUnTubo: function (x, y) {
        var tubo = tubos.getFirstDead();

        tubo.reset(x, y);
        tubo.body.velocity.x = -170;
        tubo.checkWorldBounds = true;
        tubo.outOfBoundsKill = true;
    },

    tocoTubo: function () {
        if (flappy.alive == false)
            return;
        flappy.alive = false;
        morirsfx.play();
        juego.time.events.remove(timer);
        this.input.keyboard.enabled = false;
        tubos.forEachAlive(function (t) {
            t.body.velocity.x = 0;
        }, this);
    },

     render: function() {

       // juego.debug.bodyInfo(flappy, 32, 32);
    
      //  juego.debug.body(flappy);
       
    
    }
};