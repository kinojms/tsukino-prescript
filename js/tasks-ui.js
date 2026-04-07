/* ============================================================
   TASKS UI MODULE
   Handles task display and interaction
   ============================================================ */

import {
  getDailyTasks,
  addTask,
  toggleTask,
  deleteTask,
  getTaskStats,
  generateSuggestedTasks,
} from './tasks.js';

/**
 * Render all tasks in the UI
 */
export function renderTasks(dom) {
  const dailyTasks = getDailyTasks();
  const tasksHtml = dailyTasks.tasks.map(task => `
    <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} />
      <span class="task-text">${task.text}</span>
      <button class="task-delete" title="Delete task">×</button>
    </div>
  `).join('');

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
 * Handle adding a new task
 */
export function handleAddTask(dom) {
  const text = dom.taskInput.value.trim();
  if (!text) return;

  addTask(text);
  dom.taskInput.value = '';
  renderTasks(dom);
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
 * Handle task suggestions
 */
export function handleTaskSuggestions(dom) {
  const suggestions = generateSuggestedTasks();

  suggestions.forEach(suggestion => {
    addTask(suggestion);
  });

  renderTasks(dom);
}

/**
 * Initialize tasks functionality
 */
export function initTasks(dom) {
  // Render existing tasks
  renderTasks(dom);

  // Add task button
  dom.addTaskBtn.addEventListener('click', () => handleAddTask(dom));

  // Task input enter key
  dom.taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleAddTask(dom);
    }
  });

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

  // Suggestions button
  dom.suggestTasksBtn.addEventListener('click', () => handleTaskSuggestions(dom));
}