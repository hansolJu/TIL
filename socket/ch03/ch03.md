# 1.소켓에 할당되는 IP주소와 PORT번호

## 인터넷 주소(Internet Address)
### 인터넷 주소란?
- 인터넷상에서 컴퓨터를 구분하는 목적으로 사용되는 주소
- 4바이트 주소체계인 IPv4와 16바이트 주소체계인 IPv6가 존재한다.
- 소켓을 생성할 때 기본적인 프로토콜을 지정해야 한다.
- 네트워크 주소와 호스트 주소로 나뉜다. 네트워크 주소를 이용해서 네트워크를 찾고, 호스트 주소를 이용해서 호스트를 구분한다.

## 클래스 별 네트워크 주소와 호스트 주소의 경계

- 클래스 A의 첫 번째 바이트 범위: 0이상 127이하
- 클래스 B의 첫 번째 바이트 범위: 128~191
- 클래스 C의 첫 번째 바이트 범위: 192~223

달리 말하면...

- 클래스 A의 첫 번째 비트는 항상 0으로 시작.
- 클래스 B의 첫 두 비트는 항상 10으로 시작.
- 클래스 C의 첫 세 비트는 항상 110으로 시작.

때문에 첫 번째 바이트 정보만 참조해도 IP주소와 클래스 구분이 가능하며, 이로 인해서 네트워크 주소와 호스트 주소의 경계 구분이 가능하다.

## 소켓의 구분에 활용되는 PORT번호
### PORT번호
- IP는 컴퓨터를 구분하는 용도로 사용되며, PORT번호는 소켓을 구분하는 용도로 사용된다.
- 하나의 프로그램 내에서는 둘 이상의 소켓이 존재할 수 있으므로, 둘 이상의 PORT가 하나의 프로그램에 의해 할당 될 수 있다.
- PORT 번호는 16 비트로 표현, 따라서 그 값은 0 이상 65535이하
- 0~1023은 잘 알려진 PORT(Well-known PORT)라 해서 이미 용도가 결정되어 있다.
---

# 2. 주소 정보의 표현
## IPv4 기반의 주소 표현을 위한 구조체

- IP주소와 PORT번호는 구조체 sockaddr_in의 변수에 담아서 표현한다.
```c
struct sockaddr_in{
    sa_family_t sin_family;//주소체계
    uint16_t    sin_port;//port번호
    struct in_addr  sin_addr;//32비트 ip주소
    char    sin_zero[8];//사용되지 않음.
};

struct in_addr{
    in_addr_t   s_addr;//32비트 ipv4인터넷 주소
}
```
int8_t      signed 8-bit int
uint8_t     unsigned 8-bit int (unsigned char)
int16_t     signed 16-bit int (unsigned char)
uint16_t    unsigned 16-bit int (unsigned short)
int32_t     signed 32-bit int (unsigned long)

sa_family_t 주소체계
socklen_t   길이정보(length of struct)

in_addr_t   ip주소정보, uint32_t로 정의되어 있음
in_port_t   PORT번호정보, uint16_t로 정의되어있음.

## 구조체 sockaddr_in의 멤버에 대한 분석

- 맴버 sin_family
    - 주소체계 정보 저장

- 맴버 sin_port
    - 16비트 PORT번호 저장
    - 네트워크 바이트 순소로 저장
- 맴버 sin_addr
    - 32비트 ip주소정보 저장
    - 네트워크 바이트 순서로 저장
    - 맴버 sin_addr의 구조체 자료형 in_addr 사실상 32비트 정수자료형
- 맴버 sin_zero
    - 특별한 의미를 지니지 않는 맴버.
    - 반드시 0으로 채워야 한다. ->구조체 크기를 맞추어주는 역할

## 구조체 sockaddr_in의 활용의 예

- 구조체 변수 sockaddr_in은 bind 함수의 인자로 전달되는데, 매개변수 형이 sockaddr이므로 형 변환을 해야만 한다.
```c
struct sockaddr_in serv_addr;

//......
if(bind(serv_sock,(struct sockaddr*) &serv_addr, sizeof(serv_addr))== -1)
    error_handling("bind() error");
//......

```

- 구조체 sockaddr은 다양한 주소체계의 주소정보를 담을 수 있도록 정의되었다. 그래서 IPv4의 주소정보를 담기가 불편하다. 이예 동일한 바인트 열을 구성하는 구조체 sockaddr_in이 정의되어있으며, 이를 이용해서 쉽게 IPv4의 주소정보를 담을 수 있다.

```c
struct sockaddr{
    sa_family_t sin_family; //주소체계
    char        sa_data[14]; //주소정보
}
```

---