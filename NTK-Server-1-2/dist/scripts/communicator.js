define(["backbone","backbone.marionette","HubAdapter"],function(e){var n=e.Marionette.Controller.extend({initialize:function(){this.mediator=new e.Wreqr.EventAggregator,this.reqres=new e.Wreqr.RequestResponse,this.command=new e.Wreqr.Commands}});return new n});