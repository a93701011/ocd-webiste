
let vm = new Vue({
    el: ".bg",
    data() {
        return {
            ipfs: "",
            ipfsimage: ""
        }
    }
})

let submitbtm = document.getElementById('submit');
submitbtm.onclick = function () {
    vm.ipfsimage = vm.ipfs;
}


let image = document.querySelector('img');
let recorder;

function getScreenStream(callback) {
    if (navigator.getDisplayMedia) {
        navigator.getDisplayMedia({
            video: true
        }).then(screenStream => {
            callback(screenStream);
        });
    } else if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getDisplayMedia({
            video: true
        }).then(screenStream => {
            callback(screenStream);
        });
    } else {
        alert('getDisplayMedia API is not supported by this browser.');
    }
}


document.querySelector('#btn-start-recording').onclick = function () {
    document.querySelector('#btn-start-recording').style.display = 'none';
    
    // var canvas = document.querySelector('canvas');

    getScreenStream(function (screen) {
        // var inited = false;

        // mediaElement.ontimeupdate = function (ev) {
        //     if (!inited) {
        //         VIDEO_WIDTH = mediaElement.offsetWidth;
        //         VIDEO_HEIGHT = mediaElement.offsetHeight;

        //         mediaElement.style.display = 'none';
        //         document.querySelector('#edit-panel').style.display = 'block';

        //         inited = true;
        //     }

        //     CropFrame(ev, screen, mediaElement);
        // };

        // mediaElement.srcObject = screen;
        // mediaElement.screen = screen;

        // addStreamStopListener(screen, function () {
        //     document.querySelector('#btn-stop-recording').onclick();
        // });

        // RecordRTC goes here
        //var captureStream = htmlCanvasElement.captureStream();
        // recorder = RecordRTC(captureStream, {
        //     type: 'video'
        // });
        
        recorder = RecordRTC(screen, {
            type: 'gif',
            frameRate: 200,
            quality: 10
            // width: 600,
            // hidden: 600
            // onGifRecordingStarted: function () {
            //     document.querySelector('h1').innerHTML = 'Gif recording started.';
            // },
            // onGifPreview: function (gifURL) {
            //     image.src = gifURL;
            // }
        });
        recorder.startRecording();
        //looper();
        recorder.screen = screen;
        document.querySelector('#btn-stop-recording').style.display = 'inline';
    });
};

// function looper() {
//     this.endTImeCutVideo = new Date().getTime();
//     if ((this.endTImeCutVideo - this.startTimeCutVideo) / 1000 > 6) {
//         this.stopRecording();
//         return;
//     }
//     drawMedia(); // 刷新canvas
//     requestAnimationFrame(this.looper);
// }

// function drawMedia() {
//     const canvas = document.querySelector('canvas');
//     const ctx = canvas.getContext('2d');
//     const video = document.querySelector('iframe');
//     canvas.setAttribute('width', 600);
//     canvas.setAttribute('height', 600);
//     ctx.drawImage(video, 0, 0, 600,600);
// }


document.querySelector('#btn-stop-recording').onclick = function () {
    document.querySelector('#btn-stop-recording').style.display = 'none';

    recorder.stopRecording(function (gifURL) {
        // var blob = recorder.getBlob();

        // document.querySelector('#edit-panel').style.display = 'none';
        // mediaElement.style.display = 'block';

        // mediaElement.srcObject = null;
        // mediaElement.src = URL.createObjectURL(blob);

        // if (mediaElement.screen && mediaElement.screen.getVideoTracks) {
        //     mediaElement.screen.stop();
        //     mediaElement.screen = null;
        // }
        // document.querySelector('h1').innerHTML = 'Gif recording stopped: ' + bytesToSize(recorder.getBlob().size);
        //image.src = URL.createObjectURL(recorder.getBlob());
        image.src = gifURL;
        // imageClipper(URL.createObjectURL(recorder.getBlob()), function() {
        //     this.crop(200, 30, 300, 250)
        //     .toDataURL(function(dataUrl) {
        //         console.log('cropped!');
        //         image.src = dataUrl;
        //     });
        // });
        recorder.screen.stop();
        recorder.destroy();
        recorder = null;

        document.querySelector('#btn-start-recording').style.display = 'inline';
    });
};
