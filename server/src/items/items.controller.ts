import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  Logger,
} from '@nestjs/common';
import { CreateItemDto, CreateItemValidation } from './dto/create-item.dto';
import { DeleteItemDto } from './dto/delete-item.dto';
import { PatchItemDto } from './dto/patch-item.dto';
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
      return this.itemsService.error('structureError', 'Неверная структура');
    else return this.itemsService.create(data);
  }

  @Get()
  findAll(): Array<Item> {
    return this.itemsService.findAll();
  }

  @Delete('/:id')
  deleteById(@Param('id') id: any) {
    return this.itemsService.deleteById(id);
  }

  @Patch()
  patchById(@Body() data: PatchItemDto) {
    return this.itemsService.patchItem(data);
  }
}
