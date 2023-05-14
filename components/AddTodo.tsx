'use client';

import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { FormEvent, useState } from 'react';

export const AddTodo = () => {
  const [todoValue, setTodoValue] = useState('');
  return (
    <div>
      <Dialog>
        <DialogTrigger className="w-9 h-9 bg-blue-500 rounded-full text-4xl text-white flex items-center justify-center">
          <Plus width={24} height={24} />
        </DialogTrigger>
        <DialogContent className="p-4">
          <form
            onSubmit={(event: FormEvent) => {
              event.preventDefault();
              fetch('/api/todos', {
                method: 'POST',
                body: JSON.stringify(todoValue)
              })
              setTodoValue('');
            }}
          >
            <Label htmlFor="todo">Title</Label>
            <Input type="text" id="todo" placeholder="Input task to do" onChange={(event) => setTodoValue(event.target.value)}/>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
