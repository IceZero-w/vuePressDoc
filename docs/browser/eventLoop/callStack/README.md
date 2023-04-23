什么是调用栈（Call Stack）？

* 调用栈 是一种数据结构，它用于存储JavaScript函数的调用信息。在JavaScript中，当一个函数被调用时，JavaScript引擎 会将自己的执行上下文（Execution Context）压入调用栈中，执行完毕后再将自己的执行上下文从调用栈中弹出。因此，调用栈可以帮助 JavaScript引擎 跟踪函数调用的顺序和上下文信息。

* 调用栈 通常是一个后进先出（Last-In-First-Out，LIFO）的结构，即最后压入栈中的执行上下文会最先被弹出。这意味着在函数调用过程中，最新调用的函数会先被执行，然后是上一个调用的函数，以此类推。

* 调用栈 在 JavaScript引擎 中起着非常重要的作用，因为它决定了函数的执行顺序和上下文信息。当函数被调用时，它会创建一个新的执行上下文，并将其压入调用栈中。在执行过程中，如果遇到另一个函数调用，它会创建另一个执行上下文，并将其压入调用栈中。当函数执行完毕后，它的执行上下文会从调用栈中弹出，控制权会回到上一个函数的执行上下文中。

* 调用栈 在 JavaScript引擎 中也可以用于调试代码。开发者可以在调试器中查看调用栈信息，以了解当前代码的执行情况和上下文信息。在调试代码时，查看调用栈可以帮助开发者快速定位错误和调试问题。

举例：
```js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function calculate(a, b) {
  const sum = add(a, b);
  const product = multiply(a, b);
  return sum + product;
}

console.log(calculate(2, 3));

```
在这个例子中，我们定义了三个函数：add，multiply和calculate。其中，add函数用于计算两个数的和，multiply函数用于计算两个数的乘积，calculate函数用于计算两个数的和与乘积之和。

当我们调用calculate(2, 3)时，JavaScript引擎会执行以下操作：

```
1. 将calculate函数的执行上下文压入调用栈中。
2. 在calculate函数内部，调用add函数，并将add函数的执行上下文压入调用栈中。
3. 在add函数内部，计算两个数的和并返回结果，add函数的执行上下文从调用栈中弹出。
4. 在calculate函数内部，调用multiply函数，并将multiply函数的执行上下文压入调用栈中。
5. 在multiply函数内部，计算两个数的乘积并返回结果，multiply函数的执行上下文从调用栈中弹出。
6. 在calculate函数内部，获取add和multiply函数的结果并返回sum + product，calculate函数的执行上下文从调用栈中弹出。
7. 控制台输出calculate(2, 3)的结果，程序结束。
```

在上述过程中，调用栈记录了函数调用的顺序和执行上下文信息，帮助JavaScript引擎正确地执行代码。在函数执行完毕后，调用栈会弹出该函数的执行上下文，并将控制权交给上一个函数的执行上下文，直到所有函数执行完毕，程序结束。






