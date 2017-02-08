using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.UI;
using System.Web.Script.Serialization;



public class Widget
{
    public string wid { get; set; }
    public string typeID { get; set; }
    public string in1 { get; set; }
    public string in2 { get; set; }
    public string in3 { get; set; }
    public string in4 { get; set; }
    public string instuff { get; set; }
    public string outstuff { get; set; }
    //public int out1 { get; set; }
    public int output { get; set; }
}
public class Mapping
{
    public string viewWID { get; set; }
    // public Map map { get; set; }
    public string modelWID { get; set; }
    // public Offsets offsets { get; set; }
}

public class Example
{
    public List<Widget> widgets { get; set; }
    public List<Mapping> mappings { get; set; }
}

namespace program
{
    class program
    {
        static void Main()
        {
            string text = System.IO.File.ReadAllText(@"C:\Users\Ines\Desktop\patch.ntk.json");
            text = text.Replace("\"in\"", "\"instuff\"");
            text = text.Replace("\"out\"", "\"outstuff\"");
            System.IO.File.WriteAllText(@"C:\Users\Ines\Desktop\data.json", text);
            Example Widget = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<Example>(System.IO.File.ReadAllText(@"C:\Users\Ines\Desktop\patch.ntk.json"));
            Example Mapping = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<Example>(System.IO.File.ReadAllText(@"C:\Users\Ines\Desktop\patch.ntk.json"));
            foreach (var item in Widget.widgets)
            {
                if (item.typeID == "DigitalIn" || item.typeID == "DigitalOut" || item.typeID == "AnalogIn" || item.typeID == "AnalogOut")
                {
                    Console.WriteLine("widget id: {0}, TypeID: {1}, in: {2}, out: {3},", item.wid, item.typeID, item.instuff, item.outstuff);
                    foreach (var obj in Mapping.mappings)
                    {
                        if (item.wid == obj.viewWID)
                        {
                            Console.WriteLine("intputs are: {0}", obj.modelWID);
                        }
                    }
                }
                else
                {
                    Console.WriteLine("widget id: {0}, in1: {1}, in2: {2}, in3: {3}, in4: {4}, out1: {5}, TypeID: {6},", item.wid, item.in1, item.in2, item.in3, item.in4, item.output, item.typeID);
                    foreach (var obj in Mapping.mappings)
                    {
                        if (item.wid == obj.viewWID)
                        {
                            Console.WriteLine("intputs are: {0}", obj.modelWID);
                        }
                    }
                }
            }
            Console.ReadLine();
        }
    }
}