function vecRotRandomRange(min, max) {
  return [randomRange(min, max), randomRange(min, max), randomRange(min, max)];
}

function spawnSegment(data) {
  // Random number of branch segments with a user-defined maximum number
  var maxSegments = randomRange(1, clamp(getParam('Branch Length'), 1, 10));

  // Check if iteration was passed from previous spawn
  // Otherwise we're starting a new branch set (reset to 0)
  var iter = (data.iter) ? data.iter : 0;

  // Number of branches that spawn from a branch.
  var depth = (data.branch_depth) ? data.branch_depth : 0;

  // Check if maximum branches has been reached
  if (iter < maxSegments-1) {
    // Use previous spawn rotation
    // Otherwise get a random rotation
    var rot = (data.rot) ? data.rot : vecRotRandomRange(-60, 60);

    // Spawn the branch
    spawn({
      prefab: 'Branch Prefab',
      pos: [0, 0, clamp(getParam('Branch Spawn Distance'), 0.1, 10)],
      rot: rot,
      created_data: {
        iter: ++iter,
        rot: rot,
        branch_depth: depth
      }
    });

    // Spawn a random smaller branch
    if(depth < clamp(getParam('Branch Depth'), 1, 3)-1) {
      spawn({
        prefab: 'Branch Prefab',
        pos: [0, 0, clamp(getParam('Branch Spawn Distance'), 0.1, 10)],
        rot: vecRotRandomRange(-30, 30),
        created_data: {
          iter: 0,
          branch_depth: ++depth
        }
      });
    }
  }
}

// Initialization
call({
  script: 'spawnSegment',
  data: context.data
});