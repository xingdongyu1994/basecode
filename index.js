function TreeNode(val) {
  this.val = val
  this.left = null
  this.right = null
}
function CreateTreeNode(node,i,len,arr) {
 var leftIndex = 2*i+1
 var rightIndex = 2*i+2
 if(leftIndex<len) {
   var leftChildnode = new TreeNode()
   leftChildnode.val = arr[leftIndex]
   node.left = leftChildnode
   CreateTreeNode(leftChildnode, leftIndex, len, arr)
 }
 if(leftIndex<len) {
   var rightChildnode = new TreeNode()
   rightChildnode.val = arr[rightIndex]
   node.right = rightChildnode
   CreateTreeNode(rightChildnode, rightIndex, len, arr)
 }
}
//排序算法
//1.冒泡排序
/*
   复杂度   最好情况 O(n)  最坏情况 O(n2)  空间复杂度 O(1)
*/
function  bubblesort(arr){
  var len = arr.length
  for(var i=0; i<len; i++) {
    for(var j=0; j<len-1-i; j++) {
      if(arr[j]>arr[j+1]) {
        var temp = arr[j+1]
        arr[j+1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}
// 2.快速排序
/**
    分而治之法  左右一块来
    复杂度  最好情况下 O(nlog2n)  最坏情况 O(n2) 空间复杂度O(nlog2n)
    谷歌V8为了高效排序 排序超过10条 用快排  不超过10条 用插入排序
 */
function quicksort(arr){
   if(arr.length<=1) {
     return arr
   }
   var left = []
   var right = []
   var centerindex = arr.length-1
   var center = arr.splice(centerindex,1)[0]
   for(var i=0; i<arr.length; i++) {
      if(arr[i]<center) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
   }
   return quicksort(left).concat([center],quicksort(right))
}

//3.插入排序
/**
 * 直接插入 每次只会移动一个元素位置  并不会改变相同元素之间的排序
 * 算是稳定的排序了
 */
function insertsort(arr) {
  var len = arr.length
  var preindex
  var current
  for(var i=1; i<len; i++) {
     preindex = i-1
     current = arr[i]
    while(preindex>=0 && arr[preindex] >current) {
       arr[preindex+1]=arr[preindex]
       preindex--
    }
    arr[preindex+1]=current
  }
  return arr
}

//4.归并排序  
/**
 * 也是一种典型的分而治之的思想  有两种方法   自上而下的递归   自下而上迭代
 * 递归容易导致栈溢出
 * 复杂度 最好最坏O(nlon2n)  空间复杂度O(n)
 * 
 */
function mergesort(arr){
  var len = arr.length
  if(len<2) {
    return arr
  }
  var center =  Math.floor(len/2)
  var left = arr.slice(0,center)
  var right = arr.slice(center)
  return merge(mergesort(left),mergesort(right))
}
function merge(left, right) {
  var newarr = []
  while(left.length>0 && right.length>0) {
    if(left[0] <=right[0]) {
      var temp = left.shift()
      newarr.push(temp)
    } else {
      var temp = right.shift()
      newarr.push(temp)
    }
  }
  return newarr.concat(left.length?left:right)
}

// 5.堆排序  
/**
 * 堆 实质上就是完全二叉树
 * 大根堆  节点都小于父节点   小根堆 节点都大于父节点    下面建立的大根堆
 * 几个过程    1.构建堆   2.弹出堆顶元素  3.调整堆
 */
function Heapsort (arr) {
  buildheap(arr)
  console.log("建立完后的",arr)
  //交换第一个与最后一个  弹出元素
  for(var i=arr.length-1; i>0; i--) {
    swap(arr,0,i)
    headjustheap(arr,0,i)
  }
  return arr
  function buildheap (element) {
    var len = Math.floor(element.length/2)-1
    for(var i=len;i>=0; i--) {
      headjustheap(element, i, element.length)
    }
  }
  function headjustheap (element,index,len) {
    var lefttree 
    var righttree
    var maxnode
    while(true) {
       lefttree = 2*index+1
       righttree = 2*(index+1)
       maxnode = index
       if(lefttree<len && element[index] < element[lefttree]) {
          maxnode = lefttree
       }
       if(righttree<len && element[maxnode] < element[righttree]) {
        maxnode = righttree
       }
       if(maxnode == index) {
         break
       } else {
        swap(element, maxnode, index)
        index = maxnode
       }
    }
  }
  function swap(array,max, index) {
    var temp = array[max]
    array[max] = array[index]
    array[index] = temp
  }
} 
var heaparr = [1, 3, 4, 5, 7, 2, 6, 8, 0]
// console.log("堆排序",Heapsort(heaparr))
// 6.桶排序1
 function bucketsort (arr){
  //这里装备了11个桶
  var pail =  new Array(11)
  for(var i=0; i<=10; i++) {
      pail[i] = 0
  }
  arr.forEach(function(x) {       //这里的做法是可以记录每个桶的个数  这样就可以实现不去重的输出
    pail[x]++
  })
  var newArr = []
  for(var i=10; i>=0; i--) {
    for(var j=0; j<pail[i]; j++) {
     newArr.push(i)
    }
  }
   return newArr 
 }
 var bucketarr = [4,6,2,8]
//  console.log("桶排序",bucketsort(bucketarr))
//桶排序2
function bucketsort2(arr) {   //这里必须保证去重
  var paril = new Array(9)
  
  for(var i=0; i<arr.length; i++) {
    paril[arr[i]] = arr[i]
  }
  var newarr =[]
  for (var i = 0; i < paril.length; i++){
    if (paril[i] > 0) {
      newarr.push(i)
    }     
  }
  return newarr
}
// console.log("桶排序2",bucketsort2(bucketarr))

//查找算法
/**
 * 1.二分查找
 * 利用也是分而治之思想
 */
function binarySearch(data,item,start,end){
     var end=end || data.length-1;
     var start=start || 0;
     var m=Math.floor((start+end)/2);
     if(item==data[m]){
         return m;
     }else if(item<data[m]){
         return binarySearch(data,item,start,m-1) //递归调用
     }else{
         return binarySearch(data,item,m+1,end);
     }
     return false;
}
function binarysearch2(arr, item){
  var end = arr.length-1
  var start = 0
  while(start<=end) {
    var m = Math.floor((end+start)/2)
    if(arr[m] == item) {
      return m
    }
    if(item > arr[m]) {
      start = m+1
    } else {
      end = m-1
    }
  }
  return false
}



//递归算法
/**
 *  n乘以(m-1)个n
 */
// 1.幂函数
function power(base,power) {
  var num=base
  if(base ==1) {
    return num
  }
  if(base == 0) {
    return 1
  }
  for(var i=2; i<=power;i++) {
     num = num*base
  }
  return num
}
function power2(n,m) {
  if(m ==1) {
    return n
  }
  return power2(n,m-1)*n
}

// 2.阶乘递归
function foo(n) {
  if(n==1){
    return 1
  }
  return foo(n-1)*n
}


// 3.斐波纳契数列
/**
 * 1,1,2,3,5,8......
 */
function fib(n) {
  if(n== 0) {
    return 0
  }else if(n==1) {
    return 1
  }else {
    return fib(n-1)+fib(n-2)
  }
}
// console.log("结果",fib(8))




//事件绑定
// 1. 事件绑定
function eventfun(){
  var lis = document.getElementsByTagName('li')
  for(var i=0; i<lis.length; i++) {
    (function(i) {
       lis[i].addEventListener('click',function(){
         console.log('结果',i)
       })
    })(i)
  }
}



//数组去重
// {}
function unique(arr) {
  var obj ={}
  var res = []
  for(var i=0; i<arr.length; i++) {
    if(!obj[arr[i]]) {
       res.push(arr[i])
       obj[arr[i]] =1
    }
  }
  return res
}

// var arr  =[1,5,2,3,1,2,3,6]
// console.log("结果",unique(arr))


//手写bind()
/**
 * 
 * func 带绑定的函数
 *  
 */
function bind(func,context) {
  if(typeof func !== "function") {
    throw new TypeError('Bind must be called on a function');
  }
  var args =Array.prototype.slice.call(arguments,2)
  var bound = function() {
    return createbound(func,bound,context,this,args.concat(Array.prototype.slice.call(arguments)))
  }
  return bound
}
function createbound(sourcefunc,boundfunc,context1,context,args) {
    if(!(context instanceof boundfunc)) {
       return  sourcefunc.apply(context1,args)
    }
    var self = basecreate(sourcefunc.prototype)
    var result = sourcefunc.apply(self,args)
    if(isobject(result)) {
      return result
    }
    return self
}
var A = function() {}
function basecreate(prototype) {
   if(!isobject(prototype)) {
     return {}
   }
   A.prototype = prototype
   var result = new A;
   A.prototype = null
   return result
}
function isobject(obj) {
  var  type = typeof obj
  return type === 'function' || type === 'object' && !!obj
}

var name = "12"
var obj ={
  name:'333',
  showname: function() {
    console.log("结果",this.name)
  }
}
// var show = obj.showname
// var bindshowname = bind(show,obj)
// var pp = new bindshowname()
// console.log("，，，",pp)


//函数节流 debounce  throttle
function debounce(func,delay,immediate) {
  var timer = null
  return function() {
    var context = this
    var args = arguments
    if(timer) {
      clearTimeout(timer)
    }
    if(immediate) {
     var now = !timer
     timer = setTimeout(function(){
       timer = null
     },delay)
     if(now) {
      func.apply(context,args)
     }
    } else {
      timer = setTimeout(function(){
        func.apply(context,args)
      },delay)
    }
    
  }
}
function resizechange () {
  console.log("改变")
}

// window.onresize = debounce(resizechange, 5000,true)

//版本号排序
function versionsort(curv,perv) {
   var arr1 = curv.split('.')
   var arr2 = perv.split('.')
   var minl= Math.min(arr1.length,arr2.length)
   console.log("此时",minl)
   var posi =0
   var isverq =0
   while(posi <minl) {
     var isverq = parseInt(arr1[posi]) - parseInt(arr2[posi])
     if(isverq ==0) {
       posi++
     } else {
       break
     }
   }
   if(isverq >0) {
      return '新版本'
   } else if(isverq ==0) {
      return '稳定版'
   } else {
      return '旧版本'
   }
}
// console.log("版本号排序",versionsort('5.12.3','5.12'))



//编程
// 1.两个升序数组中前n大的数
function nmax(arr1,arr2,n) {
  var result = []
  var arr1len = arr1.length-1
  var arr2len = arr2.length-1
  if(n>arr1len+arr2len) {
    return a.concat(b)
  }
  while(n>0) {
    if(arr1[arr1len] > arr2[arr2len]) {
      result.push(arr1[arr1len])
      arr1len--
    } else {
      result.push(arr2[arr2len])
      arr2len--
    }
    n--
  }
  return result

}
// 2.二维数组顺时针打印

function printarr(arr) {
  if(arr == null || arr.length ==0) {
     return 
  }
  var result = []
  var rows = arr.length //行
  var cols = arr[0].length //列
  var start =0
  while(rows >start*2 && cols > start*2) {
     var endx = cols - 1 -start
     var endy = rows - 1 -start
     //左到右
     for(var i=start; i<=endx; i++) {
        result.push(arr[start][i])
     }
     //从上到下
     if(start<endy) {
       for(var i=start+1; i<=endy; i++) {
        result.push(arr[i][endy])
       }
     }
     //从右到左
     if(start<endy && start <endx) {
      for(var i= endx-1; i>=start; i--) {
        result.push(arr[endy][i])
      }
     }
     //从下到上
     if(start<endx && start<endy-1) {
      for(var i= endy-1; i>=start+1; i--) {
        result.push(arr[i][start])
       }
     }
     
    start++
  }
  return result
}
// console.log("结果",printarr(arr))


//3.斜对角打印数组
/**
 * 斜对角打印
 * 分为两部分  右上部分  左下部分  
 * 右上部分就是列数--
 * 做下部分就是行数++
 */

function printarr2(arr,n) {
  //右上部分
  var result = []
  for(var i=n-1;i>=0; i--) {
    var rows = 0
    var cols = i
    while((rows<n&& rows>=0) && (cols<n && cols>=0)) {
      result.push(arr[rows][cols])
      rows++
      cols++
    }
  }
  //打印下部分
  for(var i=1;i<n; i++) {
    var rows = i
    var cols = 0
    while((rows<n&& rows>=0) && (cols<n && cols>=0)) {
      result.push(arr[rows][cols])
      rows++
      cols++
    }
  }
  return result
}
// var arr= [
//   [1,2,3,4],
//   [5,6,7,8],
//   [9,10,11,12],
//   [13,14,15,16]
// ]
// console.log('结果',rotatearr(arr,4))

// 4.数组全排列
function perm(arr) {
  permute(arr,0)
}
// function permute(arr,begin) {
//   for(var i=begin; i<arr.length; i++) {
//     permswap(arr,begin,i)
    
//     if(begin+1<arr.length-1) {
//       permute(arr,begin+1)
//     } else  {
//       console.log("这时候",arr)
//     }
//   }
// }
// function permswap(arr,x,y) {
//   var temp = arr[x]
//   arr[x] = arr[y]
//   arr[y]  = temp
// }
function permute(arr,begin) {
  for(var i=begin; i<arr.length; i++) {
    permswap(arr, begin, i)
    if(begin+1<arr.length-1) {
      permute(arr, begin+1); 
    } else {
      console.log("交换数组",arr)
    }
  }
  
}
function permswap(arr,x,y) {
   var temp = arr[x];
   arr[x] = arr[y];
   arr[y]  = temp;
}
console.log('全排列结果',perm([1,2,3]))

//5.自己实现一个stack  实现push   pop 等操作方法
function Stack() {
  this.savedata = []
  this.top = 0  //记录栈顶位置
}
Stack.prototype = {
//栈顶压入元素
push:function(item) {
  this.savedata[this.top++] = item
},
//出栈一个元素
pop:function() {
  var peek =this.savedata[--this.top]
  this.savedata = this.savedata.slice(0,-1)
  return peek
},
//栈顶元素
peak:function() {
  return this.savedata[this.top-1]
},
//栈内元素个数
length:function() {
  return this.top
},
//清空栈
clear:function() {
  this.top = 0
}
}
function fact(n) {
 var s = new Stack()
 while(n>1) {
   s.push(n--)
 }

 var num =1
 while(s.length() >0) {
   num*=s.pop()
 }
 return num
}
function ispalinrome(str) {
 var s = new Stack()
 Array.prototype.forEach.call(str,function(item){
    return s.push(item)
 })
 var scopy = ''
 while(s.length()>0) {
   scopy+=s.pop()
 }
 return str === scopy
}
// console.log("回文",ispalinrome("12344321"))
//6.二分查找
function searchtwo(arr,item) {
  var end = arr.length-1
  var start = 0
  while(start<=end) {
    var m = Math.floor((end+start)/2)
    if(arr[m] == item){
       return m
    }
    if(item > arr[m]) {
      start = m+1
    } else {
      end = m-1
    }
  }
  return false
}
// console.log('结果',searchtwo([1,2,3,4,5],4))
//7.封装一个cookie
function setcookie(key,value,time) {
   var curdate = new Date()
   curdate.setDate(curdate.getDate()+time)
   document.cookie = key+ "=" +value+"; expires=" +curdate.toDateString();
}
function getcookie(key) {
  var arr = document.cookie.split('; ')
  for(var i=0; i<arr.length; i++) {
      var arr2 = arr[i].split('=')
      if(arr2[0] == key) {
         return decodeURI(arr2[1])
      }
  }
}
function removecookie(key) {
   setcookie(key,'',-1)
}

//8.call  apply  bind  封装方法
Function.prototype.xdy_call1 = function(context) {
    context.con = this
    context.con()
    delete context.con
}
Function.prototype.xdy_call2 = function(context) {
  var context = context || window
  context.con = this
  var newarr = []
  var args = []
  for(var i=1; i<arguments.length; i++) {
     args.push('arguments['+i+']')
  }
  console.log("哦急急急1111111111a",eval('context.con('+args+')'))
  delete context.con
}
var xdy_foo = {
  value :1
}
function xdy_foofun(name,age) {
  console.log("name",name)
  console.log("age",age)
  console.log('结果',this.value)
}
// xdy_foofun.xdy_call2(xdy_foo,'xiaoming',44)



Function.prototype.bind1=function(context) {
   var that = this
   return function() {
     return that.apply(context)
   }
}

Function.prototype.bind2 = function(context) {
   var that = this
   var args  = Array.prototype.slice.call(arguments,1)
   return function() {
     var bingdargs = Array.prototype.slice.call(arguments)
     return that.apply(context,args.concat(bingdargs))
   }
}

Function.prototype.bind3 = function(context) {
   if(typeof this !=='function') {
     throw new Error('必须是函数')
   }
   var that = this
   var args  = Array.prototype.slice.call(arguments,1)
   var Obj = function () {}
   var bindbound = function () {
     var bingdargs = Array.prototype.slice.call(arguments)
     return that.apply(this instanceof Obj? this : context, args.concat(bingdargs))
   }
   Obj.prototype = this.prototype
   bindbound.prototype = new Obj()
  //  console.log("这里的原型",bindbound.prototype)
  //  console.log("法大师傅士大夫",this.prototype)
  //  console.log("没那么，你们",bindbound)
   return bindbound
}


var xdy_bar = {
  value:1
}
 
function xdy_barfun (name,age) {
   console.log("bind结果",this.value)
   console.log("bindname",name)
   console.log("bindage",age)
}
// var bindfoor = xdy_barfun.bind3(xdy_bar,"xiaohei")
// var bingnew = new bindfoor("77")
// console.log("bind闭包2222222222",bingnew)
// bindfoor("xiaobai",99)

// 9.new操作符实现
function Newcreate(name,age) {
  this.name = name
  this.age = age
}
Newcreate.prototype.address='beijing'
Newcreate.prototype.sayname = function() {
  console.log("我叫"+this.name)
}
function createobject() {
  var obj = new Object()
  var Constructor = [].shift.call(arguments)
  console.log("发士大夫似的",Constructor)
  obj.__proto__ = Constructor.prototype
  var ret = Constructor.apply(obj,arguments)
  return typeof ret === 'object'?ret:obj

}
// var person = createobject(Newcreate,'xiaobai',22)
// console.log("对象是",person)
//10.手写深浅拷贝  clone

function xdy_clone (obj) {
  var xdy_assign = createassignclone (true)
  if(!isobject(obj)) {
    return obj
  }
  if(isarray(obj)) {
    return obj.slice()
  } else {
    return xdy_assign({},obj)
  }
  function isobject (obj) {
     var type = typeof obj
     return type === 'function' || type === 'object' && !!obj
  }
  function isarray(obj) {
    return Object.prototype.toString.call(obj) == '[object Array]'
  }
  function xdykeyarr(obj) {
    var arrkey = []
    for(var key in obj) {
      if(xdyhaskey(obj,key)) {
        arrkey.push(key)
      }
    }
    return arrkey
 }
 function xdyhaskey(obj, key) {
  return obj!=null && hasOwnProperty.call(obj,key)
 }
  function createassignclone(undefinedOnly) {
    return function (obj) {
      console.log("这里的是",obj)
      var length = arguments.length
      if(length<2|| obj== null) {
         return obj
      }
      for(var i=1; i<arguments.length; i++) {
         var srouce = arguments[i]
         var keyarr = xdykeyarr(srouce)
         var len = keyarr.length
         for(var i=0; i<len; i++) {
          var key = keyarr[i]
          if(!undefinedOnly || obj[key] === void 0) {
            obj[key] = srouce[key] 
          }
         }
      }
      return obj
    }
  }
}
// var clone1 = "1111111"
var clone1 = {
  "name":"xiaoming",
  "age":123
}
// var clone2 = xdy_clone(clone1)

// 11.js 打印五角星三角形 金字塔
function consoleto() {
  for (var i = 5; i > 0 ; i--) { //控制行数.
    for ( var j = 5 ; j > 0; j--) {
        //每行打印的个数,每行都要打印,先是打印全是星星.
        //然后,逐渐在前面打印空格的个数,减少后面星星的个数.
        // document.write("☆");
        if(i>=j) {
          document.write("☆");
        } else {
          document.write("&nbsp;")
        }
    }
    document.write("<br />")
  }
}
// consoleto()
//12 无序数组的第k大元素
function findk(arr, k) {
   var leftarr = []
   var rightarr = []
   for(var i=1; i<arr.length; i++) {
      if(arr[i] <=arr[0]) {
        leftarr.push(arr[i])
      } else {
        rightarr.push(arr[i])
      }
   }
   var len = rightarr.length 
   if(len>=k) {
     return findk(rightarr,k)
   } else if(len ==k-1) {
     return arr[0]
   } else {
     return findk(leftarr,k-len-1)
   }
   
   console.log("结果",leftarr)
   console.log("结果2",rightarr)
}
// console.log("第k大的元素",findk([3,1,6,2,4,5],2))
//13  
function  strperm(arr,str) {

}
console.log("字符串判断结果",strperm(['hell','well', 'hello', 'world'],'helloworld'))

//数据结构算法
// 1.二叉树遍历

var Nodearr  = ['1','2','3','4','5','6','7']
var Nodelen = Nodearr.length
var Nodenode = new TreeNode()
Nodenode.val = Nodearr[0]
CreateTreeNode(Nodenode, 0, Nodelen, Nodearr)
//先序遍历
function perorderNode(node,callback) {
  if(node !=null) {
    callback(node.val)
    perorderNode(node.left,callback)
    perorderNode(node.right,callback)
  }
}
//中序遍历  后序遍历 一样 digui
//层次遍历

function  leverorderNode (node) {
  if(node == null) {
    return null
  }
  var arr = []
  arr.push(node)
  var result = []
  var ers = []
  while(arr.length) {
    var temp = arr.shift()
    
    result.push(temp.val)
    if(temp.left) {
      arr.push(temp.left)
    }
    if(temp.right) {
      arr.push(temp.right)
    }
  }
  
  console.log("结果ddd111111111111",ers)

}
// console.log("树",Nodenode)
// leverorderNode(Nodenode)

//2.字符串  统计各个字符出现次数
var str = "abcdedasfbcbseszd"
function charnum(str) {
  var json = {}
  for(var i=0; i<str.length; i++) {
     if(!json[str[i]]) {
      json[str[i]]=1
     } else {
      json[str.charAt(i)]++
     }
  }
  return json
}
// console.log("结果",charnum(str))

//3.判断一个二叉树是否是另一个二叉树的结构
function issubtree(smain, tone) {
  if(smain == null || tone == null) {
    return false
  }
  // console.log("发的说法是打",issame(smain,tone))
  if(issame(smain,tone)) {
    return true
  }
  return issubtree(smain.left,tone) || issubtree(smain.right,tone)

  
}
function issame(smain,tone) {
   if(smain == null && tone == null) {
     return true
   }
   if(smain != null && tone == null) {
    return false
   }
   if(smain == null && tone != null) {
    return false
   }
   if(smain.val != tone.val) {
    return false
   }
   return issame(smain.left,tone.left)  && issame(smain.right, tone.right)
}
var Nodearr1  = ['1','2','3','4','5','6','7']
var Nodelen1 = Nodearr1.length
var Nodenode1 = new TreeNode()
Nodenode1.val = Nodearr1[0]
CreateTreeNode(Nodenode1, 0, Nodelen1, Nodearr1)
var Nodearr2  = ['2','4','5']
var Nodelen2 = Nodearr2.length
var Nodenode2 = new TreeNode()
Nodenode2.val = Nodearr2[0]
CreateTreeNode(Nodenode2, 0, Nodelen2, Nodearr2)
// console.log("结果",issubtree(Nodenode1,Nodenode2))

//4.贪心算法   凑钱
function getmoney(moneyarr, num) {
  moneyarr.sort(function(a,b){
    return b-a
  })
  var res = []
  for(var i=0; i<moneyarr.length; i++) {
   while(num>=moneyarr[i] && num>0) {
     num = num-moneyarr[i]
     res.push(moneyarr[i])
   }
  }
  console.log("排序的",res)

}
var moneyarr =[5,1,50,20,100]
// console.log("结果",getmoney(moneyarr,143))