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

//코드가 실행된후, 어디서도 addMaker의 인자인 a값을 변경시키지 않고 있기 때문에 항상 동일한 값을 갖는다. 때문에 위 상황에서 a는 불변하며 상수로 쓰이게된다. 
//이 상황에서의 a는 불변하지만, 모든 경우의 클로저가 그렇지는 않다. 클로저가 기억하는 변수의 값은 변할 수 있다.
var add3 = addMaker(3);
add3(3); // 6
add3(4); // 7
