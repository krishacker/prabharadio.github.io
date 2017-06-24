
// Cache references to DOM elements.
var elms = ['station0', 'title0', 'live0', 'playing0', 'station1', 'title1', 'live1', 'playing1', 'station2', 'title2', 'live2', 'playing2', 'station3', 'title3', 'live3', 'playing3', 'station4', 'title4', 'live4', 'playing4','station5', 'title5', 'live5', 'playing5','station6', 'title6', 'live6', 'playing6','station7', 'title7', 'live7', 'playing7','station8', 'title8', 'live8', 'playing8','station9', 'title9', 'live9', 'playing9','station10', 'title10', 'live10', 'playing10','station11', 'title11', 'live11', 'playing11','station12', 'title12', 'live12', 'playing12','station13', 'title13', 'live13', 'playing13','station14', 'title14', 'live14', 'playing14','station15', 'title15', 'live15', 'playing15','station16', 'title16', 'live16', 'playing16','station17', 'title17', 'live17', 'playing17','station18', 'title18', 'live18', 'playing18','station19', 'title19', 'live19', 'playing19','station20', 'title20', 'live20', 'playing20','station21', 'title21', 'live21', 'playing21','station22', 'title22', 'live22', 'playing22','station23', 'title23', 'live23', 'playing23','station24', 'title24', 'live24', 'playing24','station25', 'title25', 'live25', 'playing25','station26', 'title26', 'live26', 'playing26','station27', 'title27', 'live27', 'playing27','station28', 'title28', 'live28', 'playing28','station29', 'title29', 'live29', 'playing29','station30', 'title30', 'live30', 'playing30','station31', 'title31', 'live31', 'playing31','station32', 'title32', 'live32', 'playing32','station33', 'title33', 'live33', 'playing33','station34', 'title34', 'live34', 'playing34','station35', 'title35', 'live35', 'playing35','station36', 'title36', 'live36', 'playing36','station37', 'title37', 'live37', 'playing37','station38', 'title38', 'live38', 'playing38','station39', 'title39', 'live39', 'playing39','station40', 'title40', 'live40', 'playing40','station41', 'title41', 'live41', 'playing41','station42', 'title42', 'live42', 'playing42','station43', 'title43', 'live43', 'playing43','station44', 'title44', 'live44', 'playing44','station45', 'title45', 'live45', 'playing45','station46', 'title46', 'live46', 'playing46','station47', 'title47', 'live47', 'playing47','station48', 'title48', 'live48', 'playing48','station49', 'title49', 'live49', 'playing49','station50', 'title50', 'live50', 'playing50','station51', 'title51', 'live51', 'playing51','station52', 'title52', 'live52', 'playing52','station53', 'title53', 'live53', 'playing53'];
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
    freq: '*',
    title: "AR Rahman FM",
    src: ['http://66.55.145.43:7842/stream.mp3', 'http://66.55.145.43:7842/stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "AR Rahman Lite",
    src: ['http://66.55.145.43:7770/stream.mp3', 'http://66.55.145.43:7770/stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Harris Jayaraj FM",
    src: ['http://66.55.145.43:7812/stream.mp3', 'http://66.55.145.43:7812/stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Yuvan FM",
    src: ['http://66.55.145.43:7838/;', 'http://66.55.145.43:7838/;'],
    howl: null
  },
  {
    freq: '*',
    title: "Geetham FM",
    src: ['http://www.geethamradio.com:8020/new_hifi.mp3', 'http://www.geethamradio.com:8020/new_hifi.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Geetham Party FM",
    src: ['http://www.geethamradio.com:8020/party_hifi.mp3', 'http://www.geethamradio.com:8020/party_hifi.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Ilayaraja FM",
    src: ['http://66.55.145.43:7763/stream.mp3', 'http://66.55.145.43:7763/stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Geetham 80's FM",
    src: ['http://www.geethamradio.com:8020/80s_hifi.mp3', 'http://www.geethamradio.com:8020/80s_hifi.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Yesudas FM",
    src: ['http://66.55.145.43:7834/stream.mp3', 'http://66.55.145.43:7834/stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "A9 Radio",
    src: ['http://195.154.217.103:8175/;stream.mp3', 'http://195.154.217.103:8175/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "SPB Radio",
    src: ['http://66.55.145.43:7808/stream.mp3', 'http://66.55.145.43:7808/stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Rainbow FM",
    src: ['http://164.132.63.75:9998/;stream.mp3', 'http://164.132.63.75:9998/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Geetham Request Song FM",
    src: ['http://www.geethamradio.com:8020/hifi.mp3', 'http://www.geethamradio.com:8020/hifi.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "American Tamil Radio",
    src: ['http://69.46.24.226:7188/stream;', 'http://69.46.24.226:7188/stream;'],
    howl: null
  },
  {
    freq: '*',
    title: "Hungama Tamil Hits FM",
    src: ['http://123.176.41.8:8632/;stream.mp3', 'http://123.176.41.8:8632/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Hungama Tamil Classic",
    src: ['http://123.176.41.8:8264/;stream.mp3', 'http://123.176.41.8:8264/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "iYaliSai FM",
    src: ['http://37.187.79.93:9350/stream;', 'http://37.187.79.93:9350/stream;'],
    howl: null
  },
  {
    freq: '*',
    title: "Friends Tamil Chat FM",
    src: ['http://167.114.131.90:5750/;stream.mp3', 'http://167.114.131.90:5750/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Abinayam FM",
    src: ['http://192.99.170.8:5756/;stream.mp3', 'http://192.99.170.8:5756/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Butterfly FM",
    src: ['http://38.107.242.241:7164/;stream.mp3', 'http://38.107.242.241:7164/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Puradsi FM",
    src: ['http://puradsifm.net:9994/;stream.mp3', 'http://puradsifm.net:9994/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Paris Tamil FM",
    src: ['http://s6.voscast.com:7108/;stream.mp3', 'http://s6.voscast.com:7108/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Dream Share FM",
    src: ['http://192.235.87.105:15190/;stream.mp3', 'http://192.235.87.105:15190/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Elurchi FM",
    src: ['http://192.240.97.69:9201/stream', 'http://192.240.97.69:9201/stream'],
    howl: null
  },
  {
    freq: '*',
    title: "ETR Radio Germany",
    src: ['http://91.121.78.191:8012/stream', 'http://91.121.78.191:8012/stream'],
    howl: null
  },
  {
    freq: '*',
    title: "ETR Music Channel",
    src: ['http://music.etr.audio:8304/stream', 'http://music.etr.audio:8304/stream'],
    howl: null
  },
  {
    freq: '*',
    title: "Geethavani FM",
    src: ['http://50.7.70.66:8657/;stream.mp3', 'http://50.7.70.66:8657/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Gokulam Tamil Radio",
    src: ['http://94.23.62.189:5250/;stream.mp3', 'http://94.23.62.189:5250/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "GTBC Tamil Fm",
    src: ['http://38.96.148.18:6150/;stream.mp3', 'http://38.96.148.18:6150/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Idhayam FM",
    src: ['http://192.184.9.158:8329/;stream.mp3', 'http://192.184.9.158:8329/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Ilamai Tamil FM",
    src: ['http://74.50.122.103:7404/;stream.mp3', 'http://74.50.122.103:7404/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "ILC TAMIL FM",
    src: ['http://s2.voscast.com:9370/;stream.mp3', 'http://s2.voscast.com:9370/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Kodaikanal FM",
    src: ['http://117.218.118.70:88/broadwave.mp3', 'http://117.218.118.70:88/broadwave.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "8K Radio",
    src: ['http://16093.live.streamtheworld.com/RADIO_TAMIL_EST_128.mp3', 'http://16093.live.streamtheworld.com/RADIO_TAMIL_EST_128.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Kavi Tamil Radio",
    src: ['http://streaming.shoutcast.com/kavitamilradio?lang=en-US%2cen%3bq%3d0.5', 'http://streaming.shoutcast.com/kavitamilradio?lang=en-US%2cen%3bq%3d0.5'],
    howl: null
  },
  {
    freq: '*',
    title: "Lankasri FM",
    src: ['http://media2.lankasri.fm/;stream.mp3', 'http://media2.lankasri.fm/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "MTR 995 Tamil",
    src: ['http://176.31.120.92:9004/;stream.mp3', 'http://176.31.120.92:9004/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Machi Radio Tamil ",
    src: ['http://50.7.99.155:7729/;stream.mp3', 'http://50.7.99.155:7729/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Masala FM ",
    src: ['http://s9.voscast.com:8720/;stream.mp3', 'http://s9.voscast.com:8720/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Natpu FM",
    src: ['http://usa3.fastcast4u.com:5014/;stream.mp3', 'http://usa3.fastcast4u.com:5014/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Norway FM",
    src: ['http://66.90.103.189:8852/;stream.mp3', 'http://66.90.103.189:8852/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Onex FM Tamil",
    src: ['http://s1.voscast.com:9134/;stream.mp3', 'http://s1.voscast.com:9134/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Osai FM",
    src: ['http://astro4.rastream.com/osai', 'http://astro4.rastream.com/osai'],
    howl: null
  },
  {
    freq: '*',
    title: "OZ Tamil FM",
    src: ['http://91.121.134.23:8272/;stream.mp3', 'http://91.121.134.23:8272/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Puthu Paadal Radio",
    src: ['http://66.55.145.43:7759/stream.mp3', 'http://66.55.145.43:7759/stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Planet Radio City",
    src: ['http://prc.streamguys1.com/secure-radiocity-tamil-tunein', 'http://prc.streamguys1.com/secure-radiocity-tamil-tunein'],
    howl: null
  },
  {
    freq: '*',
    title: "RadioBOSS Stream",
    src: ['http://95.154.202.117:14111/;stream.mp3', 'http://95.154.202.117:14111/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Radio City kaadhal Love",
    src: ['http://prc.streamguys1.com/secure-radiocity-kaadhal.mp3', 'http://prc.streamguys1.com/secure-radiocity-kaadhal.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Radio Beat Tamil FM",
    src: ['http://192.99.9.172:8044/stream', 'http://192.99.9.172:8044/stream'],
    howl: null
  },
  {
    freq: '*',
    title: "Radio Mirchi",
    src: ['http://164.132.63.75:9994/;stream.mp3', 'http://164.132.63.75:9994/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Tamilisai FM",
    src: ['http://s10.voscast.com:7150/;stream.mp3', 'http://s10.voscast.com:7150/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Ayyappa Tamil FM",
    src: ['http://69.197.169.178:28232/;stream.mp3', 'http://69.197.169.178:28232/;stream.mp3'],
    howl: null
  },
  {
    freq: '*',
    title: "Sivan Kovil Bakthi Songs",
    src: ['http://sivankovil.no-ip.org:8000/;stream.mp3', 'http://sivankovil.no-ip.org:8000/;stream.mp3'],
    howl: null
  },
   {
    freq: '*',
    title: "iYaliSai Bakthi FM",
    src: ['http://curiosity.shoutca.st:9655/mp64', 'http://curiosity.shoutca.st:9655/mp64'],
    howl: null
  }
]);
