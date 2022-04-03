$(document).ready(function (e) {
  $('img[usemap]').rwdImageMaps();
});


// let vm = new Vue({
//   el: ".wl",
//   data() {
//     return {
//       address: "",
//       shortaddress: "Connect your Ethereum Wallet",
//       connecterror: "",
//       balance: ""
//     }
//   }
// })



let vm = new Vue({
  el: ".wl",
  data() {
    return {
      address: "",
      
      shortaddress: "Connect your Ethereum Wallet",
      connecterror: "",
      balance: "",
      ispresale: true,
      number: "",
      totaleth: 0,
      totaleth_wei: 100000000000000000,
      presalemintnum: "",
      price_eth: 0.05,
      price_wei: 50000000000000000,
      mintresult: "",
      remainnumofnft: "",
      balanceshow:"",
      isfomo: false,
      fomosubmitresult:""
    }
  }
})

window.onload = function () {
  gettotalsupply()

}

// show detail
let subinfog = document.getElementById('subinfog');
let doc = document.getElementById('doc');
subinfog.onclick = function () {
  doc.style = "display:block";
}

//connect wallet
// let web3
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
  vm.mintresult = "";
  // vm.presalemintnum ="";

  // getBalance();
  // nowherecheck();

}

async function getBalance() {
  const balance = await web3.eth.getBalance(vm.address);
  vm.balance = balance;
  if( vm.balance == 0){
    vm.balanceshow = "Your wallet balance : " + web3.utils.fromWei(balance, "ether") + " Eth";
  }else{
    vm.balanceshow = "";
  }
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

const contractAddress = '0x6e8Ca9F24De73344854C4E97a9eAa2fbfbC6E6F6';
const contractABI = [{"inputs":[{"internalType":"uint256","name":"_maxNobody","type":"uint256"},{"internalType":"uint256","name":"_maxNobodyPerPurchase","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address[]","name":"_to","type":"address[]"},{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"airdropNobody","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"creator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"flipPreSaleState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipSaleState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getNobodyDNA","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"getWhitelistAllowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPreSaleActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isSaleActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isWhitelisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"isWhitelisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxNobody","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxNobodyPerPurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nobodyaddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"presalemint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_to","type":"address[]"},{"internalType":"uint256","name":"_allowance","type":"uint256"}],"name":"setWhitelistAllowance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_to","type":"address[]"},{"internalType":"uint256[]","name":"_allowance","type":"uint256[]"}],"name":"setWhitelistAllowance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const nowhere = new web3.eth.Contract(contractABI, contractAddress);

function gettotalsupply() {
  nowhere.methods.totalSupply().call().then(function (result) {
    vm.remainnumofnft = result + "/3210 Minted";
  });
}

// function nowherecheck() {
//   nowhere.methods.getWhitelistAllowance(vm.address).call().then(function (result) {
//     if (result > 0) {
//       vm.presalemintnum = "You have " + result + " Nowhere(s) to mint ";
//       vm.ispresale = true
//       vm.number = result;
//       vm.totaleth = vm.number * 50000000000000000/1000000000000000000
//       vm.totaleth_wei = vm.number * 50000000000000000;
//       vm.isfomo = false;

//     } else {
//       vm.presalemintnum = "You are currently not on the PreSale List. If you would like to be added to the FOMO list (priority after presale) pls click 'FOMO' and come back to mint after presale mint window closes. Thank you!";
//       vm.ispresale = false;
//       vm.isfomo = true;
//     }
//   });
// }

// function updatecheck() {
//   nowhere.methods.getWhitelistAllowance(vm.address).call().then(function (result) {
//     if (result > 0) {
//       vm.presalemintnum = "You have " + result + " Nowhere(s) to mint ";
//       vm.ispresale = true
//       vm.number = result;
//       vm.totaleth = vm.number * 50000000000000000/1000000000000000000
//       vm.totaleth_wei = vm.number * 50000000000000000;
//       vm.isfomo = false;
//     } else {
//       vm.presalemintnum = "";
//       vm.ispresale = false;
//       vm.isfomo = false;
//     }
//   });
// }

document.querySelector('.mintnum').addEventListener('input', function () {
  vm.totaleth = (vm.number * 0.05).toFixed(2);
  vm.totaleth_wei = vm.number * 50000000000000000
})

// function nowheremint() {

//   let options = {
//     from: vm.address,
//     value: vm.number * 50000000000000000,
//   }
//   nowhere.methods.presalemint(vm.number).send(options, function (error, result) {
//     if (error) {
//       if (error.message.includes("User denied transaction signature")) {
//         vm.mintresult = "User denied transaction signature";
//       }
//       else { //$('#claimtxt').text("Please connect your wallet");
//       }
//     } else {
//       vm.mintresult = "Transaction in progress...please do not refresh or exit =)";
//     }
//   })
//     .on('receipt', function (recipet) {
//       vm.mintresult = "Success! You officially minted (a) Nowhere(s)";
//       updatecheck();
//       gettotalsupply();
//     });
// }

function nowheremint() {

  let options = {
    from: vm.address,
    value: vm.number * 50000000000000000,
  }
  nowhere.methods.mint(vm.number).send(options, function (error, result) {
    if (error) {
      if (error.message.includes("User denied transaction signature")) {
        vm.mintresult = "User denied transaction signature";
      }
      else { //$('#claimtxt').text("Please connect your wallet");
      }
    } else {
      vm.mintresult = "Transaction in progress...please do not refresh or exit =)";
    }
  })
    .on('receipt', function (recipet) {
      vm.mintresult = "Success! You officially minted (a) Nowhere(s)";
      //updatecheck();
      gettotalsupply();
    });
}


document.querySelector('#presalemint').addEventListener('click', nowheremint);


let btn = document.getElementById('fomosubmit')
btn.onclick = function () {
  vm.fomosubmitresult = "";
  if (vm.address.length > 0 & vm.address.length <= 42) {
    axios.post("/api/fomo", {
      address: vm.address
    }).then(function (res) {
      console.log(res.data)
      vm.fomosubmitresult = `${res.data}`
    }
    )
      .catch(function (err) {
        console.log(err)
        vm.fomosubmitresult = `${err}`
      }
      )
  }
}
