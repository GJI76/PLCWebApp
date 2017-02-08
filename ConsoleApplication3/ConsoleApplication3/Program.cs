using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.UI;
using System.Web.Script.Serialization;



public class Widget
{
    public string wid { get; set; }     //widget id
                                      
    public string typeID { get; set; }      //name of block
        
    public string in1 { get; set; }			//Each widget has up to 4 inputs, this keeps track of all of them
    public string in2 { get; set; }
    public string in3 { get; set; }
    public string in4 { get; set; }
    public string instuff { get; set; }		//these are for input and output blocks such as power sources or the final device
    public string outstuff { get; set; }
    public int output { get; set; }
}
public class Mapping
{
    public string viewWID { get; set; }		//For mapping this will tell what the type of input and output blocks are
    public string modelWID { get; set; }

}

public class Example
{
    public List<Widget> widgets { get; set; }		//Keeps track of all the individual widgets and their mapping values
    public List<Mapping> mappings { get; set; }
}

namespace program
{
    class program
    {
        static void Main()
        {
            string text = System.IO.File.ReadAllText(@"C:\Users\sumit\Documents\data.json"); //reads the file
            text = text.Replace("\"in\"", "\"instuff\"");	//adjusts json slightly so it is more readable with interpreter
            text = text.Replace("\"out\"", "\"outstuff\"");
            System.IO.File.WriteAllText(@"C:\Users\sumit\Documents\data.json", text);	//write to another json file once in readable format
            Example Widget = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<Example>(System.IO.File.ReadAllText(@"C:\Users\sumit\Documents\data.json")); //serializer to read all the data into the organized array from json file
                Example Mapping = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<Example>(System.IO.File.ReadAllText(@"C:\Users\sumit\Documents\data.json")); //seperate all the values that fall under the "mapping" criteria
                foreach (var item in Widget.widgets)	//sorts all the criteria for each widget and then maps it in a neat way
                {
                if (item.typeID == "DigitalIn" || item.typeID == "DigitalOut" || item.typeID == "AnalogIn" || item.typeID == "AnalogOut") //loop to organize into different catagories for input and output data by each class
                {
                    Console.WriteLine("widget id: {0}, TypeID: {1}, in: {2}, out: {3},", item.wid, item.typeID, item.instuff, item.outstuff);
                    foreach (var obj in Mapping.mappings)
                    {
                        if (item.wid == obj.viewWID)
                        {
                            Console.WriteLine("intputs are: {0}", obj.modelWID);		//map inputs and outputs appropriately
                        }
                    }
                }
                else
                {
                    Console.WriteLine("widget id: {0}, in1: {1}, in2: {2}, in3: {3}, in4: {4}, out1: {5}, TypeID: {6},", item.wid, item.in1, item.in2, item.in3, item.in4, item.output, item.typeID);  //organizes all the widget fields into an organized form, by each class
                    foreach (var obj in Mapping.mappings)
                    {
                        if (item.wid == obj.viewWID)
                        {
                            Console.WriteLine("intputs are: {0}", obj.modelWID);	//a better way to print information
                        }
                    }
                }
            }
            Console.ReadLine();
        }
    }
}

