Marionette.MonitorDOMRefresh=function(n){function e(n){n._isShown=!0,o(n)}function t(n){n._isRendered=!0,o(n)}function o(n){n._isShown&&n._isRendered&&i(n)&&_.isFunction(n.triggerMethod)&&n.triggerMethod("dom:refresh")}function i(e){return n.contains(e.el)}return function(n){n.listenTo(n,"show",function(){e(n)}),n.listenTo(n,"render",function(){t(n)})}}(document.documentElement);