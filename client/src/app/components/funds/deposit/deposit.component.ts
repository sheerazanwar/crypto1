import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit
{
  address;

  constructor(private authService:AuthService) {}

  ngOnInit()
  {
    this.authService.getAddress().subscribe(data=>
    {
      this.address= data.PrivateKey;
      console.log(data);
    })
  }
}
