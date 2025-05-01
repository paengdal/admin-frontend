## 개발 스택
- React(by vite)
- Typescript
- tanstack-query, tailwind CSS
- axios, react hook form, react router, zod, dayjs

## 개발 참고 사항
- Atomic 디자인 패턴 적용
- 사용자 인증/인가
  - 액세스 토큰은 로컬 스토리지에 저장 후 axois interceptor를 통해 모든 요청에 포함
    - 예외: 로그인/회원가입/닉네임 확인/이메일 확인
  - AuthContext를 이용한 사용자 정보 관리
- tanstack-query 활용
  - 기본 옵션: staleTime 5분, retry 0
  - 사용자 정보는 staleTime Infinity
  - invalidateQueries, removeQueries, refetchQueries 등의 적절한 활용
- react hook form과 zod를 이용한 validation

## 요구사항에 없거나 다르게 구현한 부분
- 비밀번호 변경시의 label은 ‘new password’와 ‘check new password’로 하면 더 직관적일 듯하여 변경
- 게시글 목록(자유게시판) 페이지의 버튼 배치는 하단이 더 자연스러운 듯하여 이동함
- 댓글 작성 및 목록 표시 UI 변경
- 게시글 내용의 label을 ‘Body’에서 ‘Content’로 변경 

## 향후 개선 포인트
- 컴포넌트를 보다 재사용 가능하게 만들고 효율적으로 활용할 수 있을 것 같습니다.
  - 현재는 LoginInput, EamilInput, NicknameInput 등 유사한 컴포넌트들이 모두 별도의 코드로 구현됨
  - react hook form의 useController를 사용하여 molecules 단위의 InputText, InputEmail,..등의 컴포넌트 생성/활용
- login요청의 응답에 user정보가 포함될 경우 setQueryData를 통해 보다 빠르고 정확한 세팅이 가능할 것 같습니다.
- (필요할 경우)관리자 페이지의 상세 기획에 따라 tanstack-query의 세부 옵션을 보다 최적화할 수 있을 것 같습니다.
- 현재 나의 정보를 볼 수 있는 화면이 없어서 '프로필 수정'화면에서 현재 정보를 초깃값으로 세팅하면 더 좋을 것 같습니다.

## 기타 참고 사항

1. miro에는 email, password로그인으로 나와 있으나 실제로는 nickname과 password로그인임.
    1. nickname으로 반영해서 구현
2. `@Get('check/nickname/exist/:nickname')`
    1. path parameter의 nickname부분에 콜론이 빠져 있음 → 수정 완료
3. ‘가입 취소’는 어떤 액션이 필요한지
    1. 현재는 로그인으로 이동
4. **GET [/post-article/find/many/{skip}/{take}/{order}](http://localhost:5500/api-docs/#/%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0%20%EA%B8%80%20API/PostArticleController_findAll)**
    1. 요청 응답에 nickname이 포함되어 있지 않음. 따라서 게시글 목록에 nickname이 빈값으로 표시
  
    
     <img width="400" alt="image" src="https://github.com/user-attachments/assets/d76c64c4-587a-405d-8f1b-edb173b007e0" />

    
5. 게시글 검색 API 관련 백엔드 수정
    1. 기존
        
        ```tsx
        @Get('search/:keyword')
        ...
        async search(
            @Param('skip') skip: number,
            @Param('take') take: number,
            @Param('order') order: TYPE_ORDER,
            @Param('keyword') keyword: string,
          ) {
        ```
        
    2. 수정
        1.  
        
        ```
        async search(
            @Param('keyword') keyword: string,
            @Query('skip') skip: string,
            @Query('take') take: string,
            @Query('order') order: TYPE_ORDER,
          ) {
            try {
              const numericSkip = Number(skip);
              const numericTake = Number(take);
              return {
                result: await this.postArticleService.findAllByKeyword(
                  numericSkip,
                  numericTake,
                  order,
                  keyword,
        ```
        
6. 페이지네이션을 제대로 적용하려면 목록 응답값에 totalCount가 필요 -> 백엔드 수정 완료
7. 게시글 수정 시 에러 발생 -> 백엔드 수정 완료
    
    ```tsx
    {
        "statusCode": 500,
        "message": "Property \"nickname\" was not found in \"PostArticleEntity\". Make sure your query is correct."
    }
    ```
    
8. 댓글 목록 응답값에 nickname없음 -> 백엔드 수정 완료
9. 댓글 수정, 댓글 삭제 확인 중 -> 백엔드 수정 완료(삭제는 delete_comment로 처리)
