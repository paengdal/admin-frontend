# 개발 참고 사항

1. miro에는 email, password로그인으로 나와 있으나 실제로는 nickname과 password로그인임.
    1. nickname으로 반영해서 구현
2. `@Get('check/nickname/exist/:nickname')`
    1. path parameter의 nickname부분에 콜론이 빠져 있음 → 수정 완료
3. ‘가입 취소’는 어떤 액션이 필요한지
    1. 현재는 로그인으로 이동
4. 현재 나의 정보를 볼 수 있는 곳이 없음
    1. 프로필 수정 화면에서 현재 user의 nickname을 초깃값으로 설정하면 더 좋지 않을까 함
5. 비밀번호 변경시의 label은 ‘new password’와 ‘check new password’로 하면 더 직관적일 듯
    1. 반영 완료
6. 게시글 목록(자유게시판) 페이지의 버튼 배치는 하단이 더 자연스러운 듯하여 이동함
7. 게시글 내용의 label을 ‘Body’에서 ‘Content’로 변경 
8. **GET [/post-article/find/many/{skip}/{take}/{order}](http://localhost:5500/api-docs/#/%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0%20%EA%B8%80%20API/PostArticleController_findAll)**
    1. 요청 응답에 nickname이 포함되어 있지 않음. 따라서 게시글 목록에 nickname이 빈값으로 표시
  
    
     <img width="400" alt="image" src="https://github.com/user-attachments/assets/d76c64c4-587a-405d-8f1b-edb173b007e0" />

    
9. 게시글 검색 API 관련 백엔드 수정
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
        
10. 페이지네이션을 제대로 적용하려면 목록 응답값에 totalCount가 필요합니다.
11. 게시글 수정 시 에러 발생. 프론트엔드에서 원인 확인이 어렵습니다.
    
    ```tsx
    {
        "statusCode": 500,
        "message": "Property \"nickname\" was not found in \"PostArticleEntity\". Make sure your query is correct."
    }
    ```
    
12. 댓글 목록 응답값에 nickname없음
13. 댓글 수정, 댓글 삭제 확인 중
