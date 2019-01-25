// Cache references to DOM elements.
var elms = ['station0', 'title0', 'live0', 'playing0', 'station1', 'title1', 'live1', 'playing1', 'station2', 'title2', 'live2', 'playing2', 'station3', 'title3', 'live3', 'playing3', 'station4', 'title4', 'live4', 'playing4','station5', 'title5', 'live5', 'playing5','station6', 'title6', 'live6', 'playing6','station7', 'title7', 'live7', 'playing7','station8', 'title8', 'live8', 'playing8','station9', 'title9', 'live9', 'playing9','station10', 'title10', 'live10', 'playing10','station11', 'title11', 'live11', 'playing11','station12', 'title12', 'live12', 'playing12','station13', 'title13', 'live13', 'playing13','station14', 'title14', 'live14', 'playing14','station15', 'title15', 'live15', 'playing15','station16', 'title16', 'live16', 'playing16','station17', 'title17', 'live17', 'playing17','station18', 'title18', 'live18', 'playing18','station19', 'title19', 'live19', 'playing19','station20', 'title20', 'live20', 'playing20','station21', 'title21', 'live21', 'playing21','station22', 'title22', 'live22', 'playing22','station23', 'title23', 'live23', 'playing23','station24', 'title24', 'live24', 'playing24','station25', 'title25', 'live25', 'playing25','station26', 'title26', 'live26', 'playing26','station27', 'title27', 'live27', 'playing27','station28', 'title28', 'live28', 'playing28','station29', 'title29', 'live29', 'playing29','station30', 'title30', 'live30', 'playing30','station31', 'title31', 'live31', 'playing31','station32', 'title32', 'live32', 'playing32','station33', 'title33', 'live33', 'playing33','station34', 'title34', 'live34', 'playing34','station35', 'title35', 'live35', 'playing35','station36', 'title36', 'live36', 'playing36','station37', 'title37', 'live37', 'playing37','station38', 'title38', 'live38', 'playing38','station39', 'title39', 'live39', 'playing39','station40', 'title40', 'live40', 'playing40','station41', 'title41', 'live41', 'playing41','station42', 'title42', 'live42', 'playing42','station43', 'title43', 'live43', 'playing43','station44', 'title44', 'live44', 'playing44','station45', 'title45', 'live45', 'playing45','station46', 'title46', 'live46', 'playing46','station47', 'title47', 'live47', 'playing47','station48', 'title48', 'live48', 'playing48','station49', 'title49', 'live49', 'playing49','station50', 'title50', 'live50', 'playing50','station51', 'title51', 'live51', 'playing51','station52', 'title52', 'live52', 'playing52','station53', 'title53', 'live53', 'playing53','station54', 'title54', 'live54', 'playing54','station55', 'title55', 'live55', 'playing55','station56', 'title56', 'live56', 'playing56','station57', 'title57', 'live57', 'playing57','station58', 'title58', 'live58', 'playing58','station59', 'title59', 'live59', 'playing59','station60', 'title60', 'live60', 'playing60','station61', 'title61', 'live61', 'playing61','station62', 'title62', 'live62', 'playing62','station63', 'title63', 'live63', 'playing63','station64', 'title64', 'live64', 'playing64','station65', 'title65', 'live65', 'playing65'];
elms.forEach(function(elm) {
  window[elm] = document.getElementById(elm);
});

/**
 * Radio class containing the state of our stations.
 * Includes all methods for playing, stopping, etc.
 * @param {Array} stations Array of objects with station details ({title, src, howl, ...}).
 */
var Radio = function(stations) {
  var self = this;

  self.stations = stations;
  self.index = 0;
  
  // Setup the display for each station.
  for (var i=0; i<self.stations.length; i++) {
    window['title' + i].innerHTML = '<b>' + self.stations[i].freq + '</b> ' + self.stations[i].title;
    window['station' + i].addEventListener('click', function(index) {
      var isNotPlaying = (self.stations[index].howl && !self.stations[index].howl.playing());
      
      // Stop other sounds or the current one.
      radio.stop();

      // If the station isn't already playing or it doesn't exist, play it.
      if (isNotPlaying || !self.stations[index].howl) {
        radio.play(index);
      }
    }.bind(self, i));
  }
};
Radio.prototype = {
  /**
   * Play a station with a specific index.
   * @param  {Number} index Index in the array of stations.
   */
  play: function(index) {
    var self = this;
    var sound;

    index = typeof index === 'number' ? index : self.index;
    var data = self.stations[index];

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: data.src,
        html5: true, // A live stream can only be played through HTML5 Audio.
        format: ['mp3', 'aac']
      });
    }

    // Begin playing the sound.
    sound.play();

    // Toggle the display.
    self.toggleStationDisplay(index, true);

    // Keep track of the index we are currently playing.
    self.index = index;
  },

  /**
   * Stop a station's live stream.
   */
  stop: function() {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.stations[self.index].howl;

    // Toggle the display.
    self.toggleStationDisplay(self.index, false);

    // Stop the sound.
    if (sound) {
      sound.stop();
    }
  },

  /**
   * Toggle the display of a station to off/on.
   * @param  {Number} index Index of the station to toggle.
   * @param  {Boolean} state true is on and false is off.
   */
  toggleStationDisplay: function(index, state) {
    var self = this;

    // Highlight/un-highlight the row.
    window['station' + index].style.backgroundColor = state ? 'rgba(255, 255, 255, 0.33)' : '';

    // Show/hide the "live" marker.
    window['live' + index].style.opacity = state ? 1 : 0;

    // Show/hide the "playing" animation.
    window['playing' + index].style.display = state ? 'block' : 'none';
  }
};

// Setup our new radio and pass in the stations.
var radio = new Radio([
  {
    freq: '&#9725',
    title: "AR Rahman FM",
    src: ['http://212.83.138.48:8332/stream.mp3', 'http://212.83.138.48:8332/stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "AR Rahman Lite",
    src: ['http://212.83.138.48:8328/stream.mp3', 'http://212.83.138.48:8328/stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Harris Jayaraj FM",
    src: ['http://212.83.138.48:8352/stream.mp3', 'http://212.83.138.48:8352/stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Yuvan FM",
    src: ['http://212.83.138.48:8360/stream.mp3', 'http://212.83.138.48:8360/stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Deva FM",
    src: ['http://southradios.net:9090/devaradio', 'http://southradios.net:9090/devaradio'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Geetham Party FM",
    src: ['http://www.geethamradio.com:8020/party_hifi.mp3', 'http://www.geethamradio.com:8020/party_hifi.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Ilayaraja FM",
    src: ['http://212.83.138.48:8324/stream.mp3', 'http://212.83.138.48:8324/stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Geetham 80's FM",
    src: ['http://www.geethamradio.com:8020/80s_hifi.mp3', 'http://www.geethamradio.com:8020/80s_hifi.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Yesudas FM",
    src: ['http://212.83.138.48:8251/stream.mp3', 'http://212.83.138.48:8251/stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "A9 Radio",
    src: ['http://195.154.217.103:8175/;stream.mp3', 'http://195.154.217.103:8175/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "SPB Radio",
    src: ['http://212.83.138.48:8344/stream.mp3', 'http://212.83.138.48:8344/stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Rainbow FM",
    src: ['http://164.132.63.75:9998/;stream.mp3', 'http://164.132.63.75:9998/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Geetham Request Song FM",
    src: ['http://www.geethamradio.com:8020/hifi.mp3', 'http://www.geethamradio.com:8020/hifi.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "American Tamil Radio",
    src: ['http://69.46.24.226:7188/stream;', 'http://69.46.24.226:7188/stream;'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Palaya Padal FM",
    src: ['http://212.83.138.48:8090/stream.mp3', 'http://212.83.138.48:8090/stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Tamil Lite FM",
    src: ['http://212.83.138.48:8348/stream.mp3', 'http://212.83.138.48:8348/stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "iYaliSai FM",
    src: ['http://37.187.79.93:9350/stream;', 'http://37.187.79.93:9350/stream;'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Friends Tamil Chat FM",
    src: ['http://167.114.131.90:5750/;stream.mp3', 'http://167.114.131.90:5750/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Abinayam FM",
    src: ['http://192.99.170.8:5756/;stream.mp3', 'http://192.99.170.8:5756/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Butterfly FM",
    src: ['http://38.107.242.241:7164/;stream.mp3', 'http://38.107.242.241:7164/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Puradsi FM",
    src: ['http://puradsifm.net:9994/;stream.mp3', 'http://puradsifm.net:9994/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Paris Tamil FM",
    src: ['http://s6.voscast.com:7108/;stream.mp3', 'http://s6.voscast.com:7108/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Dream Share FM",
    src: ['http://192.235.87.105:15190/;stream.mp3', 'http://192.235.87.105:15190/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Elurchi FM",
    src: ['http://192.240.97.69:9201/stream', 'http://192.240.97.69:9201/stream'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Dance Tamizha FM",
    src: ['http://ample-zeno-20.radiojar.com/8qaharre56duv.mp3', 'http://ample-zeno-20.radiojar.com/8qaharre56duv.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "East FM",
    src: ['http://174.142.215.249:9966/;stream.mp3', 'http://174.142.215.249:9966/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Geethavani FM",
    src: ['http://50.7.70.66:8657/;stream.mp3', 'http://50.7.70.66:8657/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Gokulam Tamil Radio",
    src: ['http://94.23.62.189:5250/;stream.mp3', 'http://94.23.62.189:5250/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "GTBC Tamil Fm",
    src: ['http://38.96.148.18:6150/;stream.mp3', 'http://38.96.148.18:6150/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Idhayam FM",
    src: ['http://192.184.9.158:8329/;stream.mp3', 'http://192.184.9.158:8329/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Illayaraja Lite FM",
    src: ['http://212.83.138.48:8340/stream.mp3', 'http://212.83.138.48:8340/stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "ILC TAMIL FM",
    src: ['http://s2.voscast.com:9370/;stream.mp3', 'http://s2.voscast.com:9370/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Illayamaan FM",
    src: ['http://212.83.138.48:8086/stream.mp3', 'http://212.83.138.48:8086/stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "ABC UK Tamil",
    src: ['http://38.107.243.220:8118/;stream.mp3', 'http://38.107.243.220:8118/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "STAR FM Radio",
    src: ['http://198.178.123.2:8734/;stream.mp3', 'http://198.178.123.2:8734/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Lankasri FM",
    src: ['http://media2.lankasri.fm/;stream.mp3', 'http://media2.lankasri.fm/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "MTR HD Tamil",
    src: ['http://192.184.9.158:8860/;stream.mp3', 'http://192.184.9.158:8860/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Tuticorin Times Radio",
    src: ['http://192.227.116.104:4161/autodj', 'http://192.227.116.104:4161/autodj'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Mazhai FM ",
    src: ['http://media.mazhaifm.com:9999/;stream.mp3', 'http://media.mazhaifm.com:9999/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Natpu FM",
    src: ['http://usa3.fastcast4u.com:5014/;stream.mp3', 'http://usa3.fastcast4u.com:5014/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Tamil Kuyil FM",
    src: ['http://live.tamilkuyilradio.com:8095/;stream.mp3', 'http://live.tamilkuyilradio.com:8095/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "AJITH FM",
    src: ['http://192.227.116.104:4078/autodj', 'http://192.227.116.104:4078/autodj'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Osai FM",
    src: ['http://astro4.rastream.com/osai', 'http://astro4.rastream.com/osai'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Tamil Beat FM",
    src: ['http://212.83.138.48:8094/stream.mp3', 'http://212.83.138.48:8094/stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Puthu Paadal Radio",
    src: ['http://212.83.138.48:8336/stream.mp3', 'http://212.83.138.48:8336/stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Radio City",
    src: ['http://163.172.165.94:8720/;stream.mp3', 'http://163.172.165.94:8720/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "NAAM TAMILAR FM",
    src: ['http://sc.cobrasoftwares.in:8012/;stream.mp3', 'http://sc.cobrasoftwares.in:8012/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Kadhal Radio",
    src: ['http://212.83.138.48:8716/stream', 'http://212.83.138.48:8716/stream'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Radio Gethu",
    src: ['http://198.50.156.92:8902/;stream.mp3', 'http://198.50.156.92:8902/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Radio Mirchi",
    src: ['http://163.172.165.94:8320/;stream.mp3', 'http://163.172.165.94:8320/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Tamilisai FM",
    src: ['http://185.193.112.155:18244/;stream.mp3', 'http://185.193.112.155:18244/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Kamalhaasan Hits",
    src: ['http://prclive1.listenon.in:8836/;stream.mp3', 'http://prclive1.listenon.in:8836/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "CFMS Tamil",
    src: ['http://s9.voscast.com:8708/;stream.mp3', 'http://s9.voscast.com:8708/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "ClubHouse Tamil",
    src: ['http://5.135.154.91:8302/;stream.mp3', 'http://5.135.154.91:8302/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "ITR Tamil",
    src: ['http://s4.voscast.com:8360/;stream.mp3', 'http://s4.voscast.com:8360/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Jei FM",
    src: ['http://radio.jeifm.com:8808/jeiradio', 'http://radio.jeifm.com:8808/jeiradio'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "ATBC Tamil Fm",
    src: ['http://s7.viastreaming.net:7920/;stream.mp3', 'http://s7.viastreaming.net:7920/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Muththamizh FM",
    src: ['http://192.95.39.65:5345/stream', 'http://192.95.39.65:5345/stream'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Jaffna Tamil Radio",
    src: ['http://jtrfm.ddnss.de:8000/;stream.mp3', 'http://jtrfm.ddnss.de:8000/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Paaddu FM",
    src: ['http://37.59.28.208:8338/;stream.mp3', 'http://37.59.28.208:8338/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Sai FM",
    src: ['http://s2.voscast.com:9742/;stream.mp3', 'http://s2.voscast.com:9742/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Ayyappa Tamil FM",
    src: ['http://69.197.169.178:28232/;stream.mp3', 'http://69.197.169.178:28232/;stream.mp3'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Sivan Kovil Bakthi Songs",
    src: ['http://sivankovil.no-ip.org:8000/;stream.mp3', 'http://sivankovil.no-ip.org:8000/;stream.mp3'],
    howl: null
  },
   {
    freq: '&#9725',
    title: "iYaliSai Bakthi FM",
    src: ['http://curiosity.shoutca.st:9655/mp64', 'http://curiosity.shoutca.st:9655/mp64'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Tamil Islam FM",
    src: ['http://cp8.serverse.com:7067/stream', 'http://cp8.serverse.com:7067/stream'],
    howl: null
  },
  {
    freq: '&#9725',
    title: "Jesus FM",
    src: ['http://50.7.70.66:8575/;stream.mp3', 'http://50.7.70.66:8575/;stream.mp3'],
    howl: null
  }
]);
