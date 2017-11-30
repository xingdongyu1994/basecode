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

// window.onresize = debounce(resizechange, 5000,true);

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
  var  result = []
  permute(arr,0)
}
var reuslt = []
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
console.log('结果',perm([1,2,3]))


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

//字符串  统计各个字符出现次数
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
