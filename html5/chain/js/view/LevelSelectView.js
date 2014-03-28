/**
 * Created by postepenno on 31.01.14.
 */

var LevelSelectView = ComponentBox.extend({

    init: function(game) {

        this.game = game;

        this._super();

        //this.addComponent( new Background() );

        this.itemsContainer = new createjs.Container();
        Main.viewContainer.addChild(this.itemsContainer);

        this.groups = [];
        for (var i = 0; i < 3; i++)
        {
            var group = new LevelsGroup(i, this.game, this.itemsContainer);
            this.addComponent(group);
            this.groups.push(group);
        }

        this.curGroup = 0;

        this.addComponent( new Picture(Main.viewContainer, "levelSelectTitle", {x:0, y:10}) );

        var homeButton = new Button(Main.viewContainer, "homeButton", this.homeClick, this, {x:40, y:440, center:true});
        this.addComponent(homeButton);

        this.scrollUp = new Button(Main.viewContainer, "homeButton", this.scrollUpClick, this, {x:280, y:440, center:true});
        this.scrollUp.bmp.rotation = 90;
        this.addComponent(this.scrollUp);

        this.scrollDown = new Button(Main.viewContainer, "homeButton", this.scrollDownClick, this, {x:205, y:440, center:true});
        this.scrollDown.bmp.rotation = -90;
        this.addComponent(this.scrollDown);

        this.scrollUp.hide();
    },

    scrollUpClick: function(bt, thisRef)
    {
        if (thisRef.curGroup == 1) thisRef.scrollUp.scaleHide();
        else if (thisRef.curGroup == 2) thisRef.scrollDown.scaleShow();

        thisRef.curGroup--;

        thisRef.scrollUp.disableClick();
        thisRef.scrollDown.disableClick();

        createjs.Tween.get(thisRef.itemsContainer)
            .to({y:-Config.HEIGHT * thisRef.curGroup}, 500, createjs.Ease.quadInOut)
            .call(thisRef.scrollComplete, [], thisRef)
    },

    scrollDownClick: function(bt, thisRef)
    {
        if (thisRef.curGroup == 0) thisRef.scrollUp.scaleShow();
        else if (thisRef.curGroup == 1) thisRef.scrollDown.scaleHide();

        thisRef.curGroup++;

        thisRef.scrollUp.disableClick();
        thisRef.scrollDown.disableClick();


        createjs.Tween.get(thisRef.itemsContainer)
            .to({y:-Config.HEIGHT * thisRef.curGroup}, 500, createjs.Ease.quadInOut)
            .call(thisRef.scrollComplete, [], thisRef)
    },

    scrollComplete: function()
    {
        this.scrollUp.enableClick();
        this.scrollDown.enableClick();
    },

    homeClick: function(bt, thisRef)
    {
        Main.removeViewByClass(LevelSelectView);
        Main.addView( new MainMenuView(thisRef.game) );
    },

    gameStart: function()
    {
        Main.removeViewByClass(MainMenuView);
        this.game.levelStart(0);
    },

    destroy: function()
    {
        this._super();

        Main.viewContainer.removeChild(this.itemsContainer);
    }


});