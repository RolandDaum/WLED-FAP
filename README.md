# WLED-FAP

## Introduction
### WLED-FAP - Frame Animation Program for WLED

WLED-FAP is a basic an easy to use **F**rame **A**nimation **P**rogramm made with JS and build in [electron](https://github.com/electron/). With WLED-FAP you can programm and keyframe animate anything you want for your WLED device. It's still the first version of it, and if there are many requests for more features, I will completely remake, rework, and redesign this because I know myself that this is just functionally right now.

### ![WLED-FAP UI](img/WLED-FAPUI.png)

# Tutorial - [YouTube Tutorial](https://youtu.be/ivSfaMmUXWA)
## Installation/Setup
- Download the latest release version of [WLED-FAP](https://github.com/RolandDaum/WLED-FAP/releases)
- Execute the '**wled-fap.0.0.0.exe**'

## Settings
### Animation Lenght
- Set the Framerate (*Frames/sec*) for your animation
- Set the Animation duration (*Seconds*) for your animation

The Framerate times the animation Duration is the amount of single Frames you get down in the Time Line

### Canvas size
- Adjust the width and hight on the left side to scale the animation canvis up or down 

### Connection Data
- Enter the IP Address of your WLED Device
- Enter the UDP Port of your WLED Device (*Automatically set to 21324*)

## Creating Animations
- Select a frame on the Time Line
  - *The selected Frame will become bigger and white on the time line*
- Chose any Checkbox you like and click on it
  - *The selected Checkbox is highlighted with a grey frame*
- Set the Checkbox color to what ever you want (*Pixel Color*)
- Set the Pixel Number (*Pixel Number*) to the number of the x LED from you Addressable RGB Strip which will then be represented by this Checkbox
  - Make sure to click on the done button to the right of the input field to save the assignment Checkbox <-> Pixelnumber
  - *Not necessary/needed when choosing the color*
- Once you finished setting each LED after your preferences click on '**_Save Frame [NaN]_**'
- When saved one frame just click on the next one in the time line and start assigning Checkboxes to the LED numbers and color
### Side note
Not every Checkbox has to be assigned to an LED. There more or less just making up a canvas on which you can place the LED's just as they are in real life. For example a circle, house or what ever you want. You should also be able to make 2d matrix animations if you want to, but I think there might be a better software out there for this.

## Save/Load Animations
### Save
- Click on the download icon to save/download your animation (*defaul file name 'animation.json'*)
### Load
- Click on Chose File right next to the save/download button to load your saved animation
### animation.json
The animation are saved as a json file which stores all the necessary data of your anmation

**Example '*animation.json*'**
```
{
"metadata":
   {"fps":"2",
   "sec":"1",
   "ip":"10.10.10.8",
   "port":"21324",
   "height":"3",
   "width":"8"},
"Frame0":
   {"Checkbox9":["10","255","0","0"],
   "Checkbox11":["12","0","0","255"],
   "Checkbox13":["14","255","0","0"]},
"Frame1":
   {"Checkbox9":["10","0","0","255"],
   "Checkbox11":["12","255","0","0"],
   "Checkbox13":["14","0","0","255"]},
}
```
- '*metadata*' contains all the animation settings
- Each Frame contains every '*Checkbox[n]*' that has been assigned to an LED Number in that frame
- A '*Checkbox[n]*' contains 4 values
0. LED Number
1. Red color Value
2. Green color Value
3. Blue color Value
- These for values are later send to WLED
  - For more Informations check the WLED wiki [UDP-Realtime-Control](https://github.com/Aircoookie/WLED/wiki/UDP-Realtime-Control)
  - I also have a [python example](https://github.com/RolandDaum/WLED-UDP-Realtime-Controll-Python-JavaScript/blob/master/WLEDUDP.py) on how to send data via UDP Connection to WLED. As for JS you need node.js to getting this done. If you want to see how, check the code for playing the animation in [app.js](https://github.com/RolandDaum/WLED-FAP/blob/aa4fec2964188d56c0c7effebc51e7fc3808f334/app.js#L198)
- If you want you could write the *animation.json* file directly and then loading it into WLED-FAP. WLED-FAP is basicly just and animation creating programm for WLED which can send the animations as well
 
## Playing Animations
To play your animations simply click on the play button in the top right corner, aswell if you want to stop the animation
- make sure you entered the connection data correctly
- You might have to click on the star icon in the top left corner in the WLED GUI to enable WLED to receiving live UDP data

# Important notes
- *!!! The entire electron 'node_module' folder is not included in the source file due to large file sizes [.gitnore](https://github.com/RolandDaum/WLED-FAP/blob/master/.gitignore) !!!*
