$(document).ready(function (e) {
  $('img[usemap]').rwdImageMaps();
});




// let vm = new Vue({
//   el: ".wl",
//   data: {

//       address: "",
//       shortaddress: "<span class='info'>Connect your Ethereum Wallet</span>",
//       presalemintnum:"",
//       connecterror: "",
//       balance:0,
//       ispresale: true,
//       number:1,
//       totaleth: 0.05,
//       totaleth_gwei: 50000000000000000,
//       price: 0.05,
//       mintresult:"",
//       remainnumofnft:  1427 + "/3210 Minted"

//     }
// })

let vm = new Vue({
  el: ".wl",
  data() {
    return {
      address: "",
      presalemintnum: "",
      shortaddress: "<span class='info'>Connect your Ethereum Wallet</span>",
      connecterror: "",
      balance: "",
      ispresale: false,
      number: 1,
      totaleth: 0.05,
      totaleth_gwei: 50000000000000000,
      price: 0.05,
      mintresult: "",
      remainnumofnft: 1427 + "/3210 Minted"
    }
  }
})

// let btn = document.getElementById('submit')
// btn.onclick = function () {
//   vm.submitresult = "";
//   vm.queryresult = "";
//   if (vm.address.length > 0 & vm.address.length <= 42) {
//     if ( parseInt(vm.balance) > 0){
//     if (vm.twitter != "" | vm.discord != "") {
//       save();
//     }
//     else {
//       vm.submitresult = "please enter a twitter or discord account";
//     }
//   }else{
//     vm.submitresult = "Please use an activated wallet with an above 0 eth balance";
//   }
//   } else {
//     vm.submitresult = "please enter your wallet address";
//   }
// }

// function save() {
//   axios.post("/api/submit", {
//     address: vm.address,
//     twitter: vm.twitter,
//     discord: vm.discord,

//   }).then(function (res) {
//     console.log(res.data)
//     vm.submitresult = `${res.data}`
//     reset();
//   }
//   )
//     .catch(function (err) {
//       console.log(err)
//       vm.submitresult = `${err}`
//     }
//     )
// }

// let querybtn = document.getElementById('query')
// querybtn.onclick = function () {
//   vm.queryresult = "";
//   if (vm.address.length > 0 & vm.address.length <= 42) {
//     query();
//   } else {
//     vm.submitresult = "please enter your wallet address";
//   }
// }

// function query() {
//   axios.post("/api/query", {
//     address: vm.address
//   }).then(function (res) {
//     console.log(res.data)
//     vm.queryresult = `${res.data}`
//     reset();
//   }
//   )
//     .catch(function (err) {
//       console.log(err)
//       vm.queryresult = `${err}`
//     }
//     )
// }

// function reset() {
//   // vm.address = "";
//   vm.twitter = "";
//   vm.discord = "";
//   // vm.shortaddress= "<span class='info'>Connect your Ethereum Wallet</span>";
//   // vm.balance = "";
// }


window.onload = function () {
  gettotalsupply()

}

// show detail
let subinfog = document.getElementById('subinfog');
let doc = document.getElementById('doc');
subinfog.onclick = function () {
  doc.style = "display:block";
}

// colabrequest
// let collabrequestbtn = document.getElementById('collabrequest')
// collabrequestbtn.onclick = function () {
//   window.location.href = '/collabrequest';
// }


//connect wallet
// let web3
let ismetamask = true
let network = "0x4";

if (typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum);
  //window.web3 = new Web3(window.ethereum);
  // window.ethereum.enable();
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
  vm.shortaddress = `<span class='info'>Wallet Address :${shortacc}</span>`;
  vm.mintresult = "";

  getBalance();
  nowherecheck();

}

async function getBalance() {
  const balance = await web3.eth.getBalance(vm.address);
  vm.balance = balance;
  // vm.shortbalance = "<span class='info'>Your wallet balance : " + web3.utils.fromWei(balance, "ether") + " Eth</span>";
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

const contractAddress = '0x2db5471ae827795ad102f2ca460426b5613f3a90';
const contractABI = [{ "inputs": [{ "internalType": "uint256", "name": "_maxNobody", "type": "uint256" }, { "internalType": "uint256", "name": "_maxNobodyPerPurchase", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address[]", "name": "_to", "type": "address[]" }, { "internalType": "uint256", "name": "_count", "type": "uint256" }], "name": "airdropNobody", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "flipPreSaleState", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "flipSaleState", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }], "name": "getWhitelistAllowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isPreSaleActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isSaleActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_account", "type": "address" }], "name": "isWhitelisted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_account", "type": "address" }, { "internalType": "uint256", "name": "_count", "type": "uint256" }], "name": "isWhitelisted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxNobody", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxNobodyPerPurchase", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_count", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_count", "type": "uint256" }], "name": "presalemint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "price", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_newBaseURI", "type": "string" }], "name": "setBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newPrice", "type": "uint256" }], "name": "setPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_to", "type": "address[]" }, { "internalType": "uint256", "name": "_allowance", "type": "uint256" }], "name": "setWhitelistAllowance", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_to", "type": "address[]" }, { "internalType": "uint256[]", "name": "_allowance", "type": "uint256[]" }], "name": "setWhitelistAllowance", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const nowhere = new web3.eth.Contract(contractABI, contractAddress);

function gettotalsupply() {
  nowhere.methods.totalSupply().call().then(function (result) {
    vm.remainnumofnft = result + "/3210 Minted";
  });
}

function nowherecheck() {
  nowhere.methods.getWhitelistAllowance(vm.address).call().then(function (result) {
    if (result > 0) {
      vm.presalemintnum = "You have " + result + " Nowhere(s) to mint ";
      vm.ispresale = true
      vm.number = result;
      vm.totaleth = vm.number * 0.05
      vm.totaleth_gwei = vm.number * 50000000000000000;


    } else {
      vm.presalemintnum = "You don't have any Nowhere(s) to mint";
      vm.ispresale = false
    }
  });
}

document.querySelector('.mintnum').addEventListener('input', function () {
  vm.totaleth = vm.number * 50000000000000000 / 1000000000000000000
  vm.totaleth_gwei = vm.number * 50000000000000000
})

function nowheremint() {

  let options = {
    from: vm.address,
    value: vm.number * 50000000000000000,
  }
  nowhere.methods.presalemint(vm.number).send(options, function (error, result) {
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
      nowherecheck();
      gettotalsupply();
    });
}


document.querySelector('#presalemint').addEventListener('click', nowheremint);