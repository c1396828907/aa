
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var gqs = 0;
var tj = 5;
var hp1 = 100;
var hp2 = 100;
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);


var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";


var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";


var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
var m1 = Math.round(Math.random())

if (m1 == 0) {
	monsterImage.src = "images/monster.png";

} else {
	monsterImage.src = "images/monster2.png";

}
var monsterReady2 = false;
var monsterImage2 = new Image();
monsterImage2.onload = function () {
	monsterReady2 = true;
};
var m1 = Math.round(Math.random())

if (m1 == 0) {
	monsterImage2.src = "images/monster.png";

} else {
	monsterImage2.src = "images/monster2.png";

}


var hero = {
	speed: 300 
};
var monster = {
};
var monster2 = {
};
var monstersCaught = 0;

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var herozhix = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
}
var reset = function () {

	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};
var reset1 = function () {
	monster2.x = 32 + (Math.random() * (canvas.width - 64));
	monster2.y = 32 + (Math.random() * (canvas.height - 64));

}

var update = function (modifier) {
	if (38 in keysDown && hero.y >= 20) {
		hero.y -= hero.speed * modifier;
		heroImage.src = "images/hero_down.png";

	}
	if (40 in keysDown && hero.y <= 410) { 
		hero.y += hero.speed * modifier;
		heroImage.src = "images/hero.png";
	}
	if (37 in keysDown && hero.x >= 20) { 
		hero.x -= hero.speed * modifier;
		heroImage.src = "images/hero_left.png";
	}
	if (39 in keysDown && hero.x <= 468) { 
		hero.x += hero.speed * modifier;
		heroImage.src = "images/hero_right.png";
	}

	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		hp1 = hp1 - 50;
		if (hp1==0) {
			++monstersCaught;
			reset();
			hp1=100;
			var m1 = Math.round(Math.random())
			if (m1 == 0) {
				monsterImage.src = "images/monster.png";

			} else {
				monsterImage.src = "images/monster2.png";

			}

		} else {
			monster.x = 32 + (Math.random() * (canvas.width - 64));
			monster.y = 32 + (Math.random() * (canvas.height - 64));
		}

	}
	if (
		
		hero.x <= (monster2.x + 32)
		&& monster2.x <= (hero.x + 32)
		&& hero.y <= (monster2.y + 32)
		&& monster2.y <= (hero.y + 32)
	) {
		hp2 = hp2- 50;
		if (hp2==0) {
			
			++monstersCaught;
		reset1();
		hp2=100;
		var m1 = Math.round(Math.random())
		if (m1 == 0) {
			monsterImage2.src = "images/monster.png";

		} else {
			monsterImage2.src = "images/monster2.png";

		}

		}
		else
		{
			monster2.x = 32 + (Math.random() * (canvas.width - 64));
		monster2.y = 32 + (Math.random() * (canvas.height - 64));
	}
		
	}
};

var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	if (monsterReady2) {
		ctx.drawImage(monsterImage2, monster2.x, monster2.y);
	}
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("击杀数: " + monstersCaught, 32, 22);
	ctx.fillText("关卡数: " + gqs, 32, 60);
	ctx.fillText("目标是击杀: " + tj + "个小怪", 200, 22);
	ctx.fillText("HP: " + hp1, monster.x-10, monster.y+50);
	ctx.fillText("HP: " + hp2, monster2.x-10, monster2.y+50);
	if (monstersCaught == tj) {
		monstersCaught = 0;
		gqs += 1;
		tj = tj + 3;
		herozhix();
		reset();
		reset1();

	}

};

var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;
	requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var then = Date.now();
reset();
reset1();
herozhix();
main();

