/*
Assignment 7 - To-Do List Application JavaScript
Name: Pratham Handa
Roll No: 102317106
*/

// Global variables and state management
let tasks = [];
let nextTaskId = 1;
let taskToDelete = null;

// DOM elements
const taskForm = document.getElementById('taskForm');
const taskTitleInput = document.getElementById('taskTitle');
const taskDescriptionInput = document.getElementById('taskDescription');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const totalTasksElement = document.getElementById('totalTasks');
const completedTasksElement = document.getElementById('completedTasks');
const pendingTasksElement = document.getElementById('pendingTasks');
const clearCompletedBtn = document.getElementById('clearCompleted');
const deleteModal = document.getElementById('deleteModal');
const confirmDeleteBtn = document.getElementById('confirmDelete');
const cancelDeleteBtn = document.getElementById('cancelDelete');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromStorage();
    updateTaskStats();
    updateUI();
    setupEventListeners();
});

// Event listeners setup
function setupEventListeners() {
    // Form submission
    taskForm.addEventListener('submit', handleAddTask);
    
    // Clear completed tasks
    clearCompletedBtn.addEventListener('click', clearCompletedTasks);
    
    // Delete modal events
    confirmDeleteBtn.addEventListener('click', confirmDeleteTask);
    cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    deleteModal.addEventListener('click', function(e) {
        if (e.target === deleteModal) {
            closeDeleteModal();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDeleteModal();
            cancelAllEdits();
        }
    });
}

// Task management functions
function handleAddTask(e) {
    e.preventDefault();
    
    const title = taskTitleInput.value.trim();
    const description = taskDescriptionInput.value.trim();
    
    // Validation
    if (!title) {
        showNotification('Please enter a task title', 'error');
        taskTitleInput.focus();
        return;
    }
    
    // Create new task object
    const newTask = {
        id: nextTaskId++,
        title: title,
        description: description,
        completed: false,
        createdAt: new Date().toISOString(),
        editing: false
    };
    
    // Add task to array
    tasks.unshift(newTask); // Add to beginning for better UX
    
    // Clear form
    taskForm.reset();
    
    // Update UI and save
    updateUI();
    updateTaskStats();
    saveTasksToStorage();
    
    showNotification('Task added successfully!', 'success');
}

function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        updateUI();
        updateTaskStats();
        saveTasksToStorage();
        
        const status = task.completed ? 'completed' : 'pending';
        showNotification(`Task marked as ${status}`, 'info');
    }
}

function startEditTask(taskId) {
    // Cancel any other edits first
    cancelAllEdits();
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.editing = true;
        updateUI();
    }
}

function saveTaskEdit(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        const titleInput = taskElement.querySelector('.edit-input');
        const descriptionInput = taskElement.querySelector('.edit-textarea');
        
        const newTitle = titleInput.value.trim();
        const newDescription = descriptionInput.value.trim();
        
        // Validation
        if (!newTitle) {
            showNotification('Task title cannot be empty', 'error');
            titleInput.focus();
            return;
        }
        
        // Update task
        task.title = newTitle;
        task.description = newDescription;
        task.editing = false;
        
        updateUI();
        saveTasksToStorage();
        showNotification('Task updated successfully!', 'success');
    }
}

function cancelTaskEdit(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.editing = false;
        updateUI();
    }
}

function cancelAllEdits() {
    tasks.forEach(task => task.editing = false);
    updateUI();
}

function deleteTask(taskId) {
    taskToDelete = taskId;
    deleteModal.classList.add('show');
}

function confirmDeleteTask() {
    if (taskToDelete) {
        tasks = tasks.filter(task => task.id !== taskToDelete);
        updateUI();
        updateTaskStats();
        saveTasksToStorage();
        showNotification('Task deleted successfully!', 'success');
    }
    closeDeleteModal();
}

function closeDeleteModal() {
    deleteModal.classList.remove('show');
    taskToDelete = null;
}

function clearCompletedTasks() {
    const completedCount = tasks.filter(task => task.completed).length;
    if (completedCount === 0) return;
    
    if (confirm(`Are you sure you want to delete ${completedCount} completed task(s)?`)) {
        tasks = tasks.filter(task => !task.completed);
        updateUI();
        updateTaskStats();
        saveTasksToStorage();
        showNotification(`${completedCount} completed task(s) deleted!`, 'success');
    }
}

// UI update functions
function updateUI() {
    // Clear current task list
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        taskList.appendChild(emptyState);
        return;
    }
    
    // Create task elements
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
}

function createTaskElement(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task-item ${task.completed ? 'completed' : ''} ${task.editing ? 'editing' : ''}`;
    taskDiv.setAttribute('data-task-id', task.id);
    
    if (task.editing) {
        taskDiv.innerHTML = `
            <div class="task-content">
                <input type="text" class="edit-input" value="${escapeHtml(task.title)}" maxlength="100">
                <textarea class="edit-textarea" maxlength="500">${escapeHtml(task.description)}</textarea>
            </div>
            <div class="task-actions">
                <button class="btn btn-success btn-small" onclick="saveTaskEdit(${task.id})">
                    ✓ Save
                </button>
                <button class="btn btn-secondary btn-small" onclick="cancelTaskEdit(${task.id})">
                    ✕ Cancel
                </button>
            </div>
        `;
        
        // Focus on title input
        setTimeout(() => {
            const titleInput = taskDiv.querySelector('.edit-input');
            titleInput.focus();
            titleInput.select();
        }, 0);
    } else {
        taskDiv.innerHTML = `
            <div class="task-content">
                <div class="task-title">${escapeHtml(task.title)}</div>
                ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
            </div>
            <div class="task-actions">
                <button class="btn ${task.completed ? 'btn-warning' : 'btn-success'} btn-small" 
                        onclick="toggleTaskCompletion(${task.id})">
                    ${task.completed ? '↶ Mark as Incomplete' : '✓ Mark as Completed'}
                </button>
                <button class="btn btn-secondary btn-small" onclick="startEditTask(${task.id})">
                    ✏️ Edit
                </button>
                <button class="btn btn-danger btn-small" onclick="deleteTask(${task.id})">
                    🗑️ Delete
                </button>
            </div>
        `;
    }
    
    return taskDiv;
}

function updateTaskStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    
    totalTasksElement.textContent = total;
    completedTasksElement.textContent = completed;
    pendingTasksElement.textContent = pending;
    
    // Show/hide clear completed button
    clearCompletedBtn.style.display = completed > 0 ? 'block' : 'none';
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Local storage functions
function saveTasksToStorage() {
    try {
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
        localStorage.setItem('nextTaskId', nextTaskId.toString());
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
        showNotification('Failed to save tasks', 'error');
    }
}

function loadTasksFromStorage() {
    try {
        const savedTasks = localStorage.getItem('todoTasks');
        const savedNextId = localStorage.getItem('nextTaskId');
        
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
            // Ensure all tasks have required properties
            tasks = tasks.map(task => ({
                ...task,
                editing: false // Reset editing state on load
            }));
        }
        
        if (savedNextId) {
            nextTaskId = parseInt(savedNextId, 10);
        }
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        showNotification('Failed to load saved tasks', 'error');
        tasks = [];
        nextTaskId = 1;
    }
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(notificationStyles);

// Export functions for global access (needed for inline event handlers)
window.toggleTaskCompletion = toggleTaskCompletion;
window.startEditTask = startEditTask;
window.saveTaskEdit = saveTaskEdit;
window.cancelTaskEdit = cancelTaskEdit;
window.deleteTask = deleteTask;
