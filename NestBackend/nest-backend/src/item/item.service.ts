import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  findLowStock(): Promise<Item[]> {
    return this.itemRepository.find({ where: { stock: 20 } });
  }

  createItem(item: Item): Promise<Item> {
    return this.itemRepository.save(item);
  }

  updateItem(id: number, data: Partial<Item>): Promise<any> {
    return this.itemRepository.update(id, data);
  }

  deleteItem(id: number): Promise<any> {
    return this.itemRepository.delete(id);
  }
}
