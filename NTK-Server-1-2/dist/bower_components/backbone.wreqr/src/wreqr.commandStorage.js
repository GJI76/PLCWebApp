Wreqr.CommandStorage=function(){var n=function(n){this.options=n,this._commands={},_.isFunction(this.initialize)&&this.initialize(n)};return _.extend(n.prototype,Backbone.Events,{getCommands:function(n){var t=this._commands[n];return t||(t={command:n,instances:[]},this._commands[n]=t),t},addCommand:function(n,t){var i=this.getCommands(n);i.instances.push(t)},clearCommands:function(n){var t=this.getCommands(n);t.instances=[]}}),n}();