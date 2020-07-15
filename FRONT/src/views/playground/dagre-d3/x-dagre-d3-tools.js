import dagreD3 from 'dagre-d3'
import * as d3 from "d3"

function render(params) {
  const g = params.graph;

  // Create the renderer
  var render = new dagreD3.render();

  // Set up an SVG group so that we can translate the final graph.
  var svg = d3.select(params.svgDom)
  var svgGroup = svg.append("g");

  // Set up mousewheel zoom support
  var zoom = d3.zoom().on("zoom", function () {
    svgGroup.attr("transform", d3.event.transform);
  });
  svg.call(zoom);


  // Run the renderer. This is what draws the final graph.
  render(d3.select("svg g"), g);

  // Zoom and scale to fit and center
  var isUpdate = true;
  var graphPaddingX = 50;
  var graphPaddingY = 30;
  var graphWidth = g.graph().width + graphPaddingX;
  var graphHeight = g.graph().height + graphPaddingY;
  var width = parseInt(svg.style("width").replace(/px/, ""));
  var height = parseInt(svg.style("height").replace(/px/, ""));
  var zoomScale = Math.min(width / graphWidth, height / graphHeight);
  var translateX = (width / 2) - ((graphWidth * zoomScale) / 2) + graphPaddingX / 2
  var translateY = (height / 2) - ((graphHeight * zoomScale) / 2) + graphPaddingY / 2;
  var svgZoom = isUpdate ? svg.transition().duration(500) : svg;
  svgZoom.call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(zoomScale));
  
  return { svgGroup }
}
export { render }