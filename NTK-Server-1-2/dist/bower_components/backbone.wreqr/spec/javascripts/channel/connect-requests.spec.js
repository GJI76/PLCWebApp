describe("Executing `connectRequests` with a hash as the first argument",function(){var e,t,n,c,o,r,s="one",a="two";beforeEach(function(){t=function(){},n=function(){},e=Wreqr.radio.channel("test"),r={},r[a]=t,r[s]=n,o=e.connectRequests(r),c=e.reqres._wreqrHandlers||{}}),afterEach(function(){e.reset()}),it("should attach the listeners to the Channel",function(){expect(_.keys(c)).toEqual([a,s])}),it("should return the Channel",function(){expect(o).toBe(e)})});