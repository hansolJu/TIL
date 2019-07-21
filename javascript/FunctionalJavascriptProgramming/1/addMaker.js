function addMaker(a){
    return function(b){
        return a+b;
    }
}

addMaker(10)(5); //15 -함수에 인자 10을 넘겨주며 실행 했다. 바로 함수가 리턴되었고, 리턴된 함수를 인자 5와 함께 바로 실행했다.

