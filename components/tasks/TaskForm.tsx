'use client';

import { useState, FormEvent } from 'react';
import { Button, Input } from '@/components/shared';
import type { Task, TaskCreate } from '@/types';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (data: TaskCreate) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function TaskForm({ task, onSubmit, onCancel, isLoading }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [errors, setErrors] = useState<{ title?: string }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!title.trim()) {
      setErrors({ title: 'Title is required' });
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        error={errors.title}
        autoFocus
        className="transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
      />

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Description (optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description..."
          rows={3}
          className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-lg text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 transition-all duration-200 hover:shadow-sm">
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading} className="flex-1 transition-all duration-200 hover:shadow-md">
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
}
