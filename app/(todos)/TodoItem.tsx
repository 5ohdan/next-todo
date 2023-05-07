'use client';

import { Checkbox } from '@/components/ui/checkbox';
import type { Todo } from '@prisma/client';
import { useState } from 'react';

export const TodoItem = ({ ...todo }: Todo) => {
  const [isChecked, setIsChecked] = useState();

  return (
    <li className="flex gap-2 items-center">
      <Checkbox />
      <p>{todo.title}</p>
    </li>
  );
};
