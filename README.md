# WLED-FAP

## Introduction
### WLED-FAP - Frame Animation Program for WLED

WLED-FAP is a basic an easy to use **F**rame **A**nimation **P**rogramm made with JS and build in [electron](https://github.com/electron/).

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

## Save Animations
- 

*!!! The entire electron 'node_module' folder is not included in the source file due to large file sizes [.gitnore](https://github.com/RolandDaum/WLED-FAP/blob/master/.gitignore) !!!*
