import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { CreateItemDto, CreateItemValidation } from './dto/create-item.dto';
import { PatchItemDto, ItemPropertiesRequired } from './dto/patch-item.dto';
import { ItemsService } from './items.service';
import { Item } from './items.interface';

@Controller('items')
export class ItemsController {
  private readonly itemsService: ItemsService;

  constructor() {
    this.itemsService = new ItemsService();
  }

  private static comparison(obj1, obj2): boolean {
    const keys1 = Object.keys(obj1).sort();
    const keys2 = Object.keys(obj2).sort();

    if (keys1.length === keys2.length) {
      for (const key in obj2) {
        if (!obj1.hasOwnProperty(key)) return false;
      }
    } else {
      return false;
    }

    return true;
  }

  private static validatePatchBody(body): boolean {
    const required = ItemPropertiesRequired.required;
    const optional = ItemPropertiesRequired.optional;
    for (let i = 0; i < required.length; i++) {
      if (!body.hasOwnProperty(required[i])) return false;
    }

    const test1 = required.some((prop) => body.hasOwnProperty(prop));
    if (!test1) return false;

    if (
      Object.keys(body).filter(
        (prop) => !required.includes(prop) && !optional.includes(prop),
      ).length !== 0
    )
      return false;

    return true;
  }

  @Post()
  create(@Body() data: CreateItemDto) {
    if (!ItemsController.comparison(data, CreateItemValidation))
      return this.itemsService.error('structureError', 'Неверная структура');
    else return this.itemsService.create(data);
  }

  @Get()
  findAll(): Array<Item> {
    return this.itemsService.findAll();
  }

  @Delete('/:id')
  deleteById(@Param('id') id: any) {
    return this.itemsService.deleteById(Number(id));
  }

  @Patch()
  patchById(@Body() data: PatchItemDto) {
    if (!ItemsController.validatePatchBody(data))
      return this.itemsService.error('structureError', 'Неверная структура');
    return this.itemsService.patchItem(data);
  }
}
