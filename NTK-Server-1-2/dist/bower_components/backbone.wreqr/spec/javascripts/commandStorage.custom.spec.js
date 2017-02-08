describe("command storage - custom storage",function(){describe("when providing a custom storage type as a constructor function to a Commands type",function(){var e,a;beforeEach(function(){a=function(){},_.extend(a,{addCommand:jasmine.createSpy("add command"),getCommands:jasmine.createSpy("get commands"),clearCommands:jasmine.createSpy("clear commands")});var t=Wreqr.Commands.extend({storageType:a});e=new t}),it("should instantiate and use that storage type",function(){expect(e.storage instanceof a).toBe(!0)})}),describe("when providing a custom storage type as an object literal to a Commands type",function(){var e,a;beforeEach(function(){a={addCommand:jasmine.createSpy("add command"),getCommands:jasmine.createSpy("get commands"),clearCommands:jasmine.createSpy("clear commands")};var t=Wreqr.Commands.extend({storageType:a});e=new t}),it("should instantiate and use that storage type",function(){expect(e.storage).toBe(a)})}),describe("when providing a custom storage type as a constructor function to a Commands instance",function(){var e,a;beforeEach(function(){a=function(){},_.extend(a,{addCommand:jasmine.createSpy("add command"),getCommands:jasmine.createSpy("get commands"),clearCommands:jasmine.createSpy("clear commands")}),e=new Wreqr.Commands({storageType:a})}),it("should instantiate and use that storage type",function(){expect(e.storage instanceof a).toBe(!0)})}),describe("when providing a custom storage type as an object literal to a Commands instance",function(){var e,a;beforeEach(function(){a={addCommand:jasmine.createSpy("add command"),getCommands:jasmine.createSpy("get commands"),clearCommands:jasmine.createSpy("clear commands")},e=new Wreqr.Commands({storageType:a})}),it("should instantiate and use that storage type",function(){expect(e.storage).toBe(a)})})});