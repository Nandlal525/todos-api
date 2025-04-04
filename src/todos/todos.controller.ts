import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PayLoad } from 'src/interfaces/payload';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() req: PayLoad) {
    createTodoDto.user_id=req.payload.id;
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll(@Req() req:PayLoad) {
    return this.todosService.findAll(req.payload.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req:PayLoad) {
    return this.todosService.findOne(+id,req.payload.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req:PayLoad,
    ) {
      updateTodoDto.user_id = req.payload.id;
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Req() req:PayLoad) {
    return this.todosService.remove(+id,req.payload.id);
  }
}
