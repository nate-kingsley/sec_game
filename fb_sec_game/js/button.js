//set main namespace
goog.provide('fb_sec_game.Button');


//get requirements
goog.require('lime.RoundedRect');
goog.require('lime.Label');
goog.require('lime.GlossyButton');


fb_sec_game.Button = function(txt) {
    lime.GlossyButton.call(this, txt);

    this.borderWidth = 4;
    this.setColor('#05C', 1, 1);
    this.iconSprite = new lime.RoundedRect().setRadius(10);

};
goog.inherits(fb_sec_game.Button, lime.GlossyButton);

/**
 * @inheritDoc
 */
fb_sec_game.Button.prototype.makeState_ = function() {
    var state = new lime.RoundedRect().setRadius(10);
    state.inner = new lime.RoundedRect().setRadius(10);
    state.label = new lime.Label().setAlign('center').
        setFontFamily('"Trebuchet MS"').setFontColor('#fff').setFontSize(28);

    state.appendChild(state.inner);
    state.appendChild(state.label);
    return state;
};

/**
 * @inheritDoc
 */
fb_sec_game.Button.prototype.setColor = function(clr, iop, lop) {
        clr = lime.fill.parse(clr);
        goog.array.forEach([this.upstate, this.downstate], function(s) {
            var c = s == this.downstate ? clr.clone().addBrightness(.6) : clr;
            //s.setFill(c);
            var c2 = c.clone().addBrightness(.1);
            var grad = new lime.fill.LinearGradient().setDirection(1, 1, 1, 0);
            grad.addColorStop(0, c2);
            grad.addColorStop(.45, c);
            grad.addColorStop(.55, c);
            grad.addColorStop(1, c2);
            s.inner.setFill(grad);
            s.inner.setOpacity(iop);
            s.label.setOpacity(lop);
        },this);
    return this;
};