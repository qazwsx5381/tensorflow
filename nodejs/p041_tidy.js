const tf = require("@tensorflow/tfjs");
const express = require("express");
const app = express();
const PORT = 3000;

// const model = tf.sequential();
// model.add(tf.layers.dense({ units: 1, inputShape: [200] }));
// model.compile({
//   loss: "meanSquaredError",
//   optimizer: "sgd",
//   metrics: ["MAE"],
// });

// // Generate some random fake data for demo purpose.
// const xs = tf.randomUniform([10000, 200]);
// const ys = tf.randomUniform([10000, 1]);
// const valXs = tf.randomUniform([1000, 200]);
// const valYs = tf.randomUniform([1000, 1]);

// // Start model training process.
// async function train() {
//   await model.fit(xs, ys, {
//     epochs: 100,
//     validationData: [valXs, valYs],
//     // Add the tensorBoard callback here.
//     // callbacks: tf.node.tensorBoard("/tmp/fit_logs_1"),
//   });
// }
// train();
const t1 = tf.tensor1d([1, 2, 3]);
t1.print();
console.log(tf.memory());

const t2 = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
t2.print();
console.log(tf.memory());

app.listen(PORT, () => {
  console.log("포트가 열렸습니다.");
});
