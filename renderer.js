// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var rowNum = 15//棋盘大小
var winAmount = 5//连子数
let btn = document.querySelector('button')
let h3 = document.querySelector('h3')
let pp = document.querySelector('p')
let h1 = document.querySelector('h1')
let h4 = document.querySelector('h4')
let h5 = document.querySelector('h5')
var td = document.getElementsByTagName('td');//查询所有td节点
btn.addEventListener('click', function () {
  clear(sta)
})

//交替落子玩家
var count = 0

//新建二维数组，存放棋盘状态
//0-空 
//1-plaryer1已落子
//2-plaryer2已落子
var sta = new Array(rowNum)
clear(sta)
print(sta)
h4.innerHTML = '请玩家1'+'<i class="circle c1"></i>'+'下棋'
document.write("表格数组长度：" + td.length)

// 循环添加点击事件
for (let j = 0; j < td.length; j++) {//循环所有节点
  td[j].onclick = function () {//每个节点添加点击事件
    if(this.innerHTML){
      return
    }
    if (count++ % 2 == 0) {
      //player1
      this.innerHTML = '<i class="circle c1"></i>'
      drop(j, "1")
      h4.innerHTML = '请玩家2'+'<i class="circle c2"></i>'+'下棋'
      print(sta)
      if(isWin(sta ,j, "1")){
        h1.innerHTML = h1.innerHTML + "玩家1，恭喜你！！！"
      }
    } else {
      //player2
      this.innerHTML = '<i class="circle c2"></i>'
      drop(j, "2")
      h4.innerHTML = '请玩家1'+'<i class="circle c1"></i>'+'下棋'
      print(sta)
      if(isWin(sta ,j, "2")){
        h1.innerHTML = h1.innerHTML + "玩家2，恭喜你！！！"
      }
    }
  }
}

/*棋盘数组*/
//清空棋盘
function clear(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rowNum)
    for (var j = 0; j < arr[i].length; j++) {
      sta[i][j] = "0";
    }
  }
  for(var j=0;j<td.length;j++){
    td[j].innerHTML=""
  }
  h1.innerHTML = "赢家："
}
//打印二维数组
function print(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      pp.innerHTML = pp.innerHTML + arr[i][j] + " "
    }
    pp.innerHTML = pp.innerHTML + "<br>"
  }
}
//落子
function drop(pos, player) {
  row = parseInt(pos / rowNum);
  col = pos % rowNum;
  sta[row][col] = player;
  h5.innerHTML = "<br>" + "sta[" + row + "][" + col + "]:" + player
}

//判断谁赢
function isWin(a ,pos, player) {
  var win = false
  row = parseInt(pos / rowNum);
  col = pos % rowNum;
  if(count%2==1){
    console.log("原始坐标："+row+","+col+":玩家1")
  }else{
    console.log("原始坐标："+row+","+col+":玩家2")
  }
  
  var amount = 1;//计数连续的子数
  // 一共4个方向判断输赢
  // 判断上下方向
  for(var r=row-1;r>=0;r--){//往上判断，row减，col不变
    if(a[r][col] == player){
      amount=amount+1
      console.log("坐标往上："+r+","+col+"："+"amount:"+amount)
    }else{
      break
    }
  }
  for(var r=row+1;r<rowNum;r++){//往下判断，row加，col不变
    if(a[r][col] == player){
      amount=amount+1
      console.log("坐标往下："+r+","+col+"："+"amount:"+amount)
    }else{
      break
    }
  }
  if(amount>=winAmount){
    win = true;
    return win;
  }
  //判断左右方向
  amount = 1
  for(var c=col-1;c>=0;c--){//往左判断，col减，row不变
    if(a[row][c] == player){
      amount=amount+1
      console.log("坐标往左："+row+","+c+"："+"amount:"+amount)
    }else{
      break
    }
  }
  for(var c=col+1;c<rowNum;c++){//往右判断，col加，row不变
    if(a[row][c] == player){
      amount=amount+1
      console.log("坐标往右："+row+","+c+"："+"amount:"+amount)
    }else{
      break
    }
  }
  if(amount>=winAmount){
    win = true;
    return win;
  }
  //判断左下右上方向
  amount = 1
  for(var c=col-1,r=row+1;c>=0,r<rowNum;c--,r++){//往左下判断，col减，row加
    if(a[r][c] == player){
      amount=amount+1
      console.log("坐标往左下："+r+","+c+"："+"amount:"+amount)
    }else{
      break
    }
  }
  for(var c=col+1,r=row-1;c<rowNum,r>=0;c++,r--){//往右判断，col加，row不变
    if(a[r][c] == player){
      amount=amount+1
      console.log("坐标往右上："+r+","+c+"："+"amount:"+amount)
    }else{
      break
    }
  }
  if(amount>=winAmount){
    win = true;
    return win;
  }
  //判断左上右下方向
  amount = 1
  for(var c=col-1,r=row-1;c>=0,r>=0;c--,r--){//往左上判断，col减，row减
    if(a[r][c] == player){
      amount=amount+1
      console.log("坐标往左上："+r+","+c+"："+"amount:"+amount)
    }else{
      break
    }
  }
  for(var c=col+1,r=row+1;c<rowNum,r<rowNum;c++,r++){//往右下判断，col加，row加
    if(a[r][c] == player){
      amount=amount+1
      console.log("坐标往右下："+r+","+c+"："+"amount:"+amount)
    }else{
      break
    }
  }
  if(amount>=winAmount){
    win = true;
    return win;
  }
  return win;
}
