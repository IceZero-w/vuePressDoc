什么是任务队列（Task Queue）？

任务队列（Task Queue）是一个存储待执行任务的队列，包含宏任务（Macrotask）和微任务（Microtask）。

当异步事件发生时，异步事件会被添加到任务队列中。

等待 JavaScript引擎 空闲下来（调用栈为空时），从任务队列中取出任务放入调用栈中执行，调用顺序会先执行所有的 微任务，然后再执行一个 宏任务，然后再执行所有的 微任务，以此类推。直到任务队列为空。

宏任务：
```
指由浏览器或Node.js等宿主环境提供的异步任务，如setTimeout、setInterval、I/O操作、UI渲染等，它们的回调函数会被添加到宏任务队列中，等待JavaScript引擎的空闲时间执行。
```

微任务：
```
指由Promise、MutationObserver等异步API提供的任务，它们的回调函数会被添加到微任务队列中，等待JavaScript引擎从任务队列中取出所有的宏任务后执行。
```


举例：
```js
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');

```
在这个例子中，我们使用setTimeout和Promise异步方法，并在控制台输出不同的文本信息。

当我们运行这段代码时，JavaScript引擎会执行以下操作：
```
1. 首先，在调用栈中执行console.log('Start')，将字符串'Start'输出到控制台。
2. 然后，调用setTimeout函数，并将其回调函数添加到任务队列中。
3. 接着，调用Promise.resolve函数，并将其回调函数添加到任务队列中。
4. 最后，在调用栈中执行console.log('End')，将字符串'End'输出到控制台。
```

此时，调用栈中的所有代码已经执行完毕，JavaScript引擎开始从任务队列中取出任务并执行。
```
1. 首先，JavaScript引擎从任务队列中取出Promise回调函数，并执行console.log('Promise')，将字符串'Promise'输出到控制台。
2. 然后，JavaScript引擎从任务队列中取出setTimeout回调函数，并执行console.log('Timeout')，将字符串'Timeout'输出到控制台。
```

在这个例子中，setTimeout和Promise异步方法的回调函数被添加到任务队列中，并等待JavaScript引擎的空闲时间执行。由于Promise回调函数比setTimeout回调函数先添加到任务队列中，因此JavaScript引擎先执行Promise回调函数，然后再执行setTimeout回调函数。






