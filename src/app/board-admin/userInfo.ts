export class UserInfo {
  id: number=0;
  username: string='';
  firstname: string='';
  lastname: string='';
  email: string='';
  roles!: [{
    id: string;
    name: string;
  }];
}
