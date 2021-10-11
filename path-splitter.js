function pathSplitter(path) {
  const path_length = path.getTotalLength();
  const interval = 0.001;
  const angle_max = 30;
  let cumulative_angle = 0;
  // splitter interval turns interval into percentage of path
  const splitter_interval = path_length * interval;
  // interval count is the amount of intervals we are going to have in the path
  const interval_count = 1 / interval;
  let length_prior_to_split = 0;

  const sections_array = [];
  const first_coordinates = path.getPointAtLength(0);

  let section_start = {
    x: first_coordinates.x,
    y: first_coordinates.y,
    angle: 0,
    angle_real: 0,
  };

  let coordinates;
  for (let i = 0; i < interval_count; i += 1) {
    const prev_coordinates = i > 1 ? coordinates : section_start;
    const length = length_prior_to_split + splitter_interval;
    const pt = path.getPointAtLength(length);

    let angle =
      Math.atan2(pt.x - prev_coordinates.x, pt.y - prev_coordinates.y) *
      (180 / Math.PI);
    const angle_real = angle;
    angle = Math.abs(Math.abs(angle) - 90);
    // if (Math.abs(angle_real) > 90) angle_real = Math.abs(angle_real);

    coordinates = { x: pt.x, y: pt.y, angle: angle, angle_real: angle_real };
    // if (Math.abs(angle) < angle_max) coordinates_array.push(coordinates);
    if (cumulative_angle + angle > angle_max) {
      sections_array.push([section_start, coordinates]);
      cumulative_angle = 0;
      section_start = coordinates;
    }

    length_prior_to_split += splitter_interval;
    cumulative_angle += angle;
  }
  return sections_array;
}
