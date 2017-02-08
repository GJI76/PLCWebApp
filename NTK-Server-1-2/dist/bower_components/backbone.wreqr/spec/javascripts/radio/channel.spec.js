describe("radio.channel",function(){var n;describe("with no arguments",function(){it("should throw an exception",function(){expect(function(){Wreqr.radio.channel()}).toThrow()})}),describe("for a nonexistent channel",function(){beforeEach(function(){n=Wreqr.radio.channel("lala")}),it("should return an instance of the default channel",function(){expect(n.channelName).toEqual("lala")})}),describe("twice with the same name",function(){var n,e;beforeEach(function(){n=Wreqr.radio.channel("lala"),e=Wreqr.radio.channel("lala")}),it("should return the same channel",function(){expect(n).toBe(e)})})});