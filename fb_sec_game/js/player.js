//set main namespace
goog.provide('fb_sec_game.thrwDbrs');


//get requirements
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.RotateTo');
goog.require('lime.transitions.Dissolve');
goog.require('fb_sec_game.ui');
goog.require('fb_sec_game.deliverymanWalk');


goog.require('box2d.BodyDef');
goog.require('box2d.BoxDef');
goog.require('box2d.PolyDef');
goog.require('box2d.Vec2');
goog.require('box2d.JointDef');
goog.require('box2d.MouseJointDef');
goog.require('box2d.World');

fb_sec_game.thrwDbrs = function(e, debrisLayer, debrisSprite, deliverymanLayer, deliverymanSprite){
    this.throwDebris = new lime.animation.Spawn(
        new lime.animation.FadeTo(1).setDuration(.2),
        new lime.animation.ScaleTo(.8).setDuration(.8),
        new lime.animation.RotateTo(360),
        new lime.animation.MoveTo(e.position).setEasing(lime.animation.Easing.LINEAR));


    this.throwDebris.addEventListener(lime.animation.Event.STOP, function(e){

        fb_sec_game.splatSound.stop();
        fb_sec_game.splatSound.play();

        fb_sec_game.checkVendorCollision(debrisLayer, debrisSprite);
        fb_sec_game.checkDeliverymanCollision(debrisLayer, debrisSprite, deliverymanLayer, deliverymanSprite);
        fb_sec_game.checkPermissionCollisions(debrisLayer, debrisSprite);
        fb_sec_game.gameScene.removeChild(debrisLayer);
    });

    fb_sec_game.beginTime = new Date().getSeconds();

    return this.throwDebris;
};

fb_sec_game.updateFromBody = function(shape){
    var pos = shape._body.GetCenterPosition();
    var rot = shape._body.GetRotation();
    shape.layer.setRotation(-rot / Math.PI * 180);
    shape.layer.setPosition(shape.layer.screenToLocal(pos));
};

fb_sec_game.checkCollision = function(debrisLayer, debrisSprite, checkLayer, checkSprite){
    this.b1 = new goog.math.Box(debrisLayer.getPosition().y,
        debrisLayer.getPosition().x + debrisSprite.getSize().width,
        debrisLayer.getPosition().y + debrisSprite.getSize().height,
        debrisLayer.getPosition().x);

    this.b2 = new goog.math.Box(checkLayer.getPosition().y,
        checkLayer.getPosition().x + checkSprite.getSize().width * 0.35,
        checkLayer.getPosition().y + checkSprite.getSize().height,
        checkLayer.getPosition().x - checkSprite.getSize().width * 0.15);



    return goog.math.Box.intersects(this.b1, this.b2);
};

fb_sec_game.checkDeliverymanCollision = function(debrisLayer, debrisSprite, deliverymanLayer, deliverymanSprite){
    if(fb_sec_game.checkCollision(debrisLayer, debrisSprite, deliverymanLayer, deliverymanSprite))
    {
        //deliverymanSprite.setSize(128,180);
        fb_sec_game.hurtSound.stop();
        fb_sec_game.hurtSound.play();
        deliverymanSprite.runAction(fb_sec_game.idleAnim);
        lime.scheduleManager.unschedule(fb_sec_game.deliverymanWalk, fb_sec_game.gameScene);
        lime.scheduleManager.disable_();
        fb_sec_game.isRunning = false;

        lime.scheduleManager.callAfter(function(dt){
            fb_sec_game.isWalking = false;
            //deliverymanSprite.setSize(180,180);
            deliverymanSprite.runAction(fb_sec_game.walkAnim);
            fb_sec_game.isRunning = true;
            fb_sec_game.deliverymanWalk(deliverymanLayer);
        }, fb_sec_game.gameScene, 1000);

    }
};

fb_sec_game.checkVendorCollision = function(debrisLayer, debrisSprite){
    if(fb_sec_game.checkCollision(debrisLayer, debrisSprite, fb_sec_game.vendorBooth, fb_sec_game.vendorBody) ||
        fb_sec_game.checkCollision(debrisLayer, debrisSprite, fb_sec_game.vendorBooth, fb_sec_game.vendorHead))
    {
        fb_sec_game.hurtSound.stop();
        fb_sec_game.hurtSound.play();

        this.tempaction = new lime.animation.Sequence(
            new lime.animation.MoveBy(30, 0).setDuration(0.2),
            new lime.animation.MoveBy(-60, 0).setDuration(0.2),
            new lime.animation.MoveBy(30, 0).setDuration(0.2)
        )

        fb_sec_game.tempFace = fb_sec_game.vendorNumber;

        fb_sec_game.vendorNumber = 0;

        fb_sec_game.updateVendorFace();

        this.tempaction.addEventListener(lime.animation.Event.STOP, function(e){
            fb_sec_game.vendorNumber = fb_sec_game.tempFace;
            fb_sec_game.updateVendorFace();
        });

        fb_sec_game.vendorLayer.runAction(this.tempaction);

    }
};

fb_sec_game.checkPermissionCollisions = function(debrisLayer, debrisSprite){

        this.acceptedList = [];
        this.deniedCount = 0;
        this.offset = 0;

        for(var k = 0; k < fb_sec_game.permissionObjects.length; k++)
        {
            if(!fb_sec_game.permissionObjects[k].accepted)
                this.deniedCount++;
            else
                this.acceptedList.push(1);
        }

    outer_loop:
        for(var i = 0; i < fb_sec_game.permissionObjects.length; i++)
        {
            if(fb_sec_game.permissionObjects[i].accepted &&
                fb_sec_game.checkPermissionCollision(debrisLayer, debrisSprite, i + 1 - this.offset, fb_sec_game.permissionObjects[i].sprite))
            {
                fb_sec_game.permissionObjects[i].accepted = false;


                if(fb_sec_game.vendorNumber > 1)
                    fb_sec_game.vendorNumber--;

                fb_sec_game.updateVendorFace();

                this.prev_pos = fb_sec_game.permissionObjects[i].layer.getPosition();

                this.temp1 = fb_sec_game.permissionLayer.getPosition();
                this.temp2 = new goog.math.Coordinate(this.temp1.x - (fb_sec_game.permissionObjects[i].sprite.getSize().width * (i / 2))  + fb_sec_game.permissionObjects[i].sprite.getSize().width * 0.25,
                    fb_sec_game.size.HEIGHT * 0.31);



                fb_sec_game.permissionLayer.removeChild(fb_sec_game.permissionObjects[i].layer);
                fb_sec_game.gameScene.appendChild(fb_sec_game.permissionObjects[i].layer);
                fb_sec_game.gameScene.removeChild(fb_sec_game.permissionLayer);
                fb_sec_game.gameScene.appendChild(fb_sec_game.permissionLayer);
                fb_sec_game.gameScene.removeChild(fb_sec_game.deliverymanLayer);
                fb_sec_game.gameScene.appendChild(fb_sec_game.deliverymanLayer);

                fb_sec_game.permissionObjects[i].layer.setPosition(this.temp2);
                fb_sec_game.permissionObjects[i].layer.setAnchorPoint(0.5,0.5);

                this.tempObj = fb_sec_game.permissionObjects[i];

                fb_sec_game.dragIndex = i;

                goog.events.listen(this.tempObj.layer, ['mousedown','touchstart'], function(e){

                    document.body.style.cursor = "pointer";

                    this.originalPos = this.getPosition();

                    //let target follow the mouse/finger
                    e.startDrag();

                    //listen for end event
                    e.swallow(['mouseup','touchend'],function(){
                        document.body.style.cursor = "crosshair";

                        this.runAction(new lime.animation.MoveTo(
                            goog.math.clamp(this.getPosition().x,
                                fb_sec_game.size.WIDTH *.05,
                                fb_sec_game.size.WIDTH *.8 - fb_sec_game.permissionObjects[fb_sec_game.dragIndex].sprite.getSize().width),
                            fb_sec_game.size.HEIGHT * 0.41
                        ));
                    });
                });



                for(var j = i + 1; j < fb_sec_game.permissionObjects.length; j++)
                {
                    if(fb_sec_game.permissionObjects[j].accepted)
                    {
                        var temp_pos = fb_sec_game.permissionObjects[j].layer.getPosition();
                        fb_sec_game.permissionObjects[j].layer.runAction(
                            new lime.animation.MoveTo(this.prev_pos)
                        );
                        this.prev_pos = temp_pos;
                    }
                }

                this.anim = new lime.animation.Spawn(
                    new lime.animation.ScaleTo(.8),
                    new lime.animation.RotateBy(360),
                    new lime.animation.MoveTo(this.temp2.x, fb_sec_game.size.HEIGHT * 0.41)
                );

                this.bodyDef = new box2d.BodyDef;
                this.bodyDef.position.Set(this.temp2.x, fb_sec_game.size.HEIGHT * 0.11);
                this.bodyDef.rotation = 0;

                this.shapeDef = new box2d.BoxDef;
                this.shapeDef.restitution = .9
                this.shapeDef.density = 0; // static
                this.shapeDef.friction = 1;
                this.shapeDef.extents.Set(32,32);

                this.bodyDef.AddShape(this.shapeDef);

                this.body = fb_sec_game.world.CreateBody(this.bodyDef);
                fb_sec_game.permissionObjects[i]._body = this.body; // just a reference

                var temp = fb_sec_game.permissionObjects[i];

                fb_sec_game.permissionObjects[i].layer.runAction(this.anim);

                console.log(fb_sec_game.permissionObjects[i].name);
                break outer_loop;
            }
            else if(!fb_sec_game.permissionObjects[i].accepted)
                this.offset++;
        }


};

fb_sec_game.updateVendorFace = function(){
    switch(fb_sec_game.vendorNumber){
        case 0:
            fb_sec_game.vendorHead.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('bored2.png'));
            break;
        case 1:
            fb_sec_game.vendorHead.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('mad3.png'));
            break;
        case 2:
            fb_sec_game.vendorHead.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('mad2.png'));
            break;
        case 3:
            fb_sec_game.vendorHead.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('mad1.png'));
            break;
        case 4:
            fb_sec_game.vendorHead.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('bored1.png'));
            break;
        case 5:
            fb_sec_game.vendorHead.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('bored3.png'));
            break;
        case 6:
            fb_sec_game.vendorHead.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('happy1.png'));
            break;
        case 7:
            fb_sec_game.vendorHead.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('happy2.png'));
            break;
        case 8:
            fb_sec_game.vendorHead.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('happy3.png'));
            break;
    }
};

fb_sec_game.checkPermissionCollision = function(debrisLayer, debrisSprite, checkLayer, checkSprite){
    this.b1 = new goog.math.Box(debrisLayer.getPosition().y,
        debrisLayer.getPosition().x + debrisSprite.getSize().width,
        debrisLayer.getPosition().y + debrisSprite.getSize().height,
        debrisLayer.getPosition().x);

    //box positions were getting wonky, have to do magic to bring them into world space for collision detection
    this.temp1 = fb_sec_game.permissionLayer.getPosition();
    this.temp2 = new goog.math.Coordinate(this.temp1.x - (checkSprite.getSize().width * (checkLayer / 2))  + checkSprite.getSize().width * 0.25,
        this.temp1.y - (checkSprite.getSize().height * (checkLayer)) + checkSprite.getSize().height * 1.25);


    this.b2 = new goog.math.Box(this.temp2.y,
        this.temp2.x + checkSprite.getSize().width,
        this.temp2.y + checkSprite.getSize().height,
        this.temp2.x);

    return goog.math.Box.intersects(this.b1, this.b2);
};