import { Injectable } from '@nestjs/common';
import { Item, ItemProcessed } from './items.interface';
import { Error } from './errors.interface';

@Injectable()
export class ItemsService {
  private items: Array<ItemProcessed> = [];
  private requestNumber = 1;

  create(item: Item) {
    const date = new Date();
    const id = date.getTime();
    const newItem = {
      ...item,
      id: id,
      requestNumber: ++this.requestNumber,
      receiveTime: date.toJSON().split('.')[0], // split чтобы убрать миллисекунды
    };

    this.items.push(newItem);

    return newItem;
  }

  findAll(): Array<ItemProcessed> {
    return this.items;
  }

  error(text: string): Error {
    return { message: text };
  }
}
