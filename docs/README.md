# WLED-FAP

![Project Banner](https://github.com/RolandDaum/WLED-FAP/blob/master/docs/wledfap_banner.png?raw=true)

## Introduction
### WLED-FAP - Frame Animation Program for WLED

WLED-FAP is a basic and easy to use **F**rame **A**nimation **P**rogramm made with JS and build in [electron](https://github.com/electron/). With WLED-FAP you can programme and key frame animate anything you want for your WLED device. It's still the first version of it, and if there are many requests for more features, I will completely remake, rework, and redesign this because I know myself that this is just functionally right now.

### ![WLED-FAP UI](/img/WLED-FAPUI.png)

# Tutorial - [YouTube Tutorial](https://youtu.be/ivSfaMmUXWA)
## Installation/Setup
- Download the latest release version of [WLED-FAP](https://github.com/RolandDaum/WLED-FAP/releases)
- Execute the '**wled-fap.0.0.0.exe**'

## Settings
### Animation Length
- Set the frame rate (*frames/sec*) for your animation
- Set the animation duration (*seconds*) for your animation

The framerate times the animation duration is the amount of single frames you get down in the timeline

### Canvas size
- Adjust the width and height on the left side to scale the animation canvas up or down

### Connection Data
- Enter the IP Address of your WLED Device
- Enter the UDP Port of your WLED Device (*automatically set to 21324*)

## Creating Animations
- Select a frame on the timeline
  - *The selected frame will become bigger and white on the timeline*
- Chose any checkbox you like and click on it
  - *The selected checkbox is highlighted with a grey frame*
- Set the checkbox colour to what ever you want (*Pixel Colour*)
- Set the pixel number (*pixel number*) to the number of the x LED from your addressable RGB Strip which will then be represented by this Checkbox
  - Make sure to click on the done button to the right of the input field to save the assigned checkboxes pixel number
  - *Not necessary/needed when choosing the colour*
- Once you finished setting each LED after your preferences click on '**_Save Frame [NaN]_**'
- After saving one frame just click on the next one in the timeline and start assigned checkboxes to the LED numbers and colour
### Side note
Not every checkbox has to be assigned to an LED. They are more or less just making up a canvas on which you can place the LED's just as they are in real life. For example a circle, house or whatever you want. You should also be able to make 2d matrix animations if you want to, but I think there might be a better software out there for this.

## Save/Load Animations
### Save
- Click on the download icon to save/download your animation (*default file name 'animation.json'*)
### Load
- Click on chose file right next to the save/download button to load your saved animation
### animation.json
The animations are saved as a json file which stores all the necessary data of your animation

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
- Each frame contains every '*Checkbox[n]*' that has been assigned to an LED Number in that frame
- A '*Checkbox[n]*' contains 4 values
0. LED number
1. Red colour value
2. Green colour value
3. Blue colour value
- These four values are later sent to WLED
- For more information check the WLED wiki [UDP-Realtime-Control](https://github.com/Aircoookie/WLED/wiki/UDP-Realtime-Control)
- I also have a [python example](https://github.com/RolandDaum/WLED-UDP-Realtime-Controll-Python-JavaScript/blob/master/WLEDUDP.py) on how to send data via UDP Connection to WLED. As for JS you need node.js to get this done. If you want to see how, check the code for playing the animation in [app.js](https://github.com/RolandDaum/WLED-FAP/blob/aa4fec2964188d56c0c7effebc51e7fc3808f334/app.js#L198)
- If you want you could write the *animation.json* file directly and then load it into WLED-FAP. WLED-FAP is basically just an animation creating programme for WLED which can send the animations as well.

## Playing Animations
To play your animations simply click on the play button in the top right corner. Do the same if you want to stop the animation
- Make sure you entered the connection data correctly
- You might have to click on the star icon in the top left corner in the WLED GUI to enable WLED to receive live UDP data

# Important notes
- *!!! The entire electron 'node_module' folder is not included in the source file due to large file sizes [.gitnore](https://github.com/RolandDaum/WLED-FAP/blob/master/.gitignore) !!!*
