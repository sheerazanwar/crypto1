import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService
{
  private socket;
  options;
  domain = 'https://streamer.cryptocompare.com/';
  currentPrice = {};


  constructor(private authService: AuthService,private http: Http) { }

  createAuthenticationHeaders()
  {
    this.authService.loadToken();
    this.options = new RequestOptions(
    {
      headers: new Headers(
      {
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    });
  }

  sendMessage(message)
  {
    this.createAuthenticationHeaders();
    console.log(this.socket);
    this.socket.emit('add-message', message, this.options);
    this.socket.emit('users');
  }

  saveUsername(username)
  {
    this.createAuthenticationHeaders();
    this.socket.emit('saveUser', username, this.options);
  }

  getMessages()
  {
    let observable = new Observable(observer => {
      this.socket = io(this.domain);
      this.socket.on('message', (data) => {
        console.log("alo re alo");
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
