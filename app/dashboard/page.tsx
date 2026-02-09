'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { Button, Modal, Toast } from '@/components/shared';
import { TaskList, TaskForm } from '@/components/tasks';
import type { Task, TaskCreate } from '@/types';

type FilterType = 'all' | 'pending' | 'completed';
type ToastType = { message: string; type: 'success' | 'error' | 'info' } | null;

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastType>(null);

  // ──────────────────────────────────────────────
  // logic remains 100% unchanged below this line
  // ──────────────────────────────────────────────

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const completed = filter === 'all' ? undefined : filter === 'completed';
      const data = await api.getTasks(completed);
      setTasks(data);
    } catch {
      setToast({ message: 'Failed to load tasks', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

  const handleCreateTask = async (data: TaskCreate) => {
    setIsSubmitting(true);
    try {
      await api.createTask(data);
      setIsModalOpen(false);
      setToast({ message: 'Task created successfully', type: 'success' });
      fetchTasks();
    } catch {
      setToast({ message: 'Failed to create task', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTask = async (data: TaskCreate) => {
    if (!editingTask) return;

    setIsSubmitting(true);
    try {
      await api.updateTask(editingTask.id, data);
      setEditingTask(null);
      setIsModalOpen(false);
      setToast({ message: 'Task updated successfully', type: 'success' });
      fetchTasks();
    } catch {
      setToast({ message: 'Failed to update task', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTask = async (id: number) => {
    try {
      await api.toggleTaskCompletion(id);
      fetchTasks();
    } catch {
      setToast({ message: 'Failed to update task', type: 'error' });
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await api.deleteTask(id);
      setToast({ message: 'Task deleted successfully', type: 'success' });
      fetchTasks();
    } catch {
      setToast({ message: 'Failed to delete task', type: 'error' });
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full" />
      </div>
    );
  }

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header + CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              My Tasks
            </h1>
            <p className="mt-2 text-muted-foreground/90 text-base">
              {pendingCount} pending • {completedCount} completed
            </p>
          </div>
          <Button
            onClick={openCreateModal}
            size="lg"
            className="gap-2 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Task
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10">
          <div className="bg-card/70 backdrop-blur-sm border border-border/60 rounded-2xl p-6 shadow-sm hover:shadow transition-shadow">
            <div className="text-3xl font-bold text-foreground tracking-tight">{tasks.length}</div>
            <div className="mt-1 text-sm text-muted-foreground font-medium">Total Tasks</div>
          </div>
          <div className="bg-card/70 backdrop-blur-sm border border-border/60 rounded-2xl p-6 shadow-sm hover:shadow transition-shadow">
            <div className="text-3xl font-bold text-orange-500 dark:text-orange-400 tracking-tight">{pendingCount}</div>
            <div className="mt-1 text-sm text-muted-foreground font-medium">Pending</div>
          </div>
          <div className="bg-card/70 backdrop-blur-sm border border-border/60 rounded-2xl p-6 shadow-sm hover:shadow transition-shadow">
            <div className="text-3xl font-bold text-emerald-500 dark:text-emerald-400 tracking-tight">{completedCount}</div>
            <div className="mt-1 text-sm text-muted-foreground font-medium">Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {(['all', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-medium tracking-tight transition-all duration-200
                ${
                  filter === f
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50'
                }
              `}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Task List */}
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onToggle={handleToggleTask}
          onEdit={openEditModal}
          onDelete={handleDeleteTask}
        />

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={editingTask ? 'Edit Task' : 'New Task'}
        >
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={closeModal}
            isLoading={isSubmitting}
          />
        </Modal>

        {/* Toast */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}