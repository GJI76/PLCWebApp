describe("Executing `connectCommands` with a hash as the first argument",function(){var n,e,t,o,c,a,r="one",h="two";beforeEach(function(){e=function(){},t=function(){},n=Wreqr.radio.channel("foo"),a={},a[h]=e,a[r]=t,c=n.connectCommands(a),o=n.commands._wreqrHandlers||{}}),afterEach(function(){n.reset()}),it("should attach the listeners to the Channel",function(){expect(_.keys(o)).toEqual([h,r])}),it("should return the Channel",function(){expect(c).toBe(n)})});