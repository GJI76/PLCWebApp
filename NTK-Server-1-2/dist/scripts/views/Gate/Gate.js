define(["backbone", "rivets", "views/item/WidgetMulti", "text!./template.js", "utils/SignalChainFunctions", "utils/SignalChainClasses"], function(t, e, i, s) {
    return i.extend({
        ins: [{
            title: "inGate",
            to: "inGate"
        }, {
            title: "inFalse",
            to: "inFalse"
        }, {
            title: "inTrue",
            to: "inTrue"
        }],
        outs: [{
            title: "out1",
            from: "output",
            to: "out1"
        }],
        sources: [],
        typeID: "Gate",
        categories: ["logic"],
        className: "gate",
        template: _.template(s),
        initialize: function(t) {
            i.prototype.initialize.call(this, t), this.model.set({
                title: "Gate",
                inGate: 0,
                inTrue: "T",
                inFalse: "F",
                out1: 0,
                ifFalse: 0,
                ifTrue: 1023,
                threshold: 512
            }), this.stateHighlight = "#f8c885"
        },
        onRender: function() {
            i.prototype.onRender.call(this)
        },
        onModelChange: function(t) {
            if (void 0 !== t.changedAttributes().inGate || void 0 !== t.changedAttributes().inTrue || void 0 !== t.changedAttributes().inFalse) {
                var e = parseFloat(this.model.get("inFalse")),
                    i = parseFloat(this.model.get("inTrue"));
                isNaN(i) || this.model.set("ifTrue", i), isNaN(e) || this.model.set("ifFalse", e);
                var s = this.model.get("threshold");
                this.model.get("inGate") >= s ? (this.$(".ifTrue").css("background-color", this.stateHighlight), this.$(".ifFalse").css("background-color", "#fff"), this.model.set("output", this.model.get("ifTrue"))) : (this.$(".ifTrue").css("background-color", "#fff"), this.$(".ifFalse").css("background-color", this.stateHighlight), this.model.set("output", this.model.get("ifFalse")))
            }
        }
    })
});