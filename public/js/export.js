const { BlobServiceClient } = require("@azure/storage-blob");
var FileSaver = require('file-saver');

const accountName = "nowherestorage";
const containerName= "nowhere";
const sasString= "?sp=r&st=2022-03-31T07:37:59Z&se=2022-04-30T15:37:59Z&spr=https&sv=2020-08-04&sr=c&sig=02URJXimur%2FYoucCYVx4KRRrVGxySp5UKWncGogrLUI%3D";
const holderfilename = "nowhere_owneroftoken.json";



var vm = new Vue({
    el: "#app",
    data: {
      address: "",
      shortaddress: "connect your wallet",
      cards: []  
      
    },
    methods: {
        downloadsvg: async function(blobfile) {
          try{  
            const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net/nowhere${sasString}`);
            const containerClient = blobServiceClient.getContainerClient('svg');
            const blobClient = containerClient.getBlobClient(blobfile);
            const downloadBlockBlobResponse = await blobClient.download(blobfile, 0, undefined);
            const data = await downloadBlockBlobResponse.blobBody;
            // Saves file to the user's downloads directory
            FileSaver.saveAs(data, `svg_${new Date().getTime()}.svg`); // FileSaver.js}
          }
          catch(error){
            console.log(error)
          }
        
        },
        downloadpng: async function(blobfile) {
         
          try{  
            const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net/nowhere${sasString}`);
            const containerClient = blobServiceClient.getContainerClient('pngfull');
            const blobClient = containerClient.getBlobClient(blobfile);
            const downloadBlockBlobResponse = await blobClient.download(blobfile, 0, undefined);
            const data = await downloadBlockBlobResponse.blobBody;
            // Saves file to the user's downloads directory
            FileSaver.saveAs(data, `png_${new Date().getTime()}.png`); // FileSaver.js}
          }
          catch(error){
            console.log(error)
          }
        
         
          // const a = document.createElement('a');
            // a.style.display = 'none';
            // //let downloadLink = blobService.getUrl('png', file, sasString);
            // a.target ="_blank"
            // a.href = file;
            // a.download = `png_${new Date().getTime()}.png`;
            // document.body.appendChild(a);
            // a.click();
            // setTimeout(() => {
            //   document.body.removeChild(a);
            // }, 100);
        },
        livehtml: function(tokenid){
          const a = document.createElement('a');
          a.style.display = 'none';
          //let downloadLink = blobService.getUrl('png', file, sasString);
          a.target ="_blank"
          a.href = `/exportmp4?tokenid=${tokenid}`;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
          }, 100);
        }
      }
  })


const getholderoftoken = () => {

    let tokenlists_meta = []

    d3.text(`https://${accountName}.blob.core.windows.net/${containerName}/${holderfilename}${sasString}`, function(data) {
        
        // console.log(`https://${accountName}.blob.core.windows.net/${containerName}/${holderfilename}?${sasString}`)
        // tokenlist_list = data['0x7ddD43C63aa73CDE4c5aa6b5De5D9681882D88f8']
        var data_json = JSON.parse(data);
        let tokenlist_list = data_json[vm.address]
        console.log(tokenlist_list)
        tokenlist_list.forEach(element => {
            
            tokenmeta = {}
            tokenmeta['name'] = `nowhere #${element}`
            tokenmeta['cover'] = `https://${accountName}.blob.core.windows.net/${containerName}/svg/${element}.svg${sasString}`
            tokenmeta['svg_file'] = `${element}.svg`
            // tokenmeta['svg_file'] = `https://${accountName}.blob.core.windows.net/${containerName}/svg/${element}.svg${sasString}`
            tokenmeta['png_file'] = `${element}.png`
            // tokenmeta['png_file'] = `https://${accountName}.blob.core.windows.net/${containerName}/pngfull/${element}.png${sasString}`
            tokenmeta['tokenid'] = element;
            tokenlists_meta.push(tokenmeta);
            vm.cards = tokenlists_meta
        });
    });
}


// let connectbtn = document.getElementById('connect');
// connectbtn.onclick = function () {
//     getholderoftoken();
//     vm.address = "0x7ddD43C63aa73CDE4c5aa6b5De5D9681882D88f8"
//     let shortacc = "0x7d...88f8"
//     vm.shortaddress = `Wallet Address :${shortacc}`;

// }

let ismetamask = false
let network = "0x1";

if (typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum);
  //window.web3 = new Web3(window.ethereum);
  window.ethereum.enable();
  getChainId();
  //console.log("enable web3");
  ismetamask = true;

} else {
  const INFURA_API_KEY = '1b2b5d2a61d940cc95ff28267c558d29';
  web3 = new Web3(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`);
  ismetamask = false;
  console.log(`ismetamask ${ismetamask}`)
}



async function getChainId() {
  chainId = await ethereum.request({ method: 'eth_chainId' });
  if (chainId != network) {
    vm.connecterror = "<span class='connectinfo'>Switch Network</span>";
  }
  else {
    vm.connecterror = "";
  }
}

function right(str, num) {
  return str.substring(str.length - num, str.length)
}

function left(str, num) {
  return str.substring(0, num)
}

async function getAccount() {
  accounts = await web3.eth.getAccounts();
  vm.address = accounts[0];
  const shortacc = left(accounts[0], 6) + '...' + right(accounts[0], 4)
  vm.shortaddress = `Wallet Address :${shortacc}`;
  getholderoftoken();
}


let connect = document.getElementById('connect');
connect.onclick = function () {
  if (ismetamask) {
    getAccount();
    
  } else {
    window.open('https://metamask.app.link/dapp/nobodyeth.art/');
  }
}

if (ismetamask) {
  window.ethereum.on('chainChanged', function (chainId) {
    window.location.reload();
  })
}

if (ismetamask) {
  window.ethereum.on('accountsChanged', function (accounts) {
    // Time to reload your interface with accounts[0]!
    getAccount();
  })
}