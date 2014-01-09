(function($) {

	var contents = [{
				imgUrl: './img/shay.jpg',
				name: 'Shay',
				description: 'Overly specific selectors break the cascade. The true key, and beauty, to CSS is keeping the specificity as low as possible.',
				postedTime: 'posted 22 hours ago'
			}, {
				imgUrl: './img/carolyn.jpg',
				name: 'Carolyn',
				description: 'Trying to figure out accommodations for SXSW Interactive. Anyone have an extra spot where they&#8217;re staying?',
				postedTime: 'posted 1 day ago'
			}, {
				imgUrl: './img/jason.jpg',
				name: 'Jason',
				description: 'Gotta address the anxiety forces. A stipend doesn&#8217;t address the root of the anxiety. The anxiety is coming from uncertainty, chores, &#8220;starting over&#8221;, etc.',
				postedTime: 'posted 2 days ago'
			}, {
				imgUrl: './img/darby.jpg',
				name: 'Darby',
				description: 'An out-of-country student worries about getting a phone to use, figuring out the public transit, getting from the airport to Chicago and finding a place to live.',
				postedTime: 'posted 1 day ago'
			}, {
				imgUrl: './img/erica.jpg',
				name: 'Erica',
				description: 'Shout out to Carolyn for her work on The Women Driving Chicago&#8217;s Digital Renaissance!',
				postedTime: 'posted 2 days ago'
			}, {
				name: 'Erica',
				description: 'Shout out to Carolyn for her work on The Women Driving Chicago&#8217;s Digital Renaissance!',
				postedTime: 'posted 2 days ago'
			}, {
				imgUrl: './img/tracy.jpg',
				name: 'Tracy',
				description: 'Your first impulse should be to play, we learn faster through play.',
				postedTime: 'posted 4 days ago'
			}];

	var Content = Backbone.Model.extend({
		defaults: {
			imgUrl: './images/placeholder.png',
			postedTime: 'posted 1sec ago'
		}
	});

	var Collection = Backbone.Collection.extend({
		model: Content
	});

	var ContentView = Backbone.View.extend({
		tagName: 'li',
		className: 'media col-gutters pad-top',
		template: $('#media').html(),

		render: function() {
			var tmpl = _.template(this.template);
			$(this.el).html(tmpl(this.model.toJSON()));
			return this;
		}
	});

	var AppView = Backbone.View.extend({
		el: $('.container'),

		events: {
			'click .media': 'filter',
			'click .new-message': 'showForm',
			'click #send': 'addMessage'
		},

		initialize: function() {
			this.sortIndex = 'a-z';
			this.collection = new Collection(contents);
			this.render();
			this.collection.on('reset', this.render, this);
			this.collection.on('add', this.render, this);
		},

		render: function() {
			var self = this;
			this.$el.find('.media').remove();
			_.each(this.collection.models, function(item) {
				self.renderContent(item);
			}, this);
		},

		renderContent: function(item) {
			var contentView = new ContentView({
				model: item
			});
			this.$el.find('.media-primary').append(contentView.render().el);
		},

		filter: function() {
			if(this.sortIndex == 'a-z') {
				this.collection._compareAZ();
				this.sortIndex = 'z-a';
			} else if (this.sortIndex == 'z-a') {
				this.collection._compareZA();
				this.sortIndex = 'a-z';
			}
		},

		showForm: function() {
			this.$el.find('#addMessage').slideToggle();
		},

		addMessage: function(e) {
			e.preventDefault();

			var formData = {};


			$('#addMessage').children('input').each(function(i, item) {
				if ($(item).val() !== '') {
					formData[item.id] = $(item).val();
				}
			});
			var description = $('#addMessage').find('textarea');
			if (description !== '') {
				formData['description'] = description.val();
			}
			contents.push(formData);
			this.collection.add(new Content(formData));
			console.log(contents);
		}

	});

	var app = new AppView();

})(jQuery);
