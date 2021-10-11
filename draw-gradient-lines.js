// function lineIntersect(a, b, c, d) {
//   var x1 = c[0],
//     x3 = a[0],
//     x21 = d[0] - x1,
//     x43 = b[0] - x3,
//     y1 = c[1],
//     y3 = a[1],
//     y21 = d[1] - y1,
//     y43 = b[1] - y3,
//     ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
//   return [x1 + ua * x21, y1 + ua * y21];
// }

// // Compute stroke outline for segment p12.
// function lineJoin(p0, p1, p2, p3, width) {
//   var u12 = perp(p1, p2),
//     r = width / 2,
//     a = [p1[0] + u12[0] * r, p1[1] + u12[1] * r],
//     b = [p2[0] + u12[0] * r, p2[1] + u12[1] * r],
//     c = [p2[0] - u12[0] * r, p2[1] - u12[1] * r],
//     d = [p1[0] - u12[0] * r, p1[1] - u12[1] * r];

//   if (p0) {
//     // clip ad and dc using average of u01 and u12
//     var u01 = perp(p0, p1),
//       e = [p1[0] + u01[0] + u12[0], p1[1] + u01[1] + u12[1]];
//     a = lineIntersect(p1, e, a, b);
//     d = lineIntersect(p1, e, d, c);
//   }

//   if (p3) {
//     // clip ab and dc using average of u12 and u23
//     var u23 = perp(p2, p3),
//       e = [p2[0] + u23[0] + u12[0], p2[1] + u23[1] + u12[1]];
//     b = lineIntersect(p2, e, a, b);
//     c = lineIntersect(p2, e, d, c);
//   }

//   return "M" + a + "L" + b + " " + c + " " + d + "Z";
// }

const path = d3.select(".base-path").node();

const split_paths = pathSplitter(path);

const splits_select = d3.select("svg").selectAll(".split").data(split_paths);
const splits_enter = splits_select
  .enter()
  .append("path")
  .attr("class", "split")
  .attr("fill", "coral")
  .attr("stroke-width", "5rem")
  .attr("stroke-linecap", "round")
  .attr("stroke", (d, i) => `rgb(${i / 2},255,255)`)
  .attr("d", (d) => `M ${d[0].x} ${d[0].y} ${d[1].x} ${d[1].y}`);
