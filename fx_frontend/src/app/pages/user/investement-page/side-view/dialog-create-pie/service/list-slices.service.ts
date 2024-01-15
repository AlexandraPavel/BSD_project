// list.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProcentItem } from '../model/procent-item';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private listSubject = new BehaviorSubject<ProcentItem[]>([]);
  public list$ = this.listSubject.asObservable();

  constructor() {
    // Initialize the list when the service is created
    this.setList([
      // {
      //   name: 'Adobe',
      //   price: '10',
      //   return: 0,
      // },
      // {
      //   name: 'Google',
      //   price: '10',
      //   return: 0,
      // },
      // Add more items if needed
    ]);
  }

  setList(newList: ProcentItem[]): void {
    // Set the new list and notify subscribers
    this.listSubject.next(newList);
  }

  addSlice(newSlice: ProcentItem): void {
    // Get the current list
    const currentList = this.listSubject.getValue();

    // Add the new slice to the list
    const updatedList = [...currentList, newSlice];

    // Update the BehaviorSubject with the new list
    this.listSubject.next(updatedList);

    console.log("list", this.listSubject)
  }

  updateList(newItem: ProcentItem): void {
    // Get the current list
    // console.log("Update from ListService for item")
    const currentList = this.listSubject.getValue();

    // Check if the item already exists in the list
    const existingItemIndex = currentList.findIndex(item => item.name === newItem.name);

    if (existingItemIndex !== -1) {
      // If the item exists, update its properties
      currentList[existingItemIndex] = newItem;
      this.listSubject.next(currentList);
    } else {
      // If the item doesn't exist, add it to the list
      const updatedList = [...currentList, newItem];
      this.listSubject.next(updatedList);
    }
  }

  deleteData(itemToDelete: ProcentItem): void {
    // Get the current list
    const currentList = this.listSubject.getValue();

    // Find the index of the item to delete
    const indexToDelete = currentList.findIndex(item => item === itemToDelete);

    if (indexToDelete !== -1) {
      // If the item exists in the list, remove it
      const updatedList = currentList.filter((_, index) => index !== indexToDelete);
      this.listSubject.next(updatedList);
    }
  }
}
