define(["backbone", "views/item/WidgetMulti", "text!./template.js", "codemirror"], function(t, i, e, n) {
    return i.extend({
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
        sources: [],
        typeID: "Code",
        className: "code",
        categories: ["logic"],
        template: _.template(e),
        initialize: function(t) {
            t || (t = {});
            var e = '// Enter your Javascript here to process inputs and return the outputs\n// The four input values are in an array called "ins" as\n// ins.in1, ins.in2, ins.in3, ins.in4\n//\n// The four output values are returned as an array with four elements\n//\nvar out1 = ins.in1 + ins.in2;\nvar out2 = ins.in2;\nvar out3 = ins.in3;\nvar out4 = ins.in4;\n\nreturn [ out1, out2, out3, out4 ];';
            _.extend(t, {
                filter: e,
                in1: 0,
                in2: 0,
                in3: 0,
                in4: 0,
                out1: 0,
                out2: 0
            }), i.prototype.initialize.call(this, t), this.model.set("title", "Code"), this.model.on("change", function(t) {
                t.changedAttributes().filter && this.registerFilters()
            }, this)
        },
        onRender: function() {
            i.prototype.onRender.call(this);
            var t = this;
            this.registerFilters();
            var e = n.fromTextArea(this.$(".filterFunction")[0], {
                lineNumbers: !0,
                smartIndent: !0,
                mode: "javascript"
            });
            e.on("blur", function() {
                t.model.set("filter", e.getValue()), t.registerFilters.apply(t)
            }), this.$(".widgetBottom .tab").click(function() {
                e.refresh()
            })
        },
        onModelChange: function() {
            var t = new Function("var ins = arguments[0]; " + this.model.get("filter")),
                i = t({
                    in1: this.model.get("in1"),
                    in2: this.model.get("in2"),
                    in3: this.model.get("in3"),
                    in4: this.model.get("in4")
                });
            if (void 0 !== i)
                if (i instanceof Array)
                    for (var e = this.outs.length - 1; e >= 0; e--) this.model.set(this.outs[e].from, i[e]);
                else this.model.set("output", i)
        },
        registerFilters: function() {}
    })
});