var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

//Models
playerModel = Backbone.Model.extend({
	defaults: {
		score: 0,
		name: 'Player'
	},
});

//Viewd
bodyView = Backbone.View.extend({
	el: 'body',
	
	events: {
		'keydown': 'keypressListener',	
		'click #panel': 'toggleMenu',
		'click #menu': 'toggleMenu',
	},

	initialize: function() {
	},

	keypressListener: function(e) {
		var key = e.keyCode || e.which;

		switch(key) {
			case 49:
				this.addPoint(p1);
				break;
			case 50:
				this.addPoint(p2);
				break;
			case 81:
				this.subtractPoint(p1);
				break;
			case 87:
				this.subtractPoint(p2);
				break;
			case 77:
				this.toggleMenu();
			default:
				console.log(key);
		}

	},

	addPoint: function(model) {
		model.set('score', model.get('score')+1);
	},

	subtractPoint: function(model) {
		if (model.get('score')>0)
			model.set('score', model.get('score')-1);
	},

	toggleMenu: function() {
		slideout.toggle();
	}
});

playerView = Backbone.View.extend({
	initialize: function() {
		//Listen to model changes
		this.model.on('change', this.render, this);

		this.render();
	},

	render: function() {
		$(this.el).html(this.model.get('score'));
	},
});

p1 = new playerModel;
p2 = new playerModel;

body = new bodyView;

p1View = new playerView({
	model: p1,
	el: "#score-display-1"
});
p2View = new playerView({
	model: p2,
	el: '#score-display-2'
});	

//Init the slideout menu
var slideout = new Slideout({
	'panel': document.getElementById('panel'),
	'menu': document.getElementById('menu'),
	'padding': 256,
	'tolerance': 70
});	
