function pathSplitter(path) {
  const path_length = path.getTotalLength();
  const interval = 0.001;
  const angle_max = 30;

  // splitter interval turns interval into percentage of path
  const splitter_interval = path_length * interval;
  // interval count is the amount of intervals we are going to have in the path
  const interval_count = 1 / interval;

  const first_coordinates = path.getPointAtLength(0);
  let prev_coordinates = {
    x: first_coordinates.x,
    y: first_coordinates.y,
    angle: 0,
  };

  const sections_array = [];
  let length_prior_to_split = 0;
  let cumulative_angle = 0;
  // interval count in this case is 1000, i.e. how many points on the path we are going to check.
  for (let i = 0; i < interval_count; i += 1) {
    const length = length_prior_to_split + splitter_interval;
    const point = path.getPointAtLength(length);

    const raw_angle_in_radians = Math.atan2(
      point.x - prev_coordinates.x,
      point.y - prev_coordinates.y
    );
    const raw_angle_in_degrees = radiansToDegrees(raw_angle_in_radians);

    const parsed_angle = Math.abs(Math.abs(raw_angle_in_degrees) - 90);
    point.angle = parsed_angle;

    if (cumulative_angle + parsed_angle > angle_max) {
      sections_array.push(point);
      cumulative_angle = 0;
    }

    length_prior_to_split += splitter_interval;
    cumulative_angle += parsed_angle;
    prev_coordinates = point;
  }

  return sections_array;
}
