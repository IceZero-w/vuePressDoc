在浏览器环境中

- 同步任务和异步任务都是通过 调用栈 来执行的。
- 而异步任务队列又分为宏任务队列和微任务队列。
- 当任务队列中的所有任务执行完毕后，浏览器会重新渲染页面，然后检查是否有新的任务需要执行。

具体来说，可以通过以下步骤说明同步任务、异步任务、宏任务、微任务、任务队列和事件循环之间的关系：
```
1.	执行当前的同步任务，也就是主线程中执行的代码。
2.	如果遇到异步任务，将异步任务加入到任务队列中，同时继续执行同步任务。
3.	当前同步任务执行完毕后，查看微任务队列中是否有任务需要执行，如果有，则依次执行微任务队列中的任务，直到微任务队列为空。
4.	当前宏任务执行完毕后，查看宏任务队列中是否有任务需要执行，如果有，则执行宏任务队列中的第一个任务。执行完毕后重复第3步。
5.	当所有任务都执行完毕后，重新渲染页面，然后检查是否有新的任务需要执行，如果有，则重复执行以上步骤。
```
```
宏任务包括：setTimeout、setInterval、setImmediate、I/O、UI rendering等。
微任务包括：Promise.*、process.nextTick、MutationObserver等。
```
下面举个例子：[「具体执行步骤-可视化展示代码执行情况」](https://www.jsv9000.app/)

```js
console.log('1');

setTimeout(function() {
  console.log('2');
  Promise.resolve().then(function() {
    console.log('3');
  });
  new Promise(function(resolve) {
    console.log('4');
    resolve();
  }).then(function() {
    console.log('5');
  });
});

Promise.resolve().then(function() {
  console.log('6');
});

new Promise(function(resolve) {
  console.log('7');
  resolve();
}).then(function() {
  console.log('8');
});

setTimeout(function() {
  console.log('9');
  Promise.resolve().then(function() {
    console.log('10');
  });
  new Promise(function(resolve) {
    console.log('11');
    resolve();
  }).then(function() {
    console.log('12');
  });
});

console.log('13');

/**
 * 结果
 * 1
 * 7
 * 13
 * 6
 * 8
 * 2
 * 4
 * 3
 * 5
 * 9
 * 11
 * 10
 * 12
 */
```

上述例子：

1. js引擎开始解析代码，生成整个代码块的执行上下文，推入 调用栈 中，调用栈开始逐行解析
2. 解析到同步任务 `console.log('1');` ，直接输出 `1`
3. 解析到第一个setTimeout（异步任务-宏任务），将该宏任务（包含setTimeout 回调函数） 推到 宏任务队列中，继续往下执行
4. 解析到 Promise.resolve().then（异步任务-微任务），将该微任务（包含 回调函数）推到 微任务队列中，继续往下执行
5. 解析到 new Promise（同步任务），输出 `7`。接着遇到Promise.then（异步任务-微任务），将其 该微任务（包含 回调函数） 推到 微任务队列中，继续往下执行
6. 解析到第二个setTimeout（异步任务-宏任务），将宏任务（包含setTimeout 回调函数）推到 宏任务队列中，继续往下执行
7. 解析到同步任务 `console.log('13');` ，直接输出 `13`
8. 同步任务解析完成，开始 查看微任务队列 中的任务（FIFO），逐个推入 调用栈 进行执行。所以输出`6`,再输出`8`
9. 此时的微任务队列为空，查看宏任务队列中（FIFO）的函数，拿第一个宏任务，推入 调用栈 进行执行。
10. 调用栈 解析到同步任务 `console.log('2');` ，直接输出 `2`。
11. 接着解析到 Promise.resolve().then（异步任务-微任务），将该 微任务（包含 回调函数）推到 微任务队列中，继续往下执行
12. 解析到 new Promise（同步任务），输出 `4`。接着遇到Promise.then（异步任务-微任务），将该 微任务（包含 回调函数）推到 微任务队列中。此时 第9步 骤函数解析完成，将退出 调用栈，当调用栈为空时，js引擎 又会去 查询此时微任务队列中情况，将所有微任务依此推入 调用栈 中执行。所以输出`3`,再输出 `5`。然后查看宏任务队列情况，发现还存在第二setTimeout，因此 js引擎 将该 宏任务（包含 回调函数）推入 调用栈执行
13. 执行情况和 第12步 一致。所以输出 `9` `11` `10` `12`


