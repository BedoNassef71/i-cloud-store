import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes} from '@nestjs/common';
import {CategoriesService} from './categories.service';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {Category} from "./entities/category.entity";
import {ParseMongoIdPipe} from "../common/pipes/parse-mongo-id.pipe";
import {IsCategoryExistPipe} from "./pipes/is-category-exist.pipe";

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {
    }

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    @UsePipes(ParseMongoIdPipe, IsCategoryExistPipe)
    async findAllSubCategories(@Param('id') id: string) {
        return this.categoriesService.findAllSubCategories();
    }

    @Get(':id')
    @UsePipes(ParseMongoIdPipe, IsCategoryExistPipe)
    async findOne(@Param('id') id: string): Promise<Category> {
        return this.categoriesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseMongoIdPipe, IsCategoryExistPipe) id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        return this.categoriesService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    @UsePipes(ParseMongoIdPipe, IsCategoryExistPipe)
    remove(@Param('id') id: string): Promise<Category> {
        return this.categoriesService.remove(id);
    }
}