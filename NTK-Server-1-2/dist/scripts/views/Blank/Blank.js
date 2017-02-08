define(["backbone", "rivets", "views/item/WidgetMulti", "text!./template.js", "utils/SignalChainFunctions", "utils/SignalChainClasses", "jqueryknob", "utils/utils"], function(t, i, e, n, s, l, o, a) {
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
        }, {
            title: "out2",
            from: "output2",
            to: "out2"
        }, {
            title: "out3",
            from: "output3",
            to: "out3"
        }, {
            title: "out4",
            from: "output4",
            to: "out4"
        }],
        widgetEvents: {},
        typeID: "Blank",
        className: "blank",
        template: _.template(n),
        initialize: function(t) {
            e.prototype.initialize.call(this, t), this.model.set({
                title: "Blank",
                limit: !0
            }), this.signalChainFunctions.push(this.limitRange)
        },
        onRender: function() {
            e.prototype.onRender.call(this);
            var t = this;
            this.$(".dial").knob({
                fgColor: "#000000",
                bgColor: "#ffffff",
                inputColor: "#000000",
                angleOffset: -125,
                angleArc: 250,
                width: 80,
                height: 62,
                font: "'Helvetica Neue', sans-serif",
                displayInput: !1,
                min: 0,
                max: 1023,
                change: function(i) {
                    t.model.set("in", parseInt(i))
                }
            }), i.binders.knob = function(t, i) {
                t.value = i, $(t).val(i), $(t).trigger("change")
            }
        },
        onModelChange: function(t) {
            t.changedAttributes();
            void 0 === t.changedAttributes().testAnother && a.async(function() {
                this.model.set("testAnother", !this.model.get("testAnother"))
            }, this)
        },
        limitRange: function(t) {
            var i = t;
            return i = Math.max(i, 0), this.model.get("limit") && (i = Math.min(i, 512)), Number(i)
        }
    })
});