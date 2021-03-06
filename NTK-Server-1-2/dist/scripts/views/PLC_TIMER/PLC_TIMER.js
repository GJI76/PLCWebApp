// Based on the Pulse widget
// Originally, The input the user would give would change at half that 
// interval. We doubled the value so that the signal would change at the time
// they set. 
// COMPARE to PULSE input widget

define(["backbone", "rivets", "views/item/WidgetMulti", "text!./template.js", "utils/SignalChainFunctions", "utils/SignalChainClasses"], function(t, e, i, s) {
    return i.extend({
        ins: [{
            title: "in",
            to: "in"
        }, {
            title: "pulseLength",
            to: "timerLength"
        }],
        outs: [{
            title: "out1",
            from: "output",
            to: "out1"
        }],
        sources: [],
		
		// Setting appearance of the widget
        typeID: "PLC_TIMER",
        className: "PLC_TIMER",
        categories: ["PLC"],
        template: _.template(s),
        initialize: function(t) {
            i.prototype.initialize.call(this, t), this.model.set({
				
                title: "PLC_TIMER",
                "in": "--",
                out1: 0,
                pulseLow: 0,
                pulseHigh: 1023,
                threshold: 512,
                timerFiring: !0,
                timerState: "off",
                timerStart: Date.now(),
                timerLength: 1e3,
                timerHighPercentage: 50,
                randOut: !1,
                randOutPulse: !0,
                randLow: 0,
                randHigh: 1023,
                randTime: !1,
                randTimeLow: 750,
                randTimeHigh: 2e3
				// Value Doubled
            }), this.stateHighlight = "#f8c885", this.domReady = !1, this.lastTimeLength = this.model.get("timerLength") * 2, this.localTimeKeeperFunc = function(t) {
                this.timeKeeper(t)
            }.bind(this), window.app.timingController.registerFrameCallback(this.localTimeKeeperFunc, this)
        },
        onRender: function() {
            i.prototype.onRender.call(this);
            app.server || (this.$(".pulseHigh").css("background-color", "#fff"), this.$(".pulseLow").css("background-color", this.stateHighlight)), this.domReady = !0
        },
        onRemove: function() {
            window.app.timingController.removeFrameCallback(this.localTimeKeeperFunc, this)
        },
        onModelChange: function(t) {
            void 0 === t.changedAttributes().in || isNaN(t.changedAttributes().in) || (this.model.get("in") >= this.model.get("threshold") ? this.model.get("timerFiring") || (this.model.set("timerFiring", !0), app.server || (this.$(".pulseHigh").css("background-color", "#fff"), this.$(".pulseLow").css("background-color", this.stateHighlight)), this.initTimer()) : this.model.get("timerFiring") && (this.model.set("timerFiring", !1), (!this.model.get("randOut") || this.model.get("randOutPulse")) && (this.model.set("output", parseFloat(this.model.get("pulseLow"), 10)), app.server || (this.$(".pulseHigh").css("background-color", "#fff"), this.$(".pulseLow").css("background-color", this.stateHighlight)))))
        },
        timeKeeper: function() {
            if (this.domReady && this.model.get("timerFiring")) {
                {
                    Date.now() - this.model.get("timerStart")
                }
                if (!this.model.get("randOut") || this.model.get("randOutPulse")) {
					// Value doubled here
                    var t = Math.round(this.model.get("timerLength") * 2 * (this.model.get("timerHighPercentage") / 100));
                    Date.now() - this.model.get("timerStart") > t && (this.model.set("output", parseFloat(this.model.get("pulseLow"), 10)), app.server || (this.$(".pulseHigh").css("background-color", "#fff"), this.$(".pulseLow").css("background-color", this.stateHighlight)))
                }
				
				// Value doubled here
                Date.now() - this.model.get("timerStart") > this.model.get("timerLength") * 2 && (this.model.set("output", parseFloat(this.model.get("pulseHigh"), 10)), app.server || (this.$(".pulseHigh").css("background-color", this.stateHighlight), this.$(".pulseLow").css("background-color", "#fff")), this.initTimer())
            }
        },
        initTimer: function() {
            this.model.set("timerStart", Date.now()), this.model.get("randTime") && this.setRandomTime(), this.model.get("randOut") && this.setRandomOut()
        },
        setRandomTime: function() {
            var t = parseFloat(this.model.get("randTimeLow"), 10),
                e = parseFloat(this.model.get("randTimeHigh"), 10),
                i = Math.floor(Math.random() * (e - t)) + t;
            this.model.set("timerLength", i)
        },
        setRandomOut: function() {
            var t = parseFloat(this.model.get("randLow"), 10),
                e = parseFloat(this.model.get("randHigh"), 10),
                i = Math.floor(Math.random() * (e - t + 1)) + t;
            this.model.set("pulseHigh", i)
        }
    })
});