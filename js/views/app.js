var app = app || {};

app.AppView = Backbone.View.extend({
	el: "#todoapp",

	//statsTemplate: _.template($('#status-template').html() ),

	initialize: function() {
		this.input = this.$('#new-todo');
		this.allCheckbox = this.$('#toggle-all')[0];
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		window.app.Todos.on('add', this.addOne, this);
		window.app.Todos.on('reset', this.addAll, this);
		window.app.Todos.on('all', this.render, this);

		app.Todos.fetch();
	},

	render: function(){
		var completed = app.Todos.completed().length();
		var remaining = app.Todos.remaining().length();

		if (app.Todos.length){
			this.$main.show();
			this.$footer.show();

			this.$footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}));
		}
		else {
			this.$main.hide();
			this.$footer.hide();

		}

		this.allCheckbox.checked = !remaining;
	},

	addOne: function() {
		var view =  new app.Todo.View({ model: todo });
		$('#todo-list').append(view.render().el);
	},

	addAll: function() {
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne, this);
	},
});