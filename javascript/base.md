# 자바 스크립트 기초 2019.07.16

## 학습 목표
- 자바스크립트의 다양한 문법을 익히고, 함수단위로 프로그래밍 할 수 있다.


### 변수
변수는 var, let, const 로 변수를 선언할 수 있다. 어떤 것을 사용하는 가에 의해서 scope라는 변수의 유효범위가 달라진다.

우선 var를 사용해서 변수를 선언한다. 
여러가지 type의 변수 선언방법을 확인해보자. 

```javascript
var a = 2;
var a = "aaa";
var a = 'aaa';
var a = true;
var a = [];
var a = {};
var a = undefined;
  ```


### var로 선언된 변수의 scope

var 를 쓰지 않으면 전역변수가 된다.
var 를 전역공간에 쓰면 전역변수다.
var 를 함수안에서 사용하면 함수안에서만 유효하다 (함수단위의 변수 유효범위를 갖는 것)

```javascript
	var name = 'play ground';
	function home() {
  	  var homeName = 'my house';
	  console.log(name); //play ground
	  console.log(homeName); //my house
	}
	home();	
```


### 블럭단위의 scope

ES2016에서는 const나 let 키워드를 사용해서 변수를 선언하면 Block({})단위의 scope를 만들 수 있다.
키워드를 사용하면 됨.

```javascript
var name = 'play ground';
function home() {
  var homeName = 'my house';
  for (let i = 0; i<1000; i++){}
  console.log(i); //i is not defined
}

```

따라서,Block단위로 사용할때는 const나 let을 사용하는 것을 권장.



### const
const로 선언된 변수는 재선언과 재할당을 할 수 없다.
let 은 재선언은 안되지만 재할당은 가능하다.

```javascript
function home() {
  const homeName = 'my house';
  homeName = 'your house';
}

home() //TypeError: Assignment to constant variable.

```



주의할점은, const를 사용한다고 수정할수 없음을 의미하는 것은 아니다.
const를 사용하더라도 배열과 오브젝트의 값을 변경하는 것은 가능.

```javascript
function home() {
  const list = ['john', 'adele', 'hary'];
  list.push('tiger');
  return list;
}
home() //["john", "adele", "hary", "tiger"]
```


### const,var, let 추천하는 사용전략

const를 먼저 사용하자. 
재할당해야 하는 경우가 생기면 let을 사용한다.
var는 block scope를 지원하지 않음으로 사용하지 않는다. 

------

### 연산자
연산자 우선순위를 표현하기 위해서는 ()를 사용하면 된다. 
수학연산자는 +,-,*,/,%(나머지) 등이 있다.

******논리 연산자, 관계연산자, 삼항연산자도 있음. 


```javascript
//or 연산자 활용
const name = "crong";
const result = name || "codesquad";
console.log(result);
const name = "";
const result = name || "codesquad";
console.log(result);
```

---
### 연산자 - 비교연산자
비교는 == 보다는 ===를 사용한다. ==로 인한 다양한 오류 상황이 있는데 아래 결과를 참고하자. 
```javascript
0 == false;
“” == false;
null == false;
0 == “0”;
null==undefined;
```

이런 현상에 대해서는 자바스크립트를 이해하는데 어려움을 느낄 수 있다. 
이런 부분도 자바스크립트의 특징중 하나이며, 이유에 대해서 궁금해 할 필요가 있다. 
이 부분을 좀더 알기 위해서 암묵적인 형변환에 대해서 알아보자.

->> 타입지정자가 다른 언어에 비해서 느슨하기 때문이다.

### 자바스크립트의 Type
자바스크립트 타입에는 다양한 것이 존재.

```javascript
> undefined, null, boolean, number, string, object, function, array, Date, RegExp,Symbol
```

타입은 선언할때가 아니고, 실행타임에 결정된다. 함수안에서의 파라미터나 변수는 실행될때 그 타입이 결정된다. 
타입을 체크하는 또렷한 방법은 없다. 정확하게는 toString.call 을 이용해서 그 결과를 매칭하곤하는데, 문자,숫자와 같은 기본타입은 typeof 키워드를 사용해서 체크할 수 있다. 
배열의 경우 타입을 체크하는 isArray함수가 표준으로 있다.(브라우저 지원범위를 살펴보고 사용해야 함)


### 비교문, 분기문, 반복문
**** if/switch/for/for-of 문은 MDN사이트를 찾아서 공부하도록 한다. ****


배열의 경우 forEach와 같은 메서드를 통해서 좀더 쉽게 탐색할 수 있다. 

for-of를 통한 탐색도 자주 사용된다. 
(for-of를 따르는 타입은 배열이외에도 문자열등 더 많다. iterable object인 경우에 for-of를 사용할 수 있는데 이부분은 나중에 더 공부한다)

for-in은 객체를 탐색할때 사용한다. 


### 함수 - 함수의 선언
함수는 여러개의 인자를 받아서, 그 결과를 출력한다. 
파라미터의 갯수와 인자의 갯수가 일치하지 않아도 오류가 나지 않는다. 
파라미터가 1개일때, 인자의 갯수가 0개라면, 파라미터(매개변수)는 undefined이라는 값을 갖게 된다. 값이 할당되지 않았기 때문이다. 

```javascript
function test() { 
	console.log(printName()); 
	 function printName() {
		return 'anonymouse';
	}
}
test() //anonymouse
```
위 함수 선언코드는 함수선언문이라고 한다. 

### 함수 - 함수표현식
함수는 아래 printName과 같이 표현할 수도 있다. (함수가 표현식으로 표현한다는 것은 '값'으로 함수가 표현된다고 생각할 수 있다)
이렇게 표현하면 함수선언문과 달리 선언과 호출순서에 따라서 정상적으로 함수가 실행되지 않는다.
```javascript
function test() { 
	console.log(printName()); 
	var printName = function() {
		return 'anonymouse';
	}
}

test();
//TypeError: printName is not a function
```

오류내용을 보면 function이 아니라고 나왔다.   이유는 printName이 실행되는 순간 'undefined'으로 지정됐기 때문이다. 
자바스크립트 함수는 실행되기 전에 함수안에 필요한 변수값들을 미리 다 모아서 선언한다. 함수 안에 있는 변수들을 모두 끌어올려서 선언한다고해서, hoisting이라고 한다.
따라서 아래 코드역시 함수를 값으로 가지지만 어쨋든 printName도 변수임으로 끌어올려지게 되고, 값이 할당되기 전에 실행됐음으로 undefined이 할당된 상태이다. 


```javascript
printName(); //아직, printName이 undefined으로 할당된 상태이다. 
var printName = function(){}
```
printName이라는 변수가 존재하고 아직 값이 할당되기 전임으로 printName에는 'undefined'이라는 기본 값이 할당된 셈이다.

const와 let을 사용하면 또 달라진다.   이번에는 ReferenceError 가 발생한다. 
const, let을 가급적 사용해서 이와 같이 명확하게 오류를 발생시키는 것이 더 좋다. 

```javascript
function test() { 
	console.log(printName()); 
	const printName = function() {
		return 'anonymouse';
	}
}

test();
//ReferenceError: printName is not defined
```

### 함수 - 반환값과 undefined
아래 함수의 반환값은 무엇일까? 
```javascript
function printName(firstname) {
   const myname = "jisu";
   const result = myname + " " +  firstname;
}
```
정답은 undefined이다. 자바스크립트 함수는 반드시 return값이 존재하며, 없을때는 기본 반환값인 'undefined'이 반환된다.

### 함수 - arguments 속성
함수가 실행되면 그 안에서 arguments라는 특별한 지역변수가 존재한다.
자바스크립트 함수는 선언한 파라미터보다 더 많은 인자를 보낼 수도 있다. 이때 넘어온 인자를 arguments로 배열의 형태로 하나씩 접근할 수가 있다. arguments는 배열타입은 아니다.-->객체타입이다. 따라서 배열의 메서드를 사용할 수가 없다.
```javascript
function a() {
 console.log(arguments);
}
a(1,2,3);
```
자바스크립트의 가변인자를 받아서 처리하는 함수를 만들때 등에서 arguments속성을 유용하게 사용할 수가 있다.

\# 해볼만한 것(1~무한대까지 인자를 받아 합을 구하는 함수를 만들어보자)


### arrow function  

ES2015에는 [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)이 추가됐다. 간단하게 함수를 선언할 수 있는 문법으로 처음에는 꽤 낯설다.

```javascript
function getName(name) {
   return "Kim " + name ;
}

//위 함수는 아래 arrow함수와 같다.
const getName = (name) => "Kim " + name;
```

arrow 함수는 어디서쓸까? 
자바스크립트는 함수의 인자로 함수를 넣을 수 있고, 반환값으로 함수를 사용할 수 있다.
arrow 함수를 이때 사용하면 코드가 보기가 좀더 낫다. 
이런 경우에 arrow 함수를 활용해보도록 하자. 


### 함수호출방식

자바스크립트 함수 호출은 이렇게 불려진다.

run이 호출되고 그다음에 printName이 호출된다

```javascript
// 함수의 호출.
function printName(firstname) {
	var myname = "jisu";
	return myname + " ," +  firstname;
}

function run(firstname) {
   var firstname = firstname || "Youn";
   var result = printName(firstname);
   console.log(result);
}

run();
```

### 재귀(rescursion) 란?

함수가 함수 안에서 자신을 다시 호출하는 것

```
var foo = function() {
    foo();
}
```


### 카운트다운 - 재귀로 구현

음 반복문을 없애고 함수를 다시 호출.

```javascript
var countdown2 = function(n) {
    console.log(n);
    countdown2(n - 1);
};
```

------

#### scope chain

변수를 찾기 위해서,  지역스코프(안쪽함수)에서 전역스코프까지 단계적으로 올라가면서 찾는다.
이를 scope chain이라고 한다. 

```javascript
const name = 'play ground';
function home() {
  const homeName = 'my house';
  function printName() {
     const nickName = 'crong house';
     console.log(nickName); 	//crong house
     console.log(homeName); 	//my house
     console.log(name); 	//play ground
  }
  printName();

}
home();
```

----
## #참고지식들

### 자바스크립트의 버전
- 자바스크립트 버전은 ECMAScript(줄여서ES)의 버전에 따라서 결정되고, 이를 자바스크립트실행 엔진이 반영한다.
- ES5, ES6(ES2015).. 이런식으로 버전을 일컫는다.
- ES6는 ES5문법을 포함하고 있어 하위호환성 문제가 없다.  2019년 현재 ES2015를 기준으로 개발하는 상황이다.
- Front-end의 경우, ES6와 같은 문법을 을 사용하고 싶지만, 브라우저 호환성문제가 있다면 코드를 transpiling 해서 배포하는 경우도 많다. 

### 문자열 처리

자바스크립트의 문자와 문자열은 같은 타입으로 취급. 
```javascript
typeof "abc";  //string
typeof "a";    //string
typeof 'a';    //string. single quote도 사용가능.
```

### 문자열에 다양한 메서드가 있음.

```javascript
"ab:cd".split(":"); 		//["ab","cd"]
"ab:cd".replace(":", "$"); 	//"ab$cd"
" abcde  ".trim();  		//"abcde"
"뺉".charCodeAt(); 			//뭘까? 
```


### express & statements
expression(식) 과 statements(문) 의 차이는 용어이긴 하지만 그 차이를 알아둘 필요가 있다. 
expression은 값(value)를 생산해내고, 
statements는 프로그램 로직을 만들어낸다(조건문, 반복문 등)

아래 내용을 참고하면 좋다. 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements
http://2ality.com/2012/09/expressions-vs-statements.html



### 함수호출과 stack

함수 호출 관계는 다음과 같습니다 

bar()  -> foo()

메모리에서는 우측의 Call Stack에서와 같이 순서대로 쌓이게 된다.

bar함수에서 foo를 호출한 후 foo함수의 결과를 받아올 때 까지 bar함수는 메모리 공간에서 사라지지 못하고 기다리고 있는 것이다.  foo의 경우에는 실행이 끝나고 return문이 실행되면 메모리 공간에서 사라진다. 다시말해서 Call Stack에서 없어지는 것이다.

![call stack](https://cdn-images-1.medium.com/max/1760/1*E3zTWtEOiDWw7d0n7Vp-mA.gif)

[출처](https://medium.com/@gaurav.pandvia/understanding-javascript-function-executions-tasks-event-loop-call-stack-more-part-1-5683dea1f5ec)

call stack은 이렇게 동작하지만 함수를 연속적으로 계속 호출하면 call stack이 꽉 차버리면서 더이상 실행되지 못하고 오류가 발생할 것이다. 
브라우저에서는 대부분 지정된 횟수만큼만 call stack을 쌓게 미리 설정해둔 경우가 많다고 한다.

따라서 혹시 개발중에 **Maximum call stack size exceeded** 오류를 발견해도 너무 놀라지 말고, 대처하도록 해야한다.