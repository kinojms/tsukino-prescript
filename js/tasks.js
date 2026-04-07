/* ============================================================
   TASKS MODULE
   Basic daily task management functionality
   ============================================================ */

const TASKS_STORAGE_KEY = 'index-daily-tasks';

/**
 * Get today's tasks from localStorage
 */
export function getDailyTasks() {
  const today = new Date().toISOString().slice(0, 10);
  const raw = localStorage.getItem(TASKS_STORAGE_KEY);

  if (!raw) return { date: today, tasks: [] };

  try {
    const parsed = JSON.parse(raw);
    if (parsed?.date === today && Array.isArray(parsed.tasks)) {
      return parsed;
    }
  } catch (err) {
    console.warn('[INDEX TERMINAL] Failed to parse daily tasks', err);
  }

  return { date: today, tasks: [] };
}

/**
 * Save today's tasks to localStorage
 */
export function saveDailyTasks(tasks) {
  const today = new Date().toISOString().slice(0, 10);
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify({
    date: today,
    tasks,
  }));
}

/**
 * Add a new task (limited to 10 per day)
 */
export function addTask(text) {
  const dailyTasks = getDailyTasks();

  // Check daily limit
  if (dailyTasks.tasks.length >= 10) {
    throw new Error('DAILY TASK LIMIT REACHED (10 MAX)');
  }

  const newTask = {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    created: new Date().toISOString(),
  };

  dailyTasks.tasks.push(newTask);
  saveDailyTasks(dailyTasks.tasks);
  return newTask;
}

/**
 * Toggle task completion
 */
export function toggleTask(taskId) {
  const dailyTasks = getDailyTasks();
  const task = dailyTasks.tasks.find(t => t.id === taskId);

  if (task) {
    task.completed = !task.completed;
    saveDailyTasks(dailyTasks.tasks);
  }

  return task;
}

/**
 * Delete a task
 */
export function deleteTask(taskId) {
  const dailyTasks = getDailyTasks();
  dailyTasks.tasks = dailyTasks.tasks.filter(t => t.id !== taskId);
  saveDailyTasks(dailyTasks.tasks);
}

/**
 * Get task completion stats
 */
export function getTaskStats() {
  const dailyTasks = getDailyTasks();
  const total = dailyTasks.tasks.length;
  const completed = dailyTasks.tasks.filter(t => t.completed).length;

  return {
    total,
    completed,
    remaining: total - completed,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

/**
 * Generate suggested tasks based on prescripts
 */
export function generateSuggestedTasks() {
  const suggestions = [
    "Complete one unfinished project",
    "Organize your workspace",
    "Review and update your goals",
    "Connect with someone meaningful",
    "Learn something new today",
    "Practice mindfulness for 10 minutes",
    "Clean up digital clutter",
    "Plan tomorrow's priorities",
  ];

  // Return 3 random suggestions
  const shuffled = suggestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}