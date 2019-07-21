# 함수형 자바스크립트 프로그래밍
### 저자: 유인동
### 펴낸곳: 인사이트

![예제코드](https://github.com/indongyoo/functional-javascript)



---

## 1장 함수형 자바스크립트 소개
    1.1 함수형 프로그래밍 그거 먹는 건가요? - 기존 개발방식에서 함수형으로 고쳐나가보자!
        1.1.1 함수형 자바스크립트를 검색하면 나오는 예제
        1.1.2 값으로써의 함수와 클로저
    1.2 함수형 자바스크립트의 실용성 - 절차지향적으로 작성된 코드를 함수형으로 변경하면서 함수형 자바스크립트의 실용성을 알아가보자!
        1.2.1 회원 목록 중 여러 명 찾기
        1.2.2 for에서 filter로, if에서 predicate로
        1.2.3 함수형 프로그래밍 관점으로 filter 보기


# 1.1 함수형 프로그래밍 그거 먹는 건가요?
## 1.1.1 함수형 자바스크립트를 검색하면 나오는 예제

커링, 부분 적용 등 함수형 자바스크립트 관련 예제들을 처음 보았을 때, 개인적으로는 실용성에 대한 의문이 제일 먼저 들었었다. 대표적인 함수형 자바스크립트 라이브러리인 Underscore.js의 each, map, filter, reduce 등을 보았을 때에도 사용법은 이해했지만 무엇이 특별한지는 잘 느끼지 못했고, 그냥 for문을 대체 하는 건가 싶기도 했다.

    "어떻게 돌아가는지는 알겠는데, 왜 이걸 쓰는 거지?"

함수형 자바스크립트에 관심을 가져 본 적이 있다면 아마 코드 1-1과 같은 예제들을 봤을 것이다. 커링 혹은 부분 적용과 관련된 코드들이다. 함수를 리턴한다거나 괄호가 많은 코드들을 처음 보면 난해하고 생소하게 느껴진다. 개인적으로는 addMaker 같은 함수를 처음 봤을 때, 실용성이 떨어질 거라고 생각했다. 그러나 지금은 addMaker처럼 함수로 함수를 리턴하는 기법을 정말 많이 사용하고 있다.

[코드 1-1] addMaker
```javascript
function addMaker(a) {
  return function(b) {
    return a + b;
  }
}
addMaker(10)(5); // 15

/*
* addMaker(10)의 결과는 function(b) { return 10 + b; } 와 같고 함수다.
* (function(b) { return 10 + b; })(5) 와 같으므로 15가 된다.
* */

```

addMaker는 함수를 값으로 다루는 함수다. addMaker에서는 단 하나의 값이 선언되며 그 값은 함수다. 그리고 그 값은 즉시 리턴된다. addMaker(10)의 결과가 함수이므로 addMaker(10)(5)처럼 바로 실행할 수 있다. 두 개의 함수가 한 번씩 실행되었고, 실행 결과는 15다. 괄호가 두 번 열린 것이 익숙하지 않더라도 자세히 들여다보자. addMaker 함수에 인자 10을 넘겨주며 실행했다. 바로 함수가 리턴되었고, 리턴된 함수를 인자 5와 함께 바로 실행했다.

[코드 1-2] addMaker로 만든 함수

```javascript
var add5 = addMaker(5);
add5(3); // 8
add5(4); // 9
```

이번엔 addMaker(5)를 실행하여 add5라고 이름을 지어주었다. 그러고는 3도 더하고 4도 더해 결과를 얻었다. 이 예제들은 간단하지만 값으로서의 함수, 클로저, 스코프 등의 많은 이야기를 담고 있다.

[코드 1-3] 값으로서의 함수
```javascript
var v1 = 100;
var v2 = function() {};
function f1() { return 100; }
function f2() { return function() {}; }

```
v1은 변수에 100을, v2는 변수에 함수를 담고 있다. f1 함수는 100을 리턴하며, f2 함수는 함수를 리턴한다. v2와 f2처럼 함수는 값으로 다뤄질 수 있다.

---

## 1.1.2 값으로써의 함수와 클로저

다시 addMaker로 돌아와 예제에 담겨 있는 몇 가지 이야기를 살펴 보자. 앞서 다룬 코드의 전체 모습이다.

[코드 1-4] addMaker

```javascript
function addMaker(a) {
  return function(b) {
    return a + b;
  }
}
addMaker(10)(5); // 15

var add5 = addMaker(5);
add5(3); // 8
add5(4); // 9

var add3 = addMaker(3);
add3(3); // 6
add3(4); // 7
```

함수는 값을 리턴할 수 있고 함수는 값이 될 수 있다. addMaker는 내부에서 함수를 정의하고 리턴했다. addMaker가 리턴한 익명 함수는 클로저가 되었다. 리턴된 익명 함수 내부에서 a가 정의된 적이 없지만 a를 참조하고 있고 a는 부모 스코프에 있다. 클로저가 무엇인지 정확히 설명하려면 많은 예제와 설명이 필요하다. 지금 당장은 클로저에 대해 모르더라도 넘어가자. 예제에서 a가 한 번은 5이고 한 번은 3이어서 각각의 결과로 8, 9와 6, 7이 나왔다.

코드 1-4의 addMaker가 실행된 후, 어디서도 addMaker의 인자인 a 값을 변경시키지 않고 있기 때문에 항상 동일한 값을 갖는다. 때문에 위 상황에서 a는 불변하며 상수로 쓰이게 된다. 이 상황에서의 a는 불변하지만, 모든 경우의 클로저가 그렇지는 않다. 클로저가 기억하는 변수의 값은 변할 수 있다. 클로저에 대한 자세한 설명과 예제는 26쪽 1.4절에서 다룬다. 지금은 그저 위와 같은 코드가 ‘값으로서의 함수’와 ‘클로저’를 이용한 함수형 자바스크립트 스타일 중 하나라는 것을 기억하자. 이제 좀 더 실무적인 코드를 만나보자.

---

# 1.2 함수형 자바스크립트의 실용성

절차지향적으로 작성된 코드를 함수형으로 변경하면서 함수형 자바스크립트의 실용성을 알아 보자. 회원 목록 중 특정 나이의 회원들만 뽑거나 특정 조건의 회원 한 명을 찾는 코드들을 함수형 자바스크립트로 리팩터링할 것이다.
## 1.2.1 회원 목록 중 여러 명 찾기
[코드 1-5] for 문으로 필터링하기

```javascript
var users = [
  { id: 1, name: "ID", age: 32 },
  { id: 2, name: "HA", age: 25 },
  { id: 3, name: "BJ", age: 32 },
  { id: 4, name: "PJ", age: 28 },
  { id: 5, name: "JE", age: 27 },
  { id: 6, name: "JM", age: 32 },
  { id: 7, name: "HI", age: 24 }
];

// (1)
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age < 30) temp_users.push(users[i]);
}
console.log(temp_users.length);
// 4

// (2)
var ages = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
  ages.push(temp_users[i].age);
}
console.log(ages);
// [25, 28, 27, 24]

// (3)
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age >= 30) temp_users.push(users[i]);
}
console.log(temp_users.length);
// 3

// (4)
var names = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
  names.push(temp_users[i].name);
}
console.log(names);
// ["ID", "BJ", "JM"]

```

위 코드는 실무에서 자주 다뤄질법한 코드다. (1)에서는 users중에 age가 30 미만인 users[i]만 모아서 몇 명인지를 출력하고 (2)에서는 그들의 나이만 다시 모아 출력한다. (3)에서는 나이가 30 이상인 temp_users가 몇 명인지를 출력하고 (4)에서는 그들의 이름만 다시 모아 출력한다.

위 코드를 함수형으로 리팩토링 해보자. 먼저 중복되는 부분을 찾아보자. (1)과 (3)의 for 문에서 users를 돌며 특정 조건의 users[i]를 새로운 배열에 담고 있는데, if 문의 조건절 부분을 제외하고는 모두 동일한 코드를 가지고 있다. 한 번은 .age < 30, 한 번은 .age >= 30으로 다를 뿐 그 외 부분은 모두 동일하다. 어떻게 중복을 제거해야 할까? 30 부분은 변수로 바꿀 수 있겠지만 .age, <, >= 등은 쉽지 않아 보인다. 이럴 때 함수를 활용하면 이런 부분까지도 쉽게 추상화할 수 있다.

---

## 1.2.2 for에서 filter로 if에서 predicate로

기존의 코드를 활용해 filter 함수를 만들었다. 사용해보기 전에 filter 함수를 들여다보자.

[코드 1-6] filter
```javascript
// 기존 코드
/*
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age < 30) temp_users.push(users[i]);
}
console.log(temp_users.length); // 4
*/

// 바꾼 코드
function filter(list, predicate) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) new_list.push(list[i]);
  }
  return new_list;
}
```


filter 함수는 인자로 list와 predicate 함수를 받는다. 루프를 돌며 list의 i번째의 값을 predicate에게 넘겨준다. predicate 함수는 list.length 만큼 실행되며, predicate 함수의 결과가 참일 때만 new_list.push를 실행한다. new_list.push가 실행될지 여부를 predicate 함수에게 완전히 위임한 것이다 filter 함수는 predicate 함수 내부에서 어떤 일을 하는지 모른다. id를 조회할지 age를 조회할지 어떤 조건을 만들지를 filter는 전혀 모른다. 오직 predicate의 결과에만 의존한다.

마지막에는 new_list를 리턴한다. 이름을 new_라고 붙였는데 이는 함수형 프로그래밍적인 관점에서 굉장히 상징적인 부분이다. 이전 값의 상태를 변경하지 않고(조건에 맞지 않는 값을 지운다거나 하지 않고) 새로운 값을 만드는 식으로 값을 다루는 것은 함수형 프로그래밍의 매우 중요한 콘셉트 중 하나다.

이제 filter를 사용해보자.

[코드 1-7] filter 사용
```javascript
                                   // predicate
var users_under_30 = filter(users, function(user) { return user.age < 30 });
console.log(users_under_30.length);
// 4

var ages = [];
for (var i = 0, len = users_under_30.length; i < len; i++) {
  ages.push(users_under_30[i].age);
}
console.log(ages);
// [25, 28, 27, 24]
                                  // predicate
var users_over_30 = filter(users, function(user) { return user.age >= 30 });
console.log(users_over_30.length);
// 3

var names = [];
for (var i = 0, len = users_over_30.length; i < len; i++) {
  names.push(users_over_30[i].name);
}
console.log(names);
// ["ID", "BJ", "JM"]

```


filter 함수를 실행하면서 predicate 자리에 익명 함수를 정의해서 넘겼다. 익명 함수란, 말 그대로 이름이 없는 함수다. 첫 번째 익명 함수를 보면 user를 받아, user.age < 30 일 때 true를 리턴하고 있다. 이 익명 함수는 users.length 만큼 실행될 것이므로 총 7번 실행되며, 그중 4번은 true를 3번은 false를 리턴한다. 이 익명 함수가 [코드 1-6]의 filter 함수와 어떻게 협업을 하는지 천천히 그려보길 권한다.

두 번째 filter를 실행한 곳에서도 predicate에 익명 함수를 정의해서 넘겼다. 똑같이 7번 실행된다. 그리고 filter 함수는 조건부에서 predicate가 true를 넘겨줄 때만 new_list에 user를 담아 리턴해 준다.

코드 1-5와 비교해 코드가 꽤 짧아졌고 재사용성 높은 함수 filter를 하나 얻었다.

---
## 1.2.3 함수형 프로그래밍적인 관점으로 filter 보기

함수형 프로그래밍 관점에서 filter와 predicate 사이에는 많은 이야기가 담겨 있다. filter 함수에는 for도 있고 if도 있지만, filter 함수는 항상 동일하게 동작하는 함수다. 한 가지 로직을 가졌다는 얘기다. 동일한 인자가 들어오면 항상 동일하게 동작한다. filter 함수의 로직은 외부나 내부의 어떤 상태 변화에도 의존하지 않는다. new_list의 값을 바꾸고 있지만 그 변화에 의존하는 다른 로직이 없다. for는 list.length 만큼 무조건 루프를 돈다. i의 변화에 의존하여 루프를 돌지만 그 외에 i의 변화에 의존한 다른 로직은 없다. i++는 루프를 거들 뿐이다. list[i]의 값을 변경하거나 list의 개수를 변경하는 코드는 없다.

new_list는 이 함수에서 최초로 만들어졌고 외부의 어떠한 상황이나 상태와도 무관하다. new_list가 완성될 때까지는 외부에서 어떠한 접근도 할 수 없기 때문에 filter의 결과도 달라질 수 없다. new_list가 완성되고 나면 new_list를 리턴해버리고 filter는 완전히 종료된다. new_list가 외부로 전달되고 나면 new_list 와 filter와의 연관성도 없어진다.

filter의 if는 predicate의 결과에만 의존한다. filter를 사용하는 부분을 다시 보자. filter와 users, 그리고 filter가 사용할 predicate 함수만 있다. 코드에는 for도 없고 if도 없다. 별도의 로직이 없고 매우 단순하고 쉽다. predicate에서도 역시 값을 변경하지는 않으며, true인지 false인지를 filter의 if에게 전달하는 일만 한다. 코드 1-7의 일부, filter를 사용하는 부분을 다시 보자.

```javascript
filter(users, function(user) { return user.age < 30 });
```

절차지향 프로그래밍에서는 위에서 아래로 내려가면서 특정 변수의 값을 변경해 나가는 식으로 로직을 만든다. 객체지향 프로그래밍에서는 객체들을 만들어 놓고 객체들 간의 협업을 통해 로직을 만든다. 이벤트 등으로 서로를 연결한 후 상태의 변화를 감지하여 스스로 자신이 가진 값을 변경하거나, 상대의 메서드를 직접 실행하여 상태를 변경하는 식으로 프로그래밍을 한다.

함수형 프로그래밍에서는 ‘항상 동일하게 동작하는 함수’를 만들고 보조 함수를 조합하는 식으로 로직을 완성한다. 내부에서 관리하고 있는 상태를 따로 두지 않고 넘겨진 인자에만 의존한다. 동일한 인자가 들어오면 항상 동일한 값을 리턴하도록 한다. 보조 함수 역시 인자이며, 보조 함수에서도 상태를 변경하지 않으면 보조 함수를 받은 함수는 항상 동일한 결과를 만드는 함수가 된다.

객체지향적으로 작성된 코드에서도 이전 객체와 같은 상태를 지닌 새 객체를 만드는 식으로 부수 효과를 줄일 수 있다. 그러나 무수히 많고 각기 다른 종류로 나누어진 객체들을 복사하는 식으로 다루는 것은 운용도 어렵고 객체지향과 어울리지 않는다. 자신의 상태를 메서드를 통해 변경하는 것은 객체지향의 단점이 아니라 객체지향의 방법론 그 자체이다. 반면에 함수형 프로그래밍은 부수 효과를 최소화하는 것이 목표에 가깝다. 이것은 단점이냐 장점이냐의 이야기가 아니라 지향점의 차이에 대한 것이다.

많은 사람들이 함수형 프로그래밍은 객체지향과 완전한 대척점에 있다고 생각하거나 그런 주장을 하기도 한다. 이것은 오해다. 결국에는 함께 동작해야 한다. 현대 프로그래밍에서 다루는 값은 대부분 객체이므로 함수형 프로그래밍에서도 결국 객체를 다뤄야 한다. 다만 기능 확장을 객체의 확장으로 풀어가느냐 함수 확장으로 풀어가느냐의 차이다. 객체를 확장하느냐 객체를 다루는 함수를 늘리느냐의 차이이며 추상화의 단위가 클래스이냐 함수이냐의 차이다.

## 1.2.4 map 함수

리팩터링의 핵심은 중복을 제거하고 의도를 드러내는 것이다. 코드 1-8의 ‘기존 코드’를 보면 회원 목록을 통해 나이와 이름들을 추출하는데 두 코드에도 중복이 있다. 둘 다 for문에서 사용하는 회원 목록을 활용해 같은 크기의 새로운 배열을 만들고 원재료와 1:1로 매핑되는 다른 값을 만들어 담고 있다. 기존 코드를 그대 로 활용하여 map이라는 함수를 만들어 보자.

[코드 1-8] map
```javascript
// 기존 코드
/*
var ages = [];
for (var i = 0, len = users_under_30.length; i < len; i++) {
  ages.push(users_under_30[i].age);
}
console.log(ages);

var names = [];
for (var i = 0, len = users_over_30.length; i < len; i++) {
  names.push(users_over_30[i].name);
}
console.log(names);
 */

// 바꾼 코드
function map(list, iteratee) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    new_list.push(iteratee(list[i]));
  }
  return new_list;
}

```

이번에도 기존의 중복되었던 코드와 거의 동일하고 아주 약간만 고쳤다. new_list에 무엇을 push 할지에 대해 iteratee 함수에게 위임했다. 이제 map 함수를 사용해보자.

[코드 1-9] map 사용
```javascript
var users_under_30 = filter(users, function(user) { return user.age < 30 });
console.log(users_under_30.length);
// 4
                               // iteratee
var ages = map(users_under_30, function(user) { return user.age; });
console.log(ages);
// [25, 28, 27, 24]

var users_over_30 = filter(users, function(user) { return user.age >= 30 });
console.log(users_over_30.length);
// 3
                               // iteratee
var names = map(users_over_30, function(user) { return user.name; });
console.log(names);
// ["ID", "BJ", "JM"]

```

코드가 매우 단순해졌다. for도 없고 if도 없다. 코드를 읽어보면 아래와 같이 읽힌다.

    회원 중 나이가 30세 미만인 사람들을 뽑아 users_under_30에 담는다.
    users_under_30에 담긴 회원의 나이만 뽑아서 출력한다.
    회원 중 나이가 30세 이상인 사람들을 뽑아 users_over_30에 담는다.
    users_over_30에 담긴 회원의 이름만 뽑아서 출력한다.

코드를 해석한 내용과 코드의 내용이 거의 일치하고 읽기 쉽다. map에 대해서는 3장에서 더욱 자세히 다룬다.

---
## 1.2.5 실행 결과로 바로 실행하기

함수의 리턴 값을 바로 다른 함수의 인자로 사용하면 변수 할당을 줄일 수 있다. filter 함수의 결과가 배열이므로 map의 첫 번째 인자로 바로 사용 가능하다.

[코드 1-10] 함수 중첩
```javascript
var ages = map(
  filter(users, function(user) { return user.age < 30 }),
  function(user) { return user.age; });

console.log(ages.length);
// 4
console.log(ages);
// [25, 28, 27, 24]

var names = map(
  filter(users, function(user) { return user.age >= 30 }),
  function(user) { return user.name; });

console.log(names.length);
// 3
console.log(names);
// ["ID", "BJ", "JM"]

```

작은 함수를 하나 더 만들면 변수 할당을 모두 없앨 수 있다.

[코드 1-11] 함수 중첩2
```javascript
function log_length(value) {
  console.log(value.length);
  return value;
}

console.log(log_length(
  map(
    filter(users, function(user) { return user.age < 30 }),
    function(user) { return user.age; })));
// 4
// [25, 28, 27, 24]

console.log(log_length(
  map(
    filter(users, function(user) { return user.age >= 30 }),
    function(user) { return user.name; })));
// 3
// ["ID", "BJ", "JM"]

```

filter 함수는 predicate를 통해 값을 필터링하여 map에게 전달하고 map은 받은 iteratee를 통해 새로운 값들을 만들어 log_length에게 전달한다. log_length는 length를 출력한 후 받은 인자를 그대로 console.log에게 전달하고 console.log는 받은 값을 출력한다.

지금까지 만든 코드 1-12를 코드 1-5와 비교해 보자.

[코드 1-12] filter, map

```javascript
function filter(list, predicate) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) new_list.push(list[i]);
  }
  return new_list;
}

function map(list, iteratee) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    new_list.push(iteratee(list[i]));
  }
  return new_list;
}

function log_length(value) {
  console.log(value.length);
  return value;
}

console.log(log_length(
  map(
    filter(users, function(user) { return user.age < 30 }),
    function(user) { return user.age; })));

console.log(log_length(
  map(
    filter(users, function(user) { return user.age >= 30 }),
    function(user) { return user.name; })));

```

---
## 1.2.6 함수를 값으로 다룬 예제의 실용성

1.1절에서 소개했던 addMaker와 비슷한 패턴의 함수가 실제로도 많이 사용된다. addMaker와 비슷한 패턴의 함수인 bvalue 함수를 만들면 코드 1-12의 코드를 더 줄일 수 있다.

[코드 1-13] 함수를 리턴하는 함수 bvalue
```javascript
// 1.1의 addMaker
function addMaker(a) {
  return function(b) {
    return a + b;
  }
}

function bvalue(key) {
  return function(obj) {
    return obj[key];
  }
}

bvalue('a')({ a: 'hi', b: 'hello' }); // hi

```
bvalue를 실행할 때 넘겨준 인자 key는 나중에 obj를 받을 익명 함수가 기억한다. (클로저가 된다.) bvalue의 실행 결과는 key를 기억하는 함수고 이 함수에게는 key/value 쌍으로 구성된 객체를 인자로 넘길 수 있다. 이 함수는 obj를 받아 앞서 받아두었던 key로 value 값을 리턴한다. 위에서는 a를 기억해두었다가 넘겨진 객체의 obj['a']에 해당하는 결과를 리턴한다.

bvalue를 map과 함께 사용해보자.

[코드 1-14] bvalue로 map의 iteratee 만들기

```javascript
console.log(log_length(
  map(
    filter(users, function(user) { return user.age < 30 }),
    bvalue('age'))));

console.log(log_length(
  map(
    filter(users, function(user) { return user.age >= 30 }),
    bvalue('name'))));

```
map이 사용할 iteratee 함수를 bvalue가 리턴한 함수로 대체했다. 익명 함수 선언이 사라져 코드가 더욱 짧아졌다. addMaker 같은 패턴의 함수도 이처럼 실용적으로 사용된다. 생각보다 실용적이지 않은가? 앞으로도 함수를 리턴하는 함수나 아주 작은 단위의 함수들이 매우 실용적으로 사용되는 사례들을 자주 만나게 될 것이다.
참고

bvalue에 b를 붙인 이유는 인자를 미리 부분적으로 bind해 둔 함수를 만들고 있음을 간결하게 표현한 것이다. 이런 표현은 독자와 소통하기 위함이고 책의 3장 정도까지만 사용한다.

코드 1-15는 ES6의 화살표 함수를 활용한 경우다. 독자가 Node.js를 다루고 있고 버전이 4 이상이라면 지금 바로 화살표 함수를 사용할 수 있다. 아쉽게도 몇몇 브라우저에서는 아직 동작하지 않는다. 화살표 함수에 대한 자세한 설명은 98쪽 ‘2.6 화살표 함수’에서 확인할 수 있다. 지금은 예쁘니까 그냥 보자.

u => u.age < 30은 function(u) { return u.age < 30; }과 같은 동작을 한다. u => u.age는 function(u) { return u.age; }와 같은 동작을 한다.

[코드 1-15] 화살표 함수와 함께
```javascript
// ES6
console.log(log_length(
  map(filter(users, u => u.age < 30), u => u.age)));

console.log(log_length(
  map(filter(users, u => u.age >= 30), u => u.name)));

// 아니면 이것도 괜찮다.
var under_30 = u => u.age < 30;
var over_30 = u => u.age >= 30;

console.log(log_length(
  map(filter(users, under_30), u => u.age)));

console.log(log_length(
  map(filter(users, over_30), u => u.name)));

// 아니면 이것도
var ages = list => map(list, v => v.age);
var names = list => map(list, v => v.name);

console.log(log_length(ages(filter(users, under_30))));
console.log(log_length(names(filter(users, over_30))));

// 마지막으로 한 번만
var bvalues = key => list => map(list, v => v[key]);
var ages = bvalues('age');
var names = bvalues('name');

// bvalues 정도가 있으면 화살표 함수가 아니어도 충분히 간결해진다.
function bvalues(key) {
  return function(list) {
     return map(list, function(v) { return v[key]; });
  }
}
var ages = bvalues('age');
var names = bvalues('name');
var under_30 = function(u) { return u.age < 30; };
var over_30 = function(u) { return u.age >= 30; };

console.log(log_length(ages(filter(users, under_30))));
console.log(log_length(names(filter(users, over_30))));

// bvalues는 이렇게도 할 수 있다. (진짜 마지막)
function bvalues(key) {
  var value = bvalue(key);
  return function(list) { return map(list, value); }
}
```

표기법에 대해

temp_users, new_list, log_length를 보고 카멜 표기법이 아니어서 갸우뚱하는 독자가 있을 것 같다. 코드 컨벤션에 대한 이야기는 지은이의 글의 '예제 코드(xxi쪽)'를 참고해달라. 필자 역시 자바스크립트에서는 카멜 표기법을 사용해야 한다는 의견을 존중한다. 이 책의 표기법이 불편한 분에게는 양해를 구한다.