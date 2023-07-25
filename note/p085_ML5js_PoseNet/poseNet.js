const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const result_label = document.getElementById("result_label");
const h1 = document.getElementById("content");
const h2 = document.getElementById("timer");

navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((stream) => {
    video.srcObject = stream;
  });

posenet.load().then((model) => {
  console.log(model);
  video.onloadeddata = (e) => {
    console.log("정상동작 되었습니다.");
    predict();
  };

  function timerCap() {
    model.estimateSinglePose(video).then((pose) => {
      console.log(pose.keypoints);
      const point = pose.keypoints;
      if (
        point[5].position.y > point[7].position.y &&
        point[6].position.y > point[8].position.y &&
        point[7].position.y > point[9].position.y &&
        point[8].position.y > point[10].position.y &&
        point[7].position.x > point[5].position.x &&
        point[8].position.x < point[6].position.x &&
        point[7].position.x > point[9].position.x &&
        point[8].position.x < point[10].position.x
      ) {
        console.log("양손으로 동그라미를 그렸습니다.");
        h1.innerHTML = "양손으로 동그라미를 그렸습니다.";
      } else if (
        point[5].position.y > point[9].position.y &&
        point[6].position.y > point[10].position.y
      ) {
        console.log("양손을 들었습니다.");
        h1.innerHTML = "양손을 들었습니다.";
      } else if (point[5].position.y > point[9].position.y) {
        console.log("왼손을 들었습니다.");
        h1.innerHTML = "왼손을 들었습니다.";
      } else if (point[6].position.y > point[10].position.y) {
        console.log("오른손을 들었습니다.");
        h1.innerHTML = "오른손을 들었습니다.";
      } else {
        h1.innerHTML = "";
      }
    });
  }

  let timerOn = setInterval(() => {
    timerCap();
    timer();
  }, 5000);

  function predict() {
    model.estimateSinglePose(video).then((pose) => {
      canvas.width = video.width;
      canvas.height = video.height;
      drawKeypoints(pose.keypoints, 0.6, context);
      drawSkeleton(pose.keypoints, 0.6, context);
    });
    requestAnimationFrame(predict);
  }
});

function timer() {
  h2.innerHTML = "5초 남았습니다.";
  setTimeout(() => {
    h2.innerHTML = "4초 남았습니다.";
  }, 1000);
  setTimeout(() => {
    h2.innerHTML = "3초 남았습니다.";
  }, 2000);
  setTimeout(() => {
    h2.innerHTML = "2초 남았습니다.";
  }, 3000);
  setTimeout(() => {
    h2.innerHTML = "1초 남았습니다.";
  }, 4000);
}

// 기본 예시
const color = "yellowgreen";
const boundingBoxColor = "red";
const lineWidth = 2;
function toTuple({ y, x }) {
  return [y, x];
}

function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  );
  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      scale,
      ctx
    );
  });
}

function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];
    if (keypoint.score < minConfidence) {
      continue;
    }
    const { y, x } = keypoint.position;
    drawPoint(ctx, y * scale, x * scale, 3, color);
  }
}
