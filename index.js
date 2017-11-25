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
  
  console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGG",newarr)
  return newarr.concat(left.length?left:right)
}
var arr  =[3,2,1,6,0,8,5]
console.log("结果",mergesort(arr))
console.log("原数组",arr)