# How to Run

For the web server:

For first time setup, I recommend rebuilding all of the dependencies. In the NTK-Server-1-2 folder, you need to delete the node_modules folder.

rm -rf node_modules

Afterwards, the dependencies need to be rebuild using npm.

npm install

This should install all of the dependencies. To start the web server program:

npm start

Interpreter:

To run the interpreter to run just make sure you save the output file in the correct directory and then click on the .exe file, which will create all the various classes.

The path has to be modified in the code and recompiled. 

# Baker-Hughes-Web-App

As the next generation of variable speed drives (VSDs) are developed, we require achange in the menu system that must pass newer more stringent standards. The currentgeneration of operating systems being used is not compatible with newer technologies andrequires an update. The next generation of variable speed drives requires programming to makethe systems more automated. To achieve an easier transition, a graphical web application will becreated to simplify the programming process. The web application will include a simulator to testthe programming. The web application will also be able to export the program to an XML file foruse with other Visual Studio projects designed to program a drive. The program will complywith StyleCop static tests which tests if our code is consistent with standardized C# style rules.This application requires that the user understand the limitations of the VSD and the job it isused for. The web application is accessible and usable on any device that has an HTML5compliant browser. The operator is also limited to program on current generation devices,meaning this web application nor the programs it produces is not backwards compatible witholder variable speed drives.

![alt tag](Block Diagram.png)
