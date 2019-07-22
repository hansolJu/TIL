var users = [
    { id: 1, name: "ID", age: 32 },
    { id: 2, name: "HA", age: 25 },
    { id: 3, name: "BJ", age: 32 },
    { id: 4, name: "PJ", age: 28 },
    { id: 5, name: "JE", age: 27 },
    { id: 6, name: "JM", age: 32 },
    { id: 7, name: "HI", age: 24 }
];

//1 users중에 age가 30미만인 users[i]만 모아서 몇 명인지를 출력. --- filter함수의 사용.
/* var temp_users = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
    if (users[i].age < 30) temp_users.push(users[i]);
}
console.log(temp_users[i].age);// 4 */

function filter(list, predicate) {
    var new_list = [];
    for (var i = 0, len = list.length; i < len; i++) {
        if (predicate(list[i])) new_list.push(list[i]);
    }
    return new_list;
}
                                    //predicate
var users_under_30 = filter(users, function (user) { return user.age < 30 });
console.log(users_under_30.length);// 4
var names = [];
for(var i=0,len=users_over_30.length;i<len; i++){
    names.push(users_over_30[i].name);
}
console.log(names);//["ID","BJ","JM"]


//2 그들의 나이만 다시 모아서 출력. --- map 함수의 사용
/* var ages = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
    ages.push(temp_users[i].age);
}
console.log(ages); //[25, 28, 27, 24] */

// 바꾼 코드 - new_list에 무엇을 push할지에 대해 iteratee 함수에게 위임.
function map(list,iteratee){
    var new_list = [];
    for(var i=0, len=list.length; i<len; i++){
        new_list.push(iteratee(list[i]));
    }
    return new_list;
}

//3 나이가 30 이상인 temp_users가 몇명인지를 출력.
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
    if (users[i].age >= 30) temp_users.push(users[i]);
}
console.log(temp_users.length) //3

//4 그들의 이름만 다시 모아서 출력.
var names = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
    names.push(temp_users[i].name);
}
console.log(names);//["ID","BJ","JM"]


