var app = app || {};

var TodoList = Backbone.Collection.extend({
	//Reference to this collection's model
	model: app.Todo,

	//save all todo-items under the "todo's" namespace
	localStorage: new Backbone.LocalStorage('todos-backbone'),

	//Filter down the list of all todo items that are finished
	completed: function() {
		return this.filter( function(todo) {
			return todo.get('completed');
		});
	},

	//Filter the list of only items that are not finished
	remaining: function() {
		return this.without.apply(this, this.completed());
	},

	nextOrder: function() {
		if (!this.length) {
			return 1;
		}
		return this.last().get('order') + 1;
	},

	//Todos are sorted by their original insertion order
	comparator: function() {
		return todo.get('order');
	}
});