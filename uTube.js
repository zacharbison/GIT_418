//from me -> AIzaSyD-3YhGQ4-3plScb2xknivVgTE_lsCbVqg 
https://www.googleapis.com/youtube/v3/search?part=snippet&channelType=any&eventType=completed&maxResults=12&q=automotive+repair&relatedToVideoId=L22GsHQi7tU&type=video&videoType=any&key={AIzaSyD-3YhGQ4-3plScb2xknivVgTE_lsCbVqg}
 var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "https://www.googleapis.com/youtube/v3/search?part=snippet&channelType=any&eventType=completed&maxResults=12&q=automotive+repair&relatedToVideoId=L22GsHQi7tU&type=video&videoType=any&key={AIzaSyD-3YhGQ4-3plScb2xknivVgTE_lsCbVqg}", true);
 
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
          listType : 'QUERY',
		  
          events: {
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
