//把所有的 action 放在 constants

var keyMirror = require('keymirror');
// Constructs an enumeration with keys equal to their value.
// 也就是讓 hash 的 key 與 value 值一樣
// 不然原本 value 都是 null
// 不過既然如此，為何不乾脆用 set 之類只有key 的就好

module.exports = keyMirror({
  ISSUE_CREATE: null,
  ISSUE_UPDAYE: null,
  ISSUE_DESTROY: null 
});
