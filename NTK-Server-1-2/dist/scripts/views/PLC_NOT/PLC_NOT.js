/* 
	This code is copied from the IfThen. It has been modified to change title.
	The code has also been modified so that it acts as an inverter.
*/

define(["backbone", "rivets", "views/item/WidgetMulti", "text!./template.js", "utils/SignalChainFunctions", "utils/SignalChainClasses"], function(t, e, i, a) {
    return i.extend({
        ins: [{
            title: "in",
            to: "in"
        }],
        outs: [{
            title: "out",
            from: "in",
            to: "out"
        }],
        widgetEvents: {
            "change .dataTypeNum": "changeDataType",
            "change .dataTypeText": "changeDataType"
        },
		
		// Setting the appearance of the widget
        typeID: "PLC_NOT",
        categories: ["PLC"],
        className: "PLC_NOT",
        template: _.template(a),
        initialize: function(t) {
            i.prototype.initialize.call(this, t), this.model.set({
                title: "PLC_NOT",
				
				// setting the operator to act as a NOT gate.
				// Works because user cannot change the mode of the switch.
				// The template.js file for this code removed this function
                operator: "<",
                operatorStr: "contains",
                compareValue: 512,
                compareRange: 150,
                ifFalse: 0,
                ifTrue: 1023,
                waitTimeTrue: 0,
                waitTimeFalse: 0,
                dataType: "number",
                text_comparison: "Hello world",
                textDelimiter: ",",
                ifState: "falseOn"
            }), this.stateHighlight = "#f8c885", this.waitLastTrueState = !1, this.waitLastFalseState = !1, this.waitTimeTrueStart = 0, this.waitTimeFalseStart = 0, this.waitTimer = 0, this.blinkTimer = 0, this.signalChainFunctions.push(this.ifTest)
        },
        onRender: function() {
            i.prototype.onRender.call(this);
            var t = this.model.get("in");
            this.model.set("in", -1), this.model.set("in", t), this.changeDataType()
        },
        ifTest: function(t) {
            var e = this,
                i = 300,
                a = parseFloat(this.model.get("compareValue"), 10),
                s = parseFloat(this.model.get("compareRange"), 10) / 2,
                r = this.model.get("text_comparison").toLowerCase().trim(),
                l = parseInt(this.model.get("waitTimeTrue"), 10),
                o = parseInt(this.model.get("waitTimeFalse"), 10),
                h = !1,
                n = this.model.get("operator"),
                m = t;
            switch ("text" == this.model.get("dataType") && (n = this.model.get("operatorStr"), m = t.toString().toLowerCase().trim()), n) {
                case "~=":
                    m >= a - s && a + s >= t && (h = !0);
                    break;
                case ">":
                    m > a && (h = !0);
                    break;
                case "<":
                    a > m && (h = !0);
                    break;
                case "equals":
                    m == r && (h = !0);
                    break;
                case "contains":
                    for (var f = r.split(this.model.get("textDelimiter")), u = 0; u < f.length; u++) m.indexOf(f[u].trim()) >= 0 && (h = !0);
                    break;
                case "part":
                    r.indexOf(m) >= 0 && (h = !0)
            }
            if (1 == h)
                if (this.waitLastFalseState = !1, 0 == l || "falseWaiting" == this.model.get("ifState")) i = this.model.get("ifTrue"), this.model.set("ifState", "trueOn"), this.waitLastTrueState = !0, clearTimeout(this.waitTimer);
                else {
                    var T = new Date;
                    0 == this.waitLastTrueState ? (this.waitTimeTrueStart = T.getTime(), this.waitLastTrueState = !0, this.model.set("ifState", "trueWaitStart"), i = this.model.get("ifFalse"), clearTimeout(this.waitTimer), setTimeout(function() {
                        1 == e.waitLastTrueState && (e.model.set("ifState", "trueOn"), e.model.set("out", e.model.get("ifTrue")))
                    }, l)) : T.getTime() - this.waitTimeTrueStart >= l ? (i = this.model.get("ifTrue"), this.model.set("ifState", "trueOn")) : (i = this.model.get("ifFalse"), this.model.set("ifState", "trueWaiting")), this.waitLastTrueState = !0
                }
            else if (this.waitLastTrueState = !1, 0 == o || "trueWaiting" == this.model.get("ifState")) i = this.model.get("ifFalse"), this.model.set("ifState", "falseOn"), this.waitLastFalseState = !0, clearTimeout(this.waitTimer);
            else {
                var T = new Date;
                0 == this.waitLastFalseState ? (this.waitTimeFalseStart = T.getTime(), this.waitLastFalseState = !0, this.model.set("ifState", "falseWaitStart"), i = this.model.get("ifTrue"), clearTimeout(this.waitTimer), this.waitTimer = setTimeout(function() {
                    1 == e.waitLastFalseState && (e.model.set("ifState", "falseOn"), e.model.set("out", e.model.get("ifFalse")))
                }, o)) : T.getTime() - this.waitTimeFalseStart >= o ? (i = this.model.get("ifFalse"), this.model.set("ifState", "falseOn")) : (i = this.model.get("ifTrue"), this.model.set("ifState", "falseWaiting")), this.waitLastFalseState = !0
            }
            Number(i);
            return isNaN(Number(i)) ? i : Number(i)
        },
        onModelChange: function(t) {
            t.changedAttributes().ifState && ("trueOn" == this.model.get("ifState") ? (clearInterval(this.blinkTimer), this.$(".ifTrue").css("background-color", this.stateHighlight), this.$(".ifFalse").css("background-color", "#fff")) : "trueWaitStart" == this.model.get("ifState") ? (clearInterval(this.blinkTimer), this.blinkTimer = this.blinkState(this.$(".ifTrue"))) : "falseOn" == this.model.get("ifState") ? (clearInterval(this.blinkTimer), this.$(".ifTrue").css("background-color", "#fff"), this.$(".ifFalse").css("background-color", this.stateHighlight)) : "falseWaitStart" == this.model.get("ifState") && (clearInterval(this.blinkTimer), this.blinkTimer = this.blinkState(this.$(".ifFalse"))))
        },
        blinkState: function(t) {
            var e = !1,
                i = this,
                a = setInterval(function() {
                    e ? (t.css("background-color", "#fff"), e = !1) : (t.css("background-color", i.stateHighlight), e = !0)
                }, 150);
            return a
        },
        changeDataType: function() {
            if (!app.server) {
                var t = this.model.get("dataType");
                switch (t) {
                    case "number":
                        this.$(".ifNumber").show(), this.$(".ifText").hide();
                        break;
                    case "text":
                        this.$(".ifNumber").hide(), this.$(".ifText").show()
                }
            }
        }
    })
});