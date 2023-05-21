const { protocol } = require("electron");



let Animation = {
  metadata: {
    fps: null,
    sec: null,
    ip: '',
    port: null,
    height: null,
    width: null,
  }
};

//Aktualisieren der MetaDaten
refreshMetaData()
function refreshMetaData() {
  Animation.metadata.fps = document.getElementById('fps').value
  Animation.metadata.sec = document.getElementById('seconds').value
  Animation.metadata.ip = document.getElementById('ip').value
  Animation.metadata.port = document.getElementById('port').value
  Animation.metadata.height = document.getElementById('height').value
  Animation.metadata.width = document.getElementById('width').value
  console.log('Refreshed Metadata' + Animation)
}

// Eventlistener zum Aktualisieren der Metadaten
const MetaElements = ['fps', 'seconds', 'ip', 'port', 'height', 'width']
MetaElements.forEach((id) => {
  document.getElementById(id).addEventListener('change', (event) => {
    refreshMetaData();
  });
  // document.getElementById(id).addEventListener('blur', () => {
  //   console.log('Blur' + id);
  //   refreshMetaData();
  // });
});

//save Frame
document.getElementById('SaveFrame').addEventListener('click', (event) => {
  Animation['Frame' + currentframe] = {}
  for (i = 0; i < Object.keys(CheckboxXLedNum).length; i++) {
    Animation['Frame' + currentframe]['Checkbox' + Object.keys(CheckboxXLedNum)[i]] = 
    [CheckboxXLedNum[Object.keys(CheckboxXLedNum)[i]], document.getElementById('checkbox_' + Object.keys(CheckboxXLedNum)[i]).style.backgroundColor.match(/\d+/g)].flat()
  }
  },
)

//change Checkbox BG
document.getElementById('pixelcolor').addEventListener('input', (event) => {
  document.getElementById('checkbox_' + currentLEDCheckbox).style.backgroundColor = document.getElementById('pixelcolor').value
})

//Save Checkbox <-> LED Number Zuordnung
let CheckboxXLedNum = {}
function AddCheckboxXLedNum(CheckboxNumber, LEDNumber) {
  CheckboxXLedNum[CheckboxNumber] = LEDNumber;
}
document.getElementById('SavePixelNumber').addEventListener('click', (event) => {
  AddCheckboxXLedNum(currentLEDCheckbox, (document.getElementById('pixelnumber').value))
})

//LED Grid größe
document.getElementById("width").addEventListener('change', event => RefreshLEDGrid());
document.getElementById("height").addEventListener('change', event => RefreshLEDGrid());
function RefreshLEDGrid() {
  document.getElementById("div_LEDs").innerHTML = ''
  for (i=0; i < (document.getElementById("height").value * document.getElementById("width").value); i++) {
    document.getElementById("div_LEDs").insertAdjacentHTML("beforeend", '<input type="checkbox" id="checkbox_' + i + '" class="LED_Checkbox"></input>')
  }
  document.getElementById("div_LEDs").style.gridTemplateColumns = 'repeat(' + document.getElementById("width").value + ', 1fr)'
  for (i=0; i < document.getElementsByClassName('LED_Checkbox').length; i++) {
    document.getElementsByClassName('LED_Checkbox')[i].style.width = ((80/document.getElementById("width").value)-0.5) + 'vw'
    document.getElementsByClassName('LED_Checkbox')[i].style.height = ((80/document.getElementById("width").value)-0.5) + 'vw'
  }
  refreshCheckboxchanger()
}



//Wählt immer nur eine LED CHeckbox aus im Grid
let currentLEDCheckbox
refreshCheckboxchanger()
function refreshCheckboxchanger() {
document.querySelectorAll('.LED_Checkbox').forEach((element) => {
  element.addEventListener('click', (event) => {
    for (i = 0; i < document.getElementsByClassName("LED_Checkbox").length; i++) {
      document.getElementsByClassName("LED_Checkbox")[i].checked = false
    }
    document.getElementsByClassName("LED_Checkbox")[Array.from(document.querySelectorAll('.LED_Checkbox')).indexOf(element)].checked = true
    currentLEDCheckbox = Array.from(document.querySelectorAll('.LED_Checkbox')).indexOf(element)

    //Setting LED Number in input field
    if (('Checkbox' + currentLEDCheckbox) in Animation['Frame' + currentframe]) {
      document.getElementById('pixelnumber').value = Animation['Frame' + currentframe]['Checkbox' + currentLEDCheckbox][0]
    }
    else {
      document.getElementById('pixelnumber').value = ''
    }
  });
});
}



//Frame auswähler macht den ausgewählten Frame größer und speichert ihn in eienr variable
let currentframe;
refreshFrameSelector()
function refreshFrameSelector() {
  document.querySelectorAll('.tmLineVert').forEach((element) => {
    element.addEventListener('click', (event) => {
      for (i = 0; i < document.getElementsByClassName("tmLineVert").length; i++) {
        document.getElementsByClassName('tmLineVert')[i].style = ''
      }
      document.getElementById(event.target.id).style.transform = 'scale(1.1)'
      document.getElementById(event.target.id).style.backgroundColor = 'var(--white)'
      currentframe = Array.from(document.querySelectorAll('.tmLineVert')).indexOf(element);
      document.getElementById('SaveFrame').innerText = 'Save current Frame [' + currentframe + ']'
      loadFrameLEDCheckboxes()
    })
  })
}
//Time Line Strich größe
document.getElementById('fps').addEventListener('change', event => RefreshTimeLine())
document.getElementById('seconds').addEventListener('change', event => RefreshTimeLine())
function RefreshTimeLine() {
  document.getElementById('div_tmLines').innerHTML = ''
  for (i = 0; i < (document.getElementById("fps").value * document.getElementById('seconds').value); i++) {
    document.getElementById('div_tmLines').insertAdjacentHTML("beforeend", '<div class="tmLineVert" id="Frame_' + i + '"></div>')
  }
  // for (i = 0; i < document.getElementsByClassName('tmLineVert').length; i++) {
  //   document.getElementsByClassName('tmLineVert')[i].style.width = (90/document.getElementsByClassName('tmLineVert').length) + 'vw'
  // }
  refreshFrameSelector()
}
function loadFrameLEDCheckboxes() {
  CheckboxXLedNum = {}
  if (('Frame' + currentframe) in Animation) {
    for (i = 0; i < document.getElementsByClassName('LED_Checkbox').length; i++) {
      document.getElementsByClassName('LED_Checkbox')[i].style.backgroundColor = ''
    }
    for (i = 0; i < Object.keys(Animation['Frame' + currentframe]).length; i++) {
      document.getElementById('checkbox_' + parseInt((Object.keys(Animation['Frame' + currentframe])[i]).match(/\d+/)[0])).style.backgroundColor = 'rgb(' + Animation['Frame' + currentframe]['Checkbox' + parseInt((Object.keys(Animation['Frame' + currentframe])[i]).match(/\d+/)[0])][1] + ', ' + Animation['Frame' + currentframe]['Checkbox' + parseInt((Object.keys(Animation['Frame' + currentframe])[i]).match(/\d+/)[0])][2] + ', ' + Animation['Frame' + currentframe]['Checkbox' + parseInt((Object.keys(Animation['Frame' + currentframe])[i]).match(/\d+/)[0])][3];
      CheckboxXLedNum[parseInt((Object.keys(Animation['Frame' + currentframe])[i]).match(/\d+/g))] = Animation['Frame' + currentframe]['Checkbox' + parseInt((Object.keys(Animation['Frame' + currentframe])[i]).match(/\d+/)[0])][0];
    }
  }
  else {
    for (i = 0; i < document.getElementsByClassName('LED_Checkbox').length; i++) {
      document.getElementsByClassName('LED_Checkbox')[i].style.backgroundColor = ''
    }
  }
}



//Animation Export
document.getElementById('download').addEventListener('click', (event => {
  ExportAnimation()
}))
function ExportAnimation() {
  const blob = new Blob([JSON.stringify(Animation)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'animation.json';
  link.click();
}

//Animation Import
document.getElementById('upload').addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    Animation = JSON.parse(e.target.result);

    //Load Import
    console.log(Animation)
    document.getElementById('fps').value = Animation.metadata.fps;
    document.getElementById('seconds').value = Animation.metadata.sec;
    document.getElementById('ip').value = Animation.metadata.ip;
    document.getElementById('port').value = Animation.metadata.port;
    document.getElementById('width').value = Animation.metadata.width;
    document.getElementById('height').value = Animation.metadata.height;
    document.getElementById('fps').dispatchEvent(new Event('change', { bubbles: true }));
    document.getElementById('seconds').dispatchEvent(new Event('change', { bubbles: true }));
    document.getElementById('ip').dispatchEvent(new Event('change', { bubbles: true }));
    document.getElementById('port').dispatchEvent(new Event('change', { bubbles: true }));
    document.getElementById('width').dispatchEvent(new Event('change', { bubbles: true }));
    document.getElementById('height').dispatchEvent(new Event('change', { bubbles: true }));
  };
  reader.readAsText(file);
})


//Play Animation
let isplaying = false
document.getElementById('playpause').addEventListener('click', (event) => {
  if (!isplaying) {
    isplaying = true
    document.getElementById('playpause').src = './img/pause.png'
    PlayAnimantion()
  }
  else {
    isplaying = false
    document.getElementById('playpause').src = './img/play.png'
  }
})
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function PlayAnimantion() {
  const dgram = require('dgram');
  const socket = dgram.createSocket('udp4');
  const wledprotocol = "1"
  const wledtimeout = "255"
  while (isplaying)
    for (i = 0; i < (Object.keys(Animation).length - 1); i++) {
      let NonbyteAnimation = [wledprotocol, wledtimeout];
      for (u = 0; u < Object.keys(Animation['Frame' + i]).length; u++) {
        NonbyteAnimation.push(
          Animation['Frame' + i]['Checkbox' + parseInt((Object.keys(Animation['Frame' + i])[u]).match(/\d+/)[0])][0],
          Animation['Frame' + i]['Checkbox' + parseInt((Object.keys(Animation['Frame' + i])[u]).match(/\d+/)[0])][1],
          Animation['Frame' + i]['Checkbox' + parseInt((Object.keys(Animation['Frame' + i])[u]).match(/\d+/)[0])][2],
          Animation['Frame' + i]['Checkbox' + parseInt((Object.keys(Animation['Frame' + i])[u]).match(/\d+/)[0])][3]
        )
        console.log('New Bytearray ' + NonbyteAnimation)

      }
      console.log(NonbyteAnimation)
      byteAnimation = new Uint8Array(NonbyteAnimation)
      socket.send(byteAnimation, 0, byteAnimation.length, document.getElementById('port').value, document.getElementById('ip').value, (err) => {
      if (err) {
        console.error('Fehler beim Senden:', err);
      } else {
        console.log('ByteArray erfolgreich gesendet.');
      }
      });
      await wait(((60/document.getElementById('fps').value)*1000))
      if (!isplaying) {
        socket.close()
        break
      }
    }
}







// // const wledip = document.getElementById('ip').value
// // const wledport = document.getElementById('port').value
// const wledip = "10.10.10.8"
// const wledport = "21324"
// const wledprotocol = "1"
// const wledtimeout = "255"

// const dgram = require('dgram');

// // Erstellen des UDP-Sockets
// const socket = dgram.createSocket('udp4');

// // Definieren des ByteArrays
// const byteArray = new Uint8Array([wledprotocol, wledtimeout, 0, 255, 255, 255, 21, 255, 255, 255, 21, 0, 255, 0, 3, 255, 255, 255, 20, 255, 255, 255]);

// // Senden des ByteArrays an den Zielhost
// socket.send(byteArray, 0, byteArray.length, wledport, wledip, (err) => {
//   if (err) {
//     console.error('Fehler beim Senden:', err);
//   } else {
//     console.log('ByteArray erfolgreich gesendet.');
//   }

//   // Schließen des Sockets nach dem Senden
//   socket.close();
// });









// //hex to RGB
// function hexToRgb(hex) {
//   // Entferne das führende '#' aus der Hex-Farbe
//   hex = hex.replace('#', '');

//   // Extrahiere die einzelnen Farbkomponenten
//   const r = parseInt(hex.substring(0, 2), 16);
//   const g = parseInt(hex.substring(2, 4), 16);
//   const b = parseInt(hex.substring(4, 6), 16);

//   // Gib das Ergebnis als RGB-Farbe zurück
//   return `rgb(${r}, ${g}, ${b})`;
// }


// //Ka braucht man nicht mehr vom Ding
// const AnimationTemplate = {
//   metadata: {
//     height: 5,
//     width: 15,
//     fps: 5,
//     sec: 5,
//     ip: '10.10.10.8',
//     port: 21324,
//   },
//   Frame0: {
//     Checkbox0: [255, 255, 255],
//     Checkbox1: [255, 255, 255],
//     Checkbox2: [255, 0, 0]
//   },
//   Frame1: {
//     Checkbox0: [0, 255, 0],
//     Checkbox1: [0, 0, 255],
//     Checkbox2: [255, 255, 0]
//   }
// };