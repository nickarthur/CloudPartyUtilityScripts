var radius_homing = 100;
 var radius_proximity = 10;
 var target;

 function isOpponent(ent) {
   // Decide if we don't like this entity
   return true;
 }

 function explode() {
   // Do something explosive
   reset();
 }

 function foundTarget(data) {
   if (!data || data.err || !data.pos) {
     //error(data);
     return;
   }
   var rot = getRot(), pos = getPos(), linear = getVelLinear();

   // Check if we're close
   var p = vecDup(data.pos);
   vecSub(p, pos);
   if (vecLength(p) < radius_proximity) {
     explode();
     return;
   }

   // Figure out which way we're moving, and which way we'd like to move
   var ln = vecDup(linear);
   vecNormalize(ln);
   var pn = vecDup(p);
   vecNormalize(pn);

   // Calculate rotations for that, and rotate 10% towards the target rotation
   var r0 = getRotFromForward(ln);
   var r1 = getRotFromForward(pn);
   vecSlerp(r0, r1, 0.1);

   // Set the new linear velocity, and point us in that direction
   var new_lienar = [0, vecLength(linear), 0];
   vecPosRotate(new_lienar, r0);
   setRot({rot: r0});
   setVelLinear({vel: new_lienar, world: true});

   // Do it again
   findTarget();
 }

 // If we have a target, find its position, and call foundTarget with it
 function findTarget() {
   if (!target) {
     return;
   }
   getEntFields({ent: target, callback: 'foundTarget', fields: ['pos']});
 }

 // Check to see if we want to target anyone
 function foundTargets(data) {
   var players = data.ents;
   var i, rot = getRot(), pos = getPos(), linear = getVelLinear();
   vecNormalize(linear);
   var bestEnt, bestDistSqr;

   var k = keys(players);
   if (k && k.length) {
     for (i = 0; i < k.length; i++) {
       var player = players[k[i]];

       // See if they're an opponent
       if (!isOpponent(player.ent)) {
         continue;
       }

       // See if they're mostly in front of us
       var p = vecDup(player.pos);
       vecSub(p, pos);
       var pn = vecDup(p);
       vecNormalize(pn);
       var dot = vecDot(pn, linear);
       if (dot < 0.7) {
         continue;
       }

       // See if they're close than our current best
       var d = vecLengthSquared(p);
       if (!bestEnt || bestDistSqr > d) {
         bestEnt = player;
         bestDistSqr = d;
       }
     }
   }

   if (bestEnt) {
     // Found someone, chase time
     //error(bestEnt);
     target = bestEnt.ent;
     foundTarget(bestEnt);
   } else {
     // Try again in a quarter second
     timerCreate({name: 'findTargets', delay: 0.25});
   }
 }

 // Find all players in our homing radius
 function findTargets() {
   getEnts({radius: radius_homing, callback_done: 'foundTargets', channel: 'player', fields: ['pos']});
 }

 // Start looking for a target after a half second
 timerCreate({name: 'findTargets', delay: 0.5});