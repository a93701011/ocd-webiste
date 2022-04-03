
const accountName = "storageblobdatabrick";
const containerName= "nobody";
const xsfilename = "nobody_xs_ranking.csv";
const maskfilename = "nobody_mask_ranking.csv";
const sasString= "sp=r&st=2021-12-13T03:58:06Z&se=2022-04-19T11:58:06Z&spr=https&sv=2020-08-04&sr=c&sig=Wn0iC%2BbmVm0cB0Ud4gEoyCMOTy0QCT0zUAtMLNqFmOE%3D";
const xsbtn =  document.getElementById('xsbtn');
const maskbtn = document.getElementById('maskbtn');   
   
xsbtn.onclick = function(){
   
    xsbtn.className = 'traits';
    maskbtn.className = 'traits-wh';
   
    nobody_xs_ranking();
}


maskbtn.onclick = function(){
 
    xsbtn.className = 'traits-wh';
    maskbtn.className = 'traits';
    nobody_mask_ranking();
}

function nobody_xs_ranking(){

d3.select("#nobodyranking").selectAll("tr").remove();

d3.text(`https://${accountName}.blob.core.windows.net/${containerName}/${xsfilename}?${sasString}`, function(data) {
    var parsedCSV = d3.csv.parseRows(data);

 var container = d3.select("#nobodyranking")
     .append("table")

     .selectAll("tr")
         .data(parsedCSV).enter()
         .append("tr")

     .selectAll("td")
         .data(function(d) { return d; }).enter()
         .append("td")
         .text(function(d) { return d; });
});
}

function nobody_mask_ranking(){

    d3.select("#nobodyranking").selectAll("tr").remove();
    
    d3.text(`https://${accountName}.blob.core.windows.net/${containerName}/${maskfilename}?${sasString}`, function(data) {
        var parsedCSV = d3.csv.parseRows(data);
    
     var container = d3.select("#nobodyranking")
         .append("table")
    
         .selectAll("tr")
             .data(parsedCSV).enter()
             .append("tr")
    
         .selectAll("td")
             .data(function(d) { return d; }).enter()
             .append("td")
             .text(function(d) { return d; });
    });
    }

nobody_xs_ranking();




