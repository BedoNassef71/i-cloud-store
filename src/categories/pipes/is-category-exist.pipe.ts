import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { CategoriesService } from '../categories.service';

@Injectable()
export class IsCategoryExistPipe implements PipeTransform {
  constructor(private readonly categoriesService: CategoriesService) {}

  async transform(id: string): Promise<string> {
    const isCategoryExist = await this.categoriesService.findOne(id);

    if (!isCategoryExist) {
      throw new NotFoundException(`Category with ID '${id}' not found`);
    }

    return id;
  }
}
