function _checkAutoplay(data) {
    var autoplaySetting = false;
    if (data.autoplay != null) {
         autoplaySetting = data.autoplay;
    }

    return autoplaySetting;
}


function _loadJWPlayer(data) {
    var playerInstance = jwplayer(data.playerId);
    var autoplaySetting = _checkAutoplay(data);

    playerInstance.setup({
        playlist: [{
                         image: data.previewImg,
                         sources: [{
                            file: data.resources.ios.src
                         },
                         {
                            file: data.resources.rtsp.src
                         }]
                    }],
        rtmp: {
            bufferlength: 3
        },
        fallback: false,
        primary: "flash",
        width: "100%",
        aspectratio: "16:9",
        autostart: autoplaySetting
    });

    return playerInstance;
}

function _loadFlowPlayer(data, errorMessages) {

    if (errorMessages == null || errorMessages == undefined) {
        errorMessages  = [

          // video exceptions
          '',
          'Video loading aborted',
          'Network error',
          'Video not properly encoded',
          'File not found',

          // player exceptions
          'Unsupported video',
          'Skin not found',
          'SWF file not found',
          'Subtitles not found',
          'Invalid RTMP URL',
          'Unsupported video format. Try installing Adobe Flash.'
       ];
    }



    var livecontainer = document.getElementById(data.playerId);
    var autoplaySetting = _checkAutoplay(data);

    var sourcesArr = [
            {
                 type: "application/dash+xml",
                 src:  data.resources.dash.src
            },
            {
                 type: "application/x-mpegurl",
                 src: data.resources.ios.src
            },
            {
                 type: "video/flash",
                 src:  data.resources.rtmp.src
            }
    ];

    var api =  flowplayer(livecontainer,  {
           key: "$710417913228974",
           swf: "/assets/javascripts/flowplayer/flowplayer.swf",
           swfHls: "/assets/javascripts/flowplayer/flowplayerhls.swf",
           brand: {
                showOnOrigin: true,
                text: "<a class='block-logo-small'  href='http://block.vn' target='_blank'>block.vn</a>"
           },
           embed: false,
            /*logo: "/assets/javascripts/flowplayer/skin/img/blockplayerlogo.png",*/

            errors: errorMessages,

           poster: data.previewImg,
           ratio: 9/16,
           splash: !autoplaySetting,
           clip: {

            autoplay: autoplaySetting,
             sources:  sourcesArr
           },

           support: {
                video: true,
               inlineVideo: true

           }

     });

     /*api.on("finish", function(e) {
        api.load({
             autoplay: false,
             sources:  sourcesArr
        });
     });*/

     $(".flowplayer").append('<div class="fp-context-menu">'
                 + "<a  href='http://block.vn' target='_blank'><div class='navbar-brand block-logo'></div></a>"
                 +'</div>');
     return api;


}

function loadPlayer(data, errorMessages) {
    var isAndroid = /(android)/i.test(navigator.userAgent);
    var isWindowsPhone = /(windows phone)/i.test(navigator.userAgent);

    if(document.getElementById("testDevice") != null) {
        document.getElementById("testDevice").innerHTML = navigator.userAgent;
    }

    if (isAndroid && !isWindowsPhone) {
        return _loadJWPlayer(data);
    } else {
         if (isWindowsPhone) {
            var winPhoneWarn = document.getElementById("windowsPhonePlayerWarning");
            if (winPhoneWarn != null) {
                windowsPhonePlayerWarning.style.display = "block";
            }
        }
        return _loadFlowPlayer(data, errorMessages);
    }

    return false;
}