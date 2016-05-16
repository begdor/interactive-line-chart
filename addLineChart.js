'use strict'
//addLineChart is with lineChart.js, it is used to add new custom chart according to the user's preference
var id = 0;
var fields = {
  'open':['total','avgDisReq','medDisReq','avgBidAmt','medBidAmt'],
  'executed':['total','avgSave','avgAmtSave','medAmtSave','avgPrice','medPrice','avgAmt','medAmt']
};

$(".dropdown").children(".selStat").change(function(){
  var stat = $(this).val();
  var parent = $(this).parent();
  parent.children(".selField").empty();
  parent.children(".selField").append("<option value='' disabled selected>----Field----</option>");
  fields[stat].forEach(function(f){
    parent.children(".selField").append("<option value='" + f +"'>" + f + "</option>'");
  });
});


$("#newBTN").click(function(){
  $("<div id='graph" + id + "' class='dGraph'></div>").insertBefore("#createChart");
  var stat1 = $(".selStat:eq(0)").val();
  var stat2 = $(".selStat:eq(1)").val();
  var val1 = $(".selField:eq(0)").val();
  var val2 = $(".selField:eq(1)").val();
  var field = {'Status':[stat1,stat2],'Field':[val1,val2]};
  var graph = 'graph' + id;
  createGraph(graph,field['Status'],field['Field']);
  createDateLabel(graph + '-transform');
  createLegend(graph + '-transform',field['Status'],field['Field']);
  displayValueLabelsForPositionX(graph + '-transform',w,field['Status'],field['Field']);

  $('#'+graph).mousemove(function(event) {
    var hoverLineXOffset = m[3]+$('#'+graph).offset().left;
    var hoverLineYOffset = m[0]+$('#'+graph).offset().top;
    var hoverLine = [hoverLineXOffset,hoverLineYOffset];
		handleMouseOverGraph(graph,event,field['Status'],field['Field'],hoverLine);
  });
  $('#' + graph).append("<button class='delBTN'>Delete</button>")
  id += 1;

  $('#' + graph).on('click','button',function(event){
    $(this).parent().remove();
  });


  //clean up the dropdown after generate the new chart
  $(".selStat").val('');
  $(".selField").val('');
});
