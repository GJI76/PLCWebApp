define(["backbone", "rivets", "views/item/WidgetMulti", "text!./template.js", "utils/SignalChainFunctions", "utils/SignalChainClasses"], function(t, i, e, o) {
    return e.extend({
        ins: [{
            title: "in1",
            to: "in1"
        }, {
            title: "in2",
            to: "in2"
        }, {
            title: "in3",
            to: "in3"
        }, {
            title: "in4",
            to: "in4"
        }],
        outs: [{
            title: "out1",
            from: "output",
            to: "out1"
        }],
        sources: [],
        typeID: "Boolean",
        categories: ["logic"],
        className: "boolean",
        template: _.template(o),
        initialize: function(t) {
            e.prototype.initialize.call(this, t), this.model.set({
                title: "Boolean",
                in1: "-",
                in2: "-",
                in3: "-",
                in4: "-",
                output: 0,
                "boolean": "all",
                ifFalse: 0,
                ifTrue: 1023,
                threshold: 512
            }), this.stateHighlight = "#f8c885"
        },
        onRender: function() {
            e.prototype.onRender.call(this)
        },
        onModelChange: function(t) {
            if (void 0 !== t.changedAttributes().in1 || void 0 !== t.changedAttributes().in2 || void 0 !== t.changedAttributes().in3 || void 0 !== t.changedAttributes().in4) {
                var i = this.model.get("threshold"),
                    e = [parseFloat(this.model.get("in1")), parseFloat(this.model.get("in2")), parseFloat(this.model.get("in3")), parseFloat(this.model.get("in4"))],
                    o = !1;
                if ("all" === this.model.get("boolean"))
                    for (var o = !0, s = 0; s < e.length; s++) !isNaN(e[s]) && e[s] < i && (o = !1);
                else if ("any" === this.model.get("boolean"))
                    for (var s = 0; s < e.length; s++) !isNaN(e[s]) && e[s] >= i && (o = !0);
                o ? (this.$(".ifTrue").css("background-color", this.stateHighlight), this.$(".ifFalse").css("background-color", "#fff"), this.model.set("output", this.model.get("ifTrue"))) : (this.$(".ifTrue").css("background-color", "#fff"), this.$(".ifFalse").css("background-color", this.stateHighlight), this.model.set("output", this.model.get("ifFalse")))
            }
        }
    })
});