/* ============================================================
   TASKS UI MODULE
   Handles task display and interaction
   ============================================================ */

import {
  getDailyTasks,
  toggleTask,
  deleteTask,
  getTaskStats,
} from './tasks.js';

/**
 * Render all tasks in the UI
 */
export function renderTasks(dom) {
  const dailyTasks = getDailyTasks();
  const tasksHtml = dailyTasks.tasks.map(task => {
    // Check if this is a prescript task (starts with ✓ or ✗)
    const isPrescript = task.text.startsWith('✓ ') || task.text.startsWith('✗ ');

    return `
    <div class="task-item ${task.completed ? 'completed' : ''} ${isPrescript ? 'task-prescript' : ''}" data-task-id="${task.id}">
      ${!isPrescript ? `<input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} />` : ''}
      <span class="task-text">${task.text}</span>
      ${!isPrescript ? `<button class="task-delete" title="Delete task">×</button>` : ''}
    </div>
  `}).join('');

  dom.tasksList.innerHTML = tasksHtml;
  updateTaskStats(dom);
}

/**
 * Update task completion statistics
 */
export function updateTaskStats(dom) {
  const stats = getTaskStats();
  dom.tasksStats.textContent = `${stats.completed}/${stats.total} COMPLETED`;
}

/**
 * Handle task checkbox toggle
 */
export function handleTaskToggle(taskId, dom) {
  toggleTask(taskId);
  renderTasks(dom);
}

/**
 * Handle task deletion
 */
export function handleTaskDelete(taskId, dom) {
  deleteTask(taskId);
  renderTasks(dom);
}

/**
 * Initialize tasks functionality
 */
export function initTasks(dom) {
  // Render existing tasks
  renderTasks(dom);

  // Task list event delegation
  dom.tasksList.addEventListener('change', (e) => {
    if (e.target.classList.contains('task-checkbox')) {
      const taskItem = e.target.closest('.task-item');
      const taskId = parseInt(taskItem.dataset.taskId);
      handleTaskToggle(taskId, dom);
    }
  });

  dom.tasksList.addEventListener('click', (e) => {
    if (e.target.classList.contains('task-delete')) {
      const taskItem = e.target.closest('.task-item');
      const taskId = parseInt(taskItem.dataset.taskId);
      handleTaskDelete(taskId, dom);
    }
  });
}