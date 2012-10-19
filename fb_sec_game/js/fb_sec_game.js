//set main namespace
goog.provide('fb_sec_game');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');

goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');

goog.require('lime.transitions.Dissolve');

goog.require('fb_sec_game.ui');
goog.require('fb_sec_game.deliverymanWalk');
goog.require('fb_sec_game.createAnimations');
goog.require('fb_sec_game.thrwDbrs');
goog.require('fb_sec_game.objectList');


goog.require('box2d.Vec2');
goog.require('box2d.JointDef');
goog.require('box2d.MouseJointDef');
goog.require('box2d.World');

goog.require('lime.SpriteSheet');
goog.require('lime.animation.KeyframeAnimation');
goog.require('lime.ASSETS.spritesheet.plist');

goog.require('lime.audio.Audio');

fb_sec_game.size = {
    WIDTH: 1004,
    HEIGHT: 720
};


fb_sec_game.play = function(obj){

    fb_sec_game.director = new lime.Director(document.body,fb_sec_game.size.WIDTH,fb_sec_game.size.HEIGHT);

    var splashScreen = fb_sec_game.createSplashScreen();

    fb_sec_game.isRunning = false;
    
    fb_sec_game.tutImages = new Array();
    
    for(var i = 1; i < 7; i++){
    	var image = new lime.Sprite().setFill('img/tutScreen' + i + '.png').setAnchorPoint(0,0)
    	.setSize(fb_sec_game.size.WIDTH, fb_sec_game.size.HEIGHT).setRenderer(lime.Renderer.CANVAS);
    	
    	fb_sec_game.tutImages.push(image);
    }


    fb_sec_game.throwSound = new lime.audio.Audio('sounds/throw.mp3');
    fb_sec_game.hurtSound = new lime.audio.Audio('sounds/ouch.mp3');
    fb_sec_game.splatSound = new lime.audio.Audio('sounds/splat.mp3');

    fb_sec_game.tutBG = new lime.Sprite().setFill('img/tutBG.png').setSize(fb_sec_game.size.WIDTH, fb_sec_game.size.HEIGHT).setRenderer(lime.Renderer.CANVAS);

    fb_sec_game.throwSound.baseElement.volume = 0.5;
    fb_sec_game.hurtSound.baseElement.volume = 0.7;
    fb_sec_game.splatSound.baseElement.volume = 0.3;

    fb_sec_game.testData = obj;

    fb_sec_game.director.setDisplayFPS(false);

    fb_sec_game.director.makeMobileWebAppCapable();

    //fb_sec_game.deliverymanSpriteSheet.loa = function(){

    lime.scheduleManager.callAfter(function(dt){
        var startBtn = fb_sec_game.makeButton('Start').setPosition(fb_sec_game.size.WIDTH * 0.7,fb_sec_game.size.HEIGHT * 0.9);
        var tutBtn = fb_sec_game.makeButton('Tutorial').setPosition(fb_sec_game.size.WIDTH * 0.3,fb_sec_game.size.HEIGHT * 0.9);

        goog.events.listen(startBtn, 'click', function() {
            fb_sec_game.gameScene = fb_sec_game.createGameWorld();
            fb_sec_game.director.replaceScene(fb_sec_game.gameScene,lime.transitions.Dissolve);
        });
        
        goog.events.listen(tutBtn, 'click', function() {
        	fb_sec_game.createTutorial();
        });

        splashScreen.appendChild(startBtn);
        splashScreen.appendChild(tutBtn);
    }, fb_sec_game.director, 2000);

    fb_sec_game.beginTime = new Date().getSeconds();
    //};
    // set current scene active
    fb_sec_game.director.replaceScene(splashScreen);

};

fb_sec_game.createTutScene = function(index){
	var prevButton = fb_sec_game.makeButton('Previous').setPosition(fb_sec_game.size.WIDTH * 0.3,fb_sec_game.size.HEIGHT * 0.9);
	var nextButton = fb_sec_game.makeButton('Next').setPosition(fb_sec_game.size.WIDTH * 0.7,fb_sec_game.size.HEIGHT * 0.9);
	
	goog.events.listen(nextButton, 'mousedown', function() {

		if(fb_sec_game.currentTut < fb_sec_game.tutScenes.length - 1){
			fb_sec_game.currentTut += 1;
			
			fb_sec_game.director.pushScene(fb_sec_game.tutScenes[fb_sec_game.currentTut]);			
		}
		
		else{
			
			
			fb_sec_game.currentTut = 0;
			
			var splashScreen = fb_sec_game.createSplashScreen();
			
			lime.scheduleManager.callAfter(function(dt){
		        var startBtn = fb_sec_game.makeButton('Start').setPosition(fb_sec_game.size.WIDTH * 0.7,fb_sec_game.size.HEIGHT * 0.9);
		        var tutBtn = fb_sec_game.makeButton('Tutorial').setPosition(fb_sec_game.size.WIDTH * 0.3,fb_sec_game.size.HEIGHT * 0.9);

		        goog.events.listen(startBtn, 'click', function() {
		            fb_sec_game.gameScene = fb_sec_game.createGameWorld();
		            fb_sec_game.director.replaceScene(fb_sec_game.gameScene,lime.transitions.Dissolve);
		        });
		        
		        goog.events.listen(tutBtn, 'mousedown', function() {
		        	fb_sec_game.createTutorial();
		        });

		        splashScreen.appendChild(startBtn);
		        splashScreen.appendChild(tutBtn);
		    }, fb_sec_game.director, 2000);

		    fb_sec_game.beginTime = new Date().getSeconds();
		    //};
		    // set current scene active
		    fb_sec_game.director.replaceScene(splashScreen);
		}
    });
	
	goog.events.listen(prevButton, 'mousedown', function() {

		if(fb_sec_game.currentTut > 0){
			fb_sec_game.currentTut -= 1;
			
			fb_sec_game.director.popScene();
		}
		
		else{
			
			fb_sec_game.currentTut = 0;
			
			var splashScreen = fb_sec_game.createSplashScreen();
			
			lime.scheduleManager.callAfter(function(dt){
		        var startBtn = fb_sec_game.makeButton('Start').setPosition(fb_sec_game.size.WIDTH * 0.7,fb_sec_game.size.HEIGHT * 0.9);
		        var tutBtn = fb_sec_game.makeButton('Tutorial').setPosition(fb_sec_game.size.WIDTH * 0.3,fb_sec_game.size.HEIGHT * 0.9);

		        goog.events.listen(startBtn, 'click', function() {
		            fb_sec_game.gameScene = fb_sec_game.createGameWorld();
		            fb_sec_game.director.replaceScene(fb_sec_game.gameScene,lime.transitions.Dissolve);
		        });
		        
		        goog.events.listen(tutBtn, 'mousedown', function() {
		        	fb_sec_game.createTutorial();
		        });

		        splashScreen.appendChild(startBtn);
		        splashScreen.appendChild(tutBtn);
		    }, fb_sec_game.director, 2000);

		    fb_sec_game.beginTime = new Date().getSeconds();
		    //};
		    // set current scene active
		    fb_sec_game.director.replaceScene(splashScreen);
		}
    });
	
	
	var tutBG = new lime.Sprite().setFill('img/tutScreen' + index + '.png').setSize(fb_sec_game.size.WIDTH, fb_sec_game.size.HEIGHT).setRenderer(lime.Renderer.CANVAS);
	var layer = new lime.Layer().setPosition(fb_sec_game.size.WIDTH * 0.5,fb_sec_game.size.HEIGHT * 0.5);
	var scene1 = new lime.Scene();
	layer.appendChild(tutBG);
	scene1.appendChild(layer);
	scene1.appendChild(prevButton);
	scene1.appendChild(nextButton);
	
	
	return scene1;
};

fb_sec_game.createTutorial = function(){
	
	fb_sec_game.tutScenes = [];
	fb_sec_game.currentTut = 0;

	var scene1 = new lime.Scene();
	


	var prevButton = fb_sec_game.makeButton('Previous').setPosition(fb_sec_game.size.WIDTH * 0.3,fb_sec_game.size.HEIGHT * 0.9);
	var nextButton = fb_sec_game.makeButton('Next').setPosition(fb_sec_game.size.WIDTH * 0.7,fb_sec_game.size.HEIGHT * 0.9);
	
	goog.events.listen(nextButton, 'mousedown', function() {

		if(fb_sec_game.currentTut < fb_sec_game.tutImages.length - 1){
			fb_sec_game.currentTut += 1;
			fb_sec_game.director.sceneStack_[0].appendChild(fb_sec_game.tutImages[fb_sec_game.currentTut]);
			fb_sec_game.director.sceneStack_[0].removeChild(fb_sec_game.tutImages[fb_sec_game.currentTut - 1]);			
		}
		
		else{
			
			
			fb_sec_game.currentTut = 0;
			
			var splashScreen = fb_sec_game.createSplashScreen();
			
			lime.scheduleManager.callAfter(function(dt){
		        var startBtn = fb_sec_game.makeButton('Start').setPosition(fb_sec_game.size.WIDTH * 0.7,fb_sec_game.size.HEIGHT * 0.9);
		        var tutBtn = fb_sec_game.makeButton('Tutorial').setPosition(fb_sec_game.size.WIDTH * 0.3,fb_sec_game.size.HEIGHT * 0.9);

		        goog.events.listen(startBtn, 'click', function() {
		            fb_sec_game.gameScene = fb_sec_game.createGameWorld();
		            fb_sec_game.director.replaceScene(fb_sec_game.gameScene,lime.transitions.Dissolve);
		        });
		        
		        goog.events.listen(tutBtn, 'mousedown', function() {
		        	fb_sec_game.createTutorial();
		        });

		        splashScreen.appendChild(startBtn);
		        splashScreen.appendChild(tutBtn);
		    }, fb_sec_game.director, 2000);

		    fb_sec_game.beginTime = new Date().getSeconds();
		    //};
		    // set current scene active
		    fb_sec_game.director.replaceScene(splashScreen);
		}
    });
	
	goog.events.listen(prevButton, 'mousedown', function() {

		if(fb_sec_game.currentTut > 0){
			fb_sec_game.currentTut -= 1;
			
			fb_sec_game.director.sceneStack_[0].appendChild(fb_sec_game.tutImages[fb_sec_game.currentTut]);
			fb_sec_game.director.sceneStack_[0].removeChild(fb_sec_game.tutImages[fb_sec_game.currentTut + 1]);
		}
		
		else{
			
			fb_sec_game.currentTut = 0;
			
			var splashScreen = fb_sec_game.createSplashScreen();
			
			lime.scheduleManager.callAfter(function(dt){
		        var startBtn = fb_sec_game.makeButton('Start').setPosition(fb_sec_game.size.WIDTH * 0.7,fb_sec_game.size.HEIGHT * 0.9);
		        var tutBtn = fb_sec_game.makeButton('Tutorial').setPosition(fb_sec_game.size.WIDTH * 0.3,fb_sec_game.size.HEIGHT * 0.9);

		        goog.events.listen(startBtn, 'click', function() {
		            fb_sec_game.gameScene = fb_sec_game.createGameWorld();
		            fb_sec_game.director.replaceScene(fb_sec_game.gameScene,lime.transitions.Dissolve);
		        });
		        
		        goog.events.listen(tutBtn, 'mousedown', function() {
		        	fb_sec_game.createTutorial();
		        });

		        splashScreen.appendChild(startBtn);
		        splashScreen.appendChild(tutBtn);
		    }, fb_sec_game.director, 2000);

		    fb_sec_game.beginTime = new Date().getSeconds();
		    //};
		    // set current scene active
		    fb_sec_game.director.replaceScene(splashScreen);
		}
    });
	
	scene1.appendChild(fb_sec_game.tutImages[fb_sec_game.currentTut]);
	scene1.appendChild(prevButton);
	scene1.appendChild(nextButton);
	
	
	fb_sec_game.director.replaceScene(scene1,lime.transitions.Dissolve);
};

fb_sec_game.createGameWorld = function(){
    document.body.style.cursor = "crosshair";
    fb_sec_game.deliverymanLayer = new lime.Layer().setPosition(fb_sec_game.size.WIDTH * 0.0,fb_sec_game.size.HEIGHT * 0.5);

    fb_sec_game.helpModeOn = false;

    fb_sec_game.permissionIndex = 0;

    fb_sec_game.vendorNumber = 5;

	var scene = new lime.Scene();
    fb_sec_game.deliverymanSprite = new lime.Sprite().setSize(180,180).setRenderer(lime.Renderer.CANVAS);

    fb_sec_game.createAnimations();

    fb_sec_game.appLabel = new lime.Label().setAnchorPoint(0.80,0.45).setFontSize(20).setText(fb_sec_game.testData.app_name)
        .setOpacity(1).setFontColor('#000');

    fb_sec_game.appLabel.setSize(fb_sec_game.appLabel.measureText().width * 1.5, fb_sec_game.appLabel.measureText().height);

    fb_sec_game.background = new lime.Sprite().setPosition(fb_sec_game.size.WIDTH * 0.5,fb_sec_game.size.HEIGHT * 0.5)
            .setSize(fb_sec_game.size.WIDTH, fb_sec_game.size.HEIGHT).setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('bg.png')).setRenderer(lime.Renderer.CANVAS);


    fb_sec_game.vendorBooth = new lime.Sprite().setAnchorPoint(0.5,0.10).setPosition(fb_sec_game.size.WIDTH *.775,fb_sec_game.size.HEIGHT * 0.115)
        .setSize(260, 290).setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('booth.png')).setRenderer(lime.Renderer.CANVAS);

    var anchorWidth = goog.math.clamp(((fb_sec_game.appLabel.measureText().width * 1.5) / 260) * 0.5,0,1);

    fb_sec_game.appLabel.setAnchorPoint(anchorWidth,0.45);


    fb_sec_game.sec_guy = new lime.Sprite().setPosition(fb_sec_game.size.WIDTH *.5,fb_sec_game.size.HEIGHT * 0.9)
        .setSize(144, 274).setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('sec_man.png')).setRenderer(lime.Renderer.CANVAS);


    fb_sec_game.vendorLayer = new lime.Layer().setPosition(fb_sec_game.size.WIDTH *.785,fb_sec_game.size.HEIGHT * 0.277);

    fb_sec_game.vendorBooth.appendChild(fb_sec_game.appLabel);

    fb_sec_game.vendorBody = new lime.Sprite().setAnchorPoint(0.5,0.05).setSize(95, 148).setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('body.png')).setRenderer(lime.Renderer.CANVAS);

    fb_sec_game.vendorHead = new lime.Sprite().setAnchorPoint(0.5,0.9).setSize(70, 75).setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('bored3.png')).setRenderer(lime.Renderer.CANVAS);


    fb_sec_game.vendorLayer.appendChild(fb_sec_game.vendorBody);
    fb_sec_game.vendorLayer.appendChild(fb_sec_game.vendorHead);

    fb_sec_game.permissionLayer = fb_sec_game.objectList(new goog.math.Size(64,128),
        new goog.math.Coordinate(74,-10),fb_sec_game.testData.data);

    fb_sec_game.deliverymanSprite.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame("idle.png"));
    fb_sec_game.deliverymanLayer.appendChild(fb_sec_game.deliverymanSprite);
    fb_sec_game.deliverymanSprite.runAction(fb_sec_game.walkAnim);

	//add target and title to the scene
    scene.appendChild(fb_sec_game.background);
    scene.appendChild(fb_sec_game.vendorLayer);
    scene.appendChild(fb_sec_game.vendorBooth);
    scene.appendChild(fb_sec_game.permissionLayer);
    scene.appendChild(fb_sec_game.deliverymanLayer);
    scene.appendChild(fb_sec_game.ui());
    scene.appendChild(fb_sec_game.descriptionLabel);
    scene.appendChild(fb_sec_game.sec_guy);


    //box2d
    var gravity = new box2d.Vec2(0, 20);
    var bounds = new box2d.AABB();
    bounds.minVertex.Set(0, 0);
    bounds.maxVertex.Set(fb_sec_game.size.WIDTH,fb_sec_game.size.HEIGHT);
    fb_sec_game.world = new box2d.World(bounds, gravity, false);

    goog.events.listen(scene,'mousemove',function(e){
        if(!fb_sec_game.pausedGame){
        //if(!fb_sec_game.helpModeOn){
        var pos = fb_sec_game.sec_guy.getPosition();
        fb_sec_game.sec_guy.runAction(new lime.animation.MoveTo(e.position.x, pos.y).setSpeed(1).setEasing(lime.animation.Easing.LINEAR));
    }//}
    });


    //listen for mouse click
    goog.events.listen(scene,['mouseup','touchend'],function(e){

        jQuery('div[rel="popover"]').popover({trigger: 'manual'});
        jQuery('div[rel="popover"]').popover('hide');

        if(goog.now() - fb_sec_game.beginTime > 1000 && !fb_sec_game.helpModeOn && !fb_sec_game.pausedGame)
        {
            var debrisLayer = new lime.Layer().setOpacity(0).setPosition(fb_sec_game.sec_guy.getPosition()).setAnchorPoint(.5,.5),
                debrisSprite = new lime.Sprite().setSize(45,45).setAnchorPoint(.5,.5).setRenderer(lime.Renderer.CANVAS);

            fb_sec_game.throwSound.stop();
                fb_sec_game.throwSound.play();


            var randomNum = Math.floor((Math.random()*4)+1);

            switch(randomNum){
                case 1:
                    debrisSprite.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('orange.png'));
                    break;
                case 2:
                    debrisSprite.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('grapes.png'));
                    break;
                case 3:
                    debrisSprite.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('banana.png'));
                    break;
                case 4:
                    debrisSprite.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('apple.png'));
                    break;
            }

            debrisLayer.appendChild(debrisSprite);
            scene.removeChild(fb_sec_game.sec_guy);
            scene.appendChild(debrisLayer);
            scene.appendChild(fb_sec_game.sec_guy);
            debrisLayer.runAction(fb_sec_game.thrwDbrs(e, debrisLayer, debrisSprite, fb_sec_game.deliverymanLayer, fb_sec_game.deliverymanSprite));
        }
        fb_sec_game.beginTime = goog.now();

    });

    fb_sec_game.isRunning = true;

    lime.scheduleManager.schedule(function(dt){
        var x_offset = 94;
        var y_offset = -20;

        var tempPos = new goog.math.Coordinate(fb_sec_game.deliverymanLayer.getPosition().x + x_offset,
            fb_sec_game.deliverymanLayer.getPosition().y + y_offset);

        fb_sec_game.permissionLayer.setPosition(tempPos);
    }, scene);

    fb_sec_game.isWalking = false;

    //lime.scheduleManager.schedule(function(dt){
        fb_sec_game.deliverymanWalk(fb_sec_game.deliverymanLayer);
    //},scene);


    fb_sec_game.createDeliverymanPopover();
    fb_sec_game.createVendorPopover();
    fb_sec_game.createSecGuyPopover();

    return scene;
};

fb_sec_game.createSplashScreen = function(){
    document.body.style.cursor = "wait";
	var scene = new lime.Scene(),
    layer = new lime.Layer().setPosition(fb_sec_game.size.WIDTH * 0.5,fb_sec_game.size.HEIGHT * 0.5),
    bg = new lime.Sprite().setSize(fb_sec_game.size.WIDTH,fb_sec_game.size.HEIGHT).setFill('img/bg.png');



    fb_sec_game.deliverymanSpriteSheet = new lime.SpriteSheet('img/spritesheet.png', lime.ASSETS.spritesheet.plist, lime.parser.ZWOPTEX);

	layer.appendChild(bg);
	scene.appendChild(layer);

	return scene;
};

fb_sec_game.createEndScreen = function(){

    document.body.style.cursor = "auto";

    $('#myModal').modal({
        keyboard: false,
        backdrop: 'static'
    })

    $('#myModal').modal('show');

    var scene = new lime.Scene(),
        layer = new lime.Layer().setPosition(fb_sec_game.size.WIDTH * 0.5,fb_sec_game.size.HEIGHT * 0.5),
        bg = new lime.RoundedRect().setSize(fb_sec_game.size.WIDTH,fb_sec_game.size.HEIGHT).setFill(0,0,0,1);

    layer.appendChild(bg);
    scene.appendChild(layer);

    this.PADDING = 30;
    this.LABELSIZE = new goog.math.Size(800,70);

    this.position = new goog.math.Coordinate(fb_sec_game.size.WIDTH * 0.5,fb_sec_game.size.HEIGHT * 0.1);

    this.permissionTableHeader = "<p><table class='table table-bordered'>" +
                                 "<thead><tr><td><strong>Permission Name</strong></td><td><strong>Result</strong></td></tr></thead><tbody>";

    this.permissionTableBody = "";

    this.permissionTableFooter = "</tbody></table></p>";


    var returnVar = "{results:[";

    for(var i = 0; i < fb_sec_game.totalPermissions.length; i++)
    {
        if(fb_sec_game.totalPermissions[i].accepted)
        {
            returnVar += "\"" + fb_sec_game.totalPermissions[i].objID + "\",";
        }

        var accepted = fb_sec_game.totalPermissions[i].accepted ? "<span class='label label-success'>Accepted</span>" : "<span class='label label-important'>Denied</span>";

        var row = "<tr><td>" + fb_sec_game.totalPermissions[i].name + "</td><td>" + accepted + "</td></tr>";

        this.permissionTableBody += row;


    }

    returnVar = returnVar.substring(0, returnVar.length - 1);

    returnVar += "]}";

    this.permissionTable = this.permissionTableHeader + this.permissionTableBody + this.permissionTableFooter;

    $('#myModalBody').html(this.permissionTableHeader + this.permissionTableBody + this.permissionTableFooter);

    $('#myModal').on('shown', function () {
        updatePermissionsWithUserSelection(eval( '(' + returnVar + ')'));
    });



    return scene;
};

fb_sec_game.acceptPermissionSettings = function()
{
    window.open('', '_self', '');
    self.close();
}

fb_sec_game.restart = function(){
    var splashScreen = fb_sec_game.createSplashScreen();

    fb_sec_game.isRunning = false;

    lime.scheduleManager.callAfter(function(dt){
        fb_sec_game.gameScene = fb_sec_game.createGameWorld();
        fb_sec_game.director.replaceScene(fb_sec_game.gameScene,lime.transitions.Dissolve);
    }, fb_sec_game.director, 2000);

    fb_sec_game.beginTime = new Date().getSeconds();

    // set current scene active
    fb_sec_game.director.replaceScene(splashScreen);
};


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('fb_sec_game.play', fb_sec_game.play);
goog.exportSymbol('fb_sec_game.restart', fb_sec_game.restart);
goog.exportSymbol('fb_sec_game.acceptPermissionSettings', fb_sec_game.acceptPermissionSettings);