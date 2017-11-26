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
var show = obj.showname
var bindshowname = bind(show,obj)
var pp = new bindshowname()
console.log("，，，",pp)