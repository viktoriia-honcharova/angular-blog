import { Component, OnInit } from '@angular/core';
import { IBlog } from '../shared/interfaces/blogs/blog.interface';
import { IUser } from '../shared/interfaces/users/user.interface';
import { BlogService } from '../shared/services/blog/blog.service';

@Component({
  selector: 'app-blog-component',
  templateUrl: './blog-component.component.html',
  styleUrls: ['./blog-component.component.css'],
})
export class BlogComponentComponent implements OnInit {
  public blogs: Array<IBlog> = [];
  public users: Array<IUser> = [];
  public adminStatus = false;
  public showSingInModal = false;
  public showAddPostModal = false;
  public showSignUpModal = false;

  public currentEmail!: string;
  public currentPassword!: string;
  public currentUserName!: string;
  public currentPostId!: number;

  public newEmail!: string;
  public newPassword!: string;
  public newUserName!: string;

  public title!: string;
  public text!: string;

  public error = false;
  public message!: string;
  public signInStatus = false;
  public userUnique = true;
  public editStatus = false;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.getBlogs();
    this.getUsers();
  }

  getBlogs(): void {
    this.blogs = this.blogService.getBlogs();
  }

  getUsers(): void {
    this.users = this.blogService.getUsers();
  }

  cleanData(): void {
    this.currentEmail = '';
    this.currentPassword = '';
    this.currentUserName = '';
    this.newEmail = '';
    this.newPassword = '';
    this.newUserName = '';
  }

  signIn(): void {
    for (let i = 0; i < this.users.length; i++) {
      if (
        this.currentEmail === this.users[i].email &&
        this.currentPassword === this.users[i].password
      ) {
        this.signInStatus = true;
        this.error = false;
        this.message = '';
        this.showSingInModal = false;
        this.currentUserName = this.users[i].username;
      } else {
        this.error = true;
        this.message = 'Incorrect password or email';
      }
    }

    if (this.currentUserName === 'admin') {
      this.adminStatus = true;
    }
  }

  signOut(): void {
    this.signInStatus = false;
    this.adminStatus = false;
    this.cleanData();
  }

  addPost(): void {
    let post: IBlog = {
      id: this.blogs.length + 1,
      postedBy: this.currentUserName,
      topic: this.title,
      date: '10:00, 22.05.2020',
      message: this.text,
    };

    this.blogService.addBlog(post);

    this.showAddPostModal = false;
    this.title = '';
    this.text = '';
  }

  signUp(): void {
    this.userUnique = true;
    let user: IUser = {
      id: this.users.length + 1,
      username: this.newUserName,
      email: this.newEmail,
      password: this.newPassword,
    };

    for (let i = 0; i < this.users.length; i++) {
      if (
        user.email === this.users[i].email ||
        user.username === this.users[i].username
      ) {
        this.error = true;
        this.message = 'Username and email must be unique';
        this.userUnique = false;
      }
    }

    if (this.userUnique) {
      this.blogService.addUser(user);
      this.showSignUpModal = false;
      this.error = false;
      this.message = '';
      this.cleanData();
      console.log(this.users);
    }
  }

  editPost(postId: number): void {
    this.title = this.blogs[postId - 1].topic;
    this.text = this.blogs[postId - 1].message;
    this.currentPostId = postId;
  }

  savePost(): void {
    this.editStatus = false;
    this.blogs[this.currentPostId - 1].topic = this.title;
    this.blogs[this.currentPostId - 1].message = this.text;
    this.showAddPostModal = false;
  }

  deletePost(postId: number): void {
    this.blogs.splice(postId - 1, 1);
  }
}
