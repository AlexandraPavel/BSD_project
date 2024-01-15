import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  id = -1;

  constructor(private modalService: ModalService,
    private userService: UserService) { }

  ngOnInit(): void {
    const username: string = JSON.parse(localStorage.getItem('currentUser') || '').username || '';
    this.userService.getUserId(username).subscribe((response) => {
      this.id = response.id;
    })
  }

  openModal() {
    this.modalService.showModal();
  }

}
