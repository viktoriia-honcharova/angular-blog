import { Injectable } from '@angular/core';
import { IBlog } from '../../interfaces/blogs/blog.interface';
import { IUser } from '../../interfaces/users/user.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogs: Array<IBlog> = [
    {
      id: 1,
      postedBy: 'admin',
      topic: 'First post',
      date: '10:00, 22.05.2020',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde repellendus facilis accusantium ipsa laboriosam, fugit nostrum! A laudantium quis possimus illo expedita accusamus, vero libero excepturi accusantium ipsum deserunt temporibus.',
    },
  ];
  public users: Array<IUser> = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'admin123',
    },
  ];

  constructor() {}

  getBlogs(): Array<IBlog> {
    return this.blogs;
  }

  getUsers(): Array<IUser> {
    return this.users;
  }

  addBlog(post: IBlog): void {
    this.blogs.push(post);
  }

  addUser(user: IUser): void {
    this.users.push(user);
  }
}
