import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { CreateItemDto, CreateItemValidation } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './items.interface';

@Controller('items')
export class ItemsController {
  private readonly itemsService: ItemsService;

  constructor() {
    this.itemsService = new ItemsService();
  }

  private validation(obj1, obj2): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length === keys2.length) {
      return keys1.every((key) => obj2.hasOwnProperty(key));
    }

    return false;
  }

  @Post()
  create(@Body() data: CreateItemDto) {
    if (!this.validation(data, CreateItemValidation))
      return this.itemsService.error('Неверная структура');
    else return this.itemsService.create(data);
  }

  @Get()
  findAll(): Array<Item> {
    return this.itemsService.findAll();
  }
}
