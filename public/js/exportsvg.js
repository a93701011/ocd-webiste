const accountName = "nowherestorage";
const containerName= "nowhere";
const sasString= "sp=r&st=2022-03-30T16:11:57Z&se=2022-03-31T00:11:57Z&spr=https&sv=2020-08-04&sr=c&sig=mfiSlKbT3ZFoM27%2BO%2BHQjEaPT2FcaVoyXZbAY6FR9h0%3D";

let vm = new Vue({
    el: ".bg",
    data() {
        return {
            picked: "",
            tokenid: "",
            svg_uri:"",
            message:""
        }
    }
})


//submit button
let submitbtm = document.getElementById('submit');
submitbtm.onclick = function () {
    vm.animationuri ="";
    getsvg();

}
const getsvg = () => {
    //vm.svg_uri = `./nowhere/svg/${vm.tokenid}.svg`
    $.getScript(`./nowhere/svg/${vm.tokenid}.svg`)
    .done(function (script, textStatus) {
      let blob = new Blob([script], { type: 'image/svg+xml'});
      let url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `svg_${new Date().getTime()}.svg`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      }, 100);
    })
    
}

