import { Injectable } from '@nestjs/common';
import { Item, ItemProcessed, ItemPropertiesTypes } from './items.interface';
import { PatchItemDto } from './dto/patch-item.dto';
import { Error } from './errors.interface';

@Injectable()
export class ItemsService {
  private items: Array<ItemProcessed> = [];
  private requestNumber = 0;

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

  error(type: string, text: string): Error {
    return { type: type, message: text };
  }

  deleteById(id: number): Error | { id: number } {
    const itemIndex = this.items.findIndex(
      (obj: ItemProcessed) => obj.id === Number(id),
    );

    if (itemIndex === -1) {
      return {
        type: 'deleteError',
        message: `Элемент с id: ${id} не найден`,
      } as Error;
    } else {
      this.items.splice(itemIndex, 1);
      return { id: Number(id) };
    }
  }

  patchItem(item: PatchItemDto): Error | ItemProcessed {
    const itemRef = this.items.find((obj) => obj.id === Number(item.id));
    const excludedProperties = ['id'];

    if (itemRef) {
      Object.entries(item).forEach(([propertyName, value]: [string, any]) => {
        if (!(propertyName in excludedProperties))
          switch (ItemPropertiesTypes[propertyName]) {
            case 'number':
              {
                value = Number(value);
              }
              break;
            case 'string':
              {
                value = String(value);
              }
              break;
          }

        itemRef[propertyName] = value;
      });

      return itemRef;
    }

    return {
      type: 'patchError',
      message: `Элемент с id ${item.id} не найден`,
    };
  }
}
