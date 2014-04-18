var w = Math.min(700, $(window).width());
var h = Math.min(400, $(window).width());
//var words = [];

var fill = d3.scale.category20();

function draw(words) {
d3.select("svg")
    .attr("width", w)
    .attr("height", h)
  .append("g")
    .attr("transform", "translate("+(w/2)+", "+(h/2)+")")
  .selectAll("text")
    .data(words)
  .enter().append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("font-family", "Lato")
    .style("fill", function(d, i) { return fill(i); })
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; });
}

function show_cloud() {
    /*d3.csv("cloud.txt", function(data) {
    
        data.forEach(function(d) {
            words.push(d.word);
        });*/
  
        d3.layout.cloud().size([w, h])
            .words(words
            .map(function(d) {
            return {text: d, size: 10 + Math.random() * 20};
            }))
            .padding(2)
            .rotate(0)
            .font("Lato")
            .spiral("rectangular")
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();
    /*});*/
}