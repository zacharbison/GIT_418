
// 2. This code loads the IFrame Player API code asynchronously.
      var tg = document.createElement('script');

      tg.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tg, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
           videoId: 'M7lc1UVf-VE',
          events: {
            'onStateChange': onPlayerStateChange
          }
        });
      }
