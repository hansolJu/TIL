# commit과 add의 흐름. 2019.07.15
![](https://t1.daumcdn.net/cfile/tistory/210C8D3E587AE3082E)

로컬 저장소에서 작업을 한 뒤 github에 올리기위해 필요한 작업 흐름은 다음과 같다.

1. 파일들이 위치한 곳을 Working Tree라 한다. 파일을 수정한다.
2. 수정한 파일의 버전기록을 위해 Staging Area에 수정된 파일 리스트를 add시킨다. Staging Area는 파일들의 버전기록(Commit)이 되기 전 대기 장소라고 볼 수 있다.
3. 최종 버전을 기록하기 위해 git commit을 한다. 로컬저장소에는 git commit이 완료된 상태이다. 그러나 최종 컨텐츠 저장소인 원격 저장소(github)에는 수정 사항이 반영되지 않은 상태이다.
4. 원격저장소에 반영시키기 위해 명령어 git push 를 사용하여 커밋 내역을 푸쉬해준다.