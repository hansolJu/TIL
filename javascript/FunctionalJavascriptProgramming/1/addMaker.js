function addMaker(a) {
    return function (b) {
        return a + b;
    }
}

addMaker(10)(5); //15 -함수에 인자 10을 넘겨주며 실행 했다. 바로 함수가 리턴되었고, 리턴된 함수를 인자 5와 함께 바로 실행했다.


// 이 예제들은 값으로서의 함수, 클로저, 스코프 등의 많은 이야기를 담고 있다.
var add5 = addMaker(5);
add5(3); // 8
add5(4); // 9

//값으로서의 함수 - v2와 f2처럼 함수는 값으로 다뤄질 수 있다.
var v1 = 100;
var v2 = function () { };
function f1() { return 100; }
function f2() { return function () { }; }


