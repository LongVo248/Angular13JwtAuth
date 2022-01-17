export class PagedResponse<userInfo>{
  content: userInfo[] | undefined;
  count: number | undefined;
  totalCount: number |undefined;
}
