//题目：求所有连续个整数相加等于n

//分析：
//如果相加的连续整数的个数为奇数个，那么和等于中间数字的个数倍。
//如果相加的连续整数的个数为偶数个，那么和等于中间两个数字平均数的个数倍。
//所以先找到n能够整除的数，只有两种情况：
//1、两个数相乘等于n，一个为奇数，一个为偶数。
//2、两个数相乘等于n，两个都为奇数。
//（两个都为偶数的情况不可能，因为那就意味着连续整数的个数一定是偶数个，而偶数个连续整数的中间的数的偶数倍一定是奇数，所以排除两个都为偶数的情况）
//具体方法是：首先找到连续整数的中间数，再根据中间数找到连续整数的第一个数，再判断第一个数是否大于0，如果为真，则存在。

function calculate(n) {
  var result = new Array();
  if (n <= 2) {
    return result;
  }

  //如果n为奇数，那么至少有两个数相加等于n。
  if (n % 2 !== 0) {
    var startNum = (n - 1) / 2;
    result.push(startNum + " " + 2);
  }

  //找到n能够整除的整数。
  var i = 2, j = n;
  do {
    if (n % i === 0) {
      j = n / i;
      //console.log("n / " + i + " = " + j);
      judge(i, n / i);
    }
    i++;
  } while (i < j);

  //判断是否有符合条件的情况并将相关信息存储在result中。
  function judge(num1, num2) {
    var startNum;

    //num1和num2为一个奇数一个偶数的情况
    if (num1 % 2 !== 0 ^ num2 % 2 !== 0) {
      var odd = (num1 % 2 !== 0) ? num1 : num2;
      var even = (num1 % 2 !== 0) ? num2 : num1;

      startNum = ((odd - 1) / 2) - (even - 1);
      if (startNum > 0) {
        result.push(startNum + " " + 2 * even);
      }

      startNum = even - ((odd - 1) / 2);
      if (startNum > 0) {
        result.push(startNum + " " + odd);
      }

    } //num1和num2全为奇数的情况
    else if (num1 % 2 !== 0 && num2 % 2 !== 0) {

      startNum = num1 - ((num2 - 1) / 2);
      if (startNum > 0) {
        result.push(startNum + " " + num2);
      }

      startNum = num2 - ((num1 - 1) / 2);
      if (startNum > 0 && num1 != num2) {
        result.push(startNum + " " + num1);
      }

    }
  }

  return result;
}

//连接字符串
function concatString(startNum, circle) {
  var string = startNum.toString();
  for (var k = 1; k < circle; k++) {
    string = string.concat(" ").concat((startNum + k));
  }
  return string;
}

//主程序main。
function show(n) {
  var result = calculate(n);

  result.sort(function (a, b) {
    return parseInt(a.split(" ")[0]) - parseInt(b.split(" ")[0]);
  });

  if (result.length !== 0) {
    for (var i in result) {
      var element = result[i].split(" ");
      console.log(concatString(parseInt(element[0]), parseInt(element[1])));
      document.write(concatString(parseInt(element[0]), parseInt(element[1])) + "</br>");
    }
  } else {
    console.log("NONE");
    document.write("NONE");
  }
}

show(200);