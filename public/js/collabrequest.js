let vm = new Vue({
    el: ".form",
    data() {
      return {
        name: "",
        account: "",
        website: "",
        proposal: "",
        submitresult: ""
      }
    }
  })
  
  let btn = document.getElementById('submit')
  btn.onclick = function () {
    if (vm.name.length > 0 ) {
      if (vm.account != "" | vm.website != "") {
        save();
      }
      else {
        vm.submitresult = "please enter a account or website account";
      }
    } else {
      vm.submitresult = "please enter your name";
    }
  }
  
  
  
  function save() {
    axios.post("/api/collabrequest", {
        name: vm.name,
        account: vm.account,
        website: vm.website,
        proposal : vm.proposal
  
    }).then(function (res) {
      console.log(res.data)
      vm.submitresult = `${res.data}`
      reset();
    }
    )
      .catch(function (err) {
        console.log(err)
        vm.submitresult = `${err}`
      }
      )
  }

  
function reset() {
    vm.name = "";
    vm.account = "";
    vm.website = "";
    vm.proposal = "";
  }