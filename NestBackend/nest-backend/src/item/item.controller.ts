import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.entity';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get('/low-stock')
  findLowStock() {
    return this.itemService.findLowStock();
  }

  @Post()
  create(@Body() item: Item) {
    return this.itemService.createItem(item);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: Partial<Item>) {
    return this.itemService.updateItem(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itemService.deleteItem(id);
  }
}
