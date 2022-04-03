const accountName = "nowherestorage";
const containerName= "nowhere";
const sasString= "sp=r&st=2022-03-31T07:37:59Z&se=2022-04-30T15:37:59Z&spr=https&sv=2020-08-04&sr=c&sig=02URJXimur%2FYoucCYVx4KRRrVGxySp5UKWncGogrLUI%3D";


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const tokenid = urlParams.get('tokenid');



let vm = new Vue({
    el: ".bg",
    data() {
        return {
            picked: "",
            tokenid: tokenid!=""? tokenid:"",
            metadatauri:"",
            animationuri: "",
            message:""
        }
    }
})

window.onload = function(){
    getimgaurl();
}

//submit button
let submitbtm = document.getElementById('submit');
submitbtm.onclick = function () {
    vm.animationuri ="";
    getimgaurl();

}


const getimgaurl = () => {

    if(vm.tokenid<1598){
    // vm.animationuri = `https://gateway.pinata.cloud/ipfs/QmThGMUMTTT8Bjc7Ej9L3mVga8XP8pvsuqTN96E4LQZ3YH/${vm.tokenid}.html`;
    // vm.animationuri = `https://nobodyeth.art/nowhere/html/${vm.tokenid}.html`;
    vm.animationuri = `https://${accountName}.blob.core.windows.net/${containerName}/html/${vm.tokenid}.html?${sasString}`
    }else{
        vm.animationuri ="";
    }
}


// screen record
let screenStream;
let recordedBlobs = [];
let mediaRecorder;
const screen = document.querySelector('#screen');
const stopbtn = document.querySelector('#stop');
const video = document.querySelector('#video');
const select = document.querySelector('.select');

screen.addEventListener('click', () => {
    screen.style.display = "none";
    stopbtn.style.display= "block";
    select.style.display= "none";
    const constraints = {
        audio: false,
        video: true,
        preferCurrentTab: true
    }
    
    navigator.mediaDevices.getDisplayMedia(constraints).then(stream => {
        screenStream = stream;
        video.srcObject = stream;
        video.play();
        startRecording();
    });
})

stopbtn.addEventListener('click', () => {
    if (screenStream) {
        screenStream.getTracks().forEach(track => {
            track.stop();
        })
        stopRecord();
    }
    select.style.display = "block";
    screen.style.display = "block";
    stopbtn.style.display= "none";
})

const getSupportedMimeTypes = () => {
    const possibleTypes = [
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm;codecs=h264,opus',
        'video/mp4;codecs=h264,aac',
    ];
    return possibleTypes.filter(mimeType => {
        return MediaRecorder.isTypeSupported(mimeType);
    });
}

const startRecording = () => {
    recordedBlobs = [];
    const mimeType = getSupportedMimeTypes()[3]; //改這就可以換掉影片格式
    const options = { mimeType };

    try {
        mediaRecorder = new MediaRecorder(screenStream, options);
    }
    catch (e) {
        return;
    }

    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();

}




const handleDataAvailable = (event) => {
    vm.message ="coverting...";
    //console.log('handleDataAvailable', event);
    if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
        const blob = new Blob(recordedBlobs, { type: 'video/mp4' });

        // gifshot.createGIF({
        //     'video': blob,
        //     gifWidth: 768,
        //     gifHeight: 768,
        //     numFrames: 25,
        //     numFrames
        // }, function (obj) {
        //     if (!obj.error) {
        //         const image = obj.image,
        //         animatedImage = document.createElement('img');
        //         animatedImage.style.display = 'none';
        //         animatedImage.src = image;
        //         // document.body.appendChild(animatedImage);

        //         // const url = window.URL.createObjectURL(image);
        //         const a = document.createElement('a');
        //         a.style.display = 'none';
        //         a.href = animatedImage.src;
        //         a.download = 'recording' + new Date().getTime() + '.gif';
        //         document.body.appendChild(a);
        //         a.click();
        //         setTimeout(() => {
        //             document.body.removeChild(a);
        //             window.URL.revokeObjectURL(animatedImage.src);
        //             screenStream = null;
        //         }, 100);
                
        //     }
        // });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'recording_' + new Date().getTime() + '.mp4';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            screenStream = null;
        }, 100);
        vm.message ="";
    }
}

const stopRecord = () => {

    mediaRecorder.stop();

}