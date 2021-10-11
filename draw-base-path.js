

const svg_width = 1200;
const svg_height = 600;

function drawBasePath() {
  var snake = d3.select("svg").selectAll(".snake-group").data([1]);

  var snake_enter = snake.enter().append("g").attr("class", "snake-group");
  snake_enter.append("path").attr("class", "base-path");

  var snake_update = snake.merge(snake_enter);

  // point coordinates are passed to the function created by d3, it then draws lines between them in the style you set it up to be
  // the fewer points, the fewer curves there will be
  var point_coordinates = getPointCoordinates(2);

  var d_path = getCurvedPath(point_coordinates);
  const line_width = "5rem";
  snake_update
    .select(".base-path")
    .attr("stroke-width", line_width)
    .attr("stroke", "black")
    .attr("fill", "none")
    .attr("opacity", 1)
    .attr("d", d_path);

  snake.exit().remove();
}

function getCurvedPath(point_coordinates) {
  let d = `M ${point_coordinates[0][0]} ${point_coordinates[0][1]}`;
  for (let i = 1; i < point_coordinates.length; i++) {
    const is_odd = !!(i % 2);
    let multiplier = is_odd ? 1 : -1;
    const y_value = 200; // this is the bit that makes it curly, its the pull that the curves are under
    const y_pull = y_value * multiplier;
    const previous_point = point_coordinates[i - 1];
    const next_point = point_coordinates[i];
    const next_point_on_curve = `${next_point[0]} ${next_point[1]}`;
    // Coordinates pulling out from previous point in curve
    const handle_one_x = previous_point[0];
    const handle_one_y = previous_point[1] + y_pull;
    const handle_one = `${handle_one_x} ${handle_one_y}`;
    // Coordinates pulling out from next point in curve
    const handle_two_x = next_point[0];
    const handle_two_y = next_point[1] + y_pull;
    const handle_two = `${handle_two_x} ${handle_two_y}`;

    d += `C ${handle_one} ${handle_two} ${next_point_on_curve}`;
  }
  return d;
}

// get points that we want the curves to go between
function getPointCoordinates(curves) {
  var pts = [];

  for (let i = 0; i <= curves; i++) {
    // this will return 0 or 1 alternately so can be used to determine if the x coordinate is on the left or right
    var on_left = i % 2;

    var margin = 100;
    var right_x_position = svg_width - margin;
    var left_x_position = margin;
    var x = on_left ? left_x_position : right_x_position;

    var y = (svg_height / curves) * i;

    pts.push([x, y]);
  }
  return pts;
}

drawBasePath();
