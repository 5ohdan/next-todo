'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

export const Todo = ({ ...todo }: any) => {
  const [isChecked, setIsChecked] = useState();

  return (
    <li className="flex gap-2 items-center">
      <Checkbox />
      <p>{todo.title}</p>
    </li>
  );
};
