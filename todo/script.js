 let tasks = [];
        let currentFilter = 'all';

        const taskInput = document.getElementById('taskInput');
        const addBtn = document.getElementById('addBtn');
        const taskList = document.getElementById('taskList');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const clearAllBtn = document.getElementById('clearAllBtn');

        function addTask() {
            const taskText = taskInput.value.trim();
            
            if (taskText === '') {
                taskInput.style.borderColor = '#ef4444';
                setTimeout(() => {
                    taskInput.style.borderColor = '#e0e0e0';
                }, 500);
                return;
            }

            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };

            tasks.push(task);
            taskInput.value = '';
            taskInput.focus();
            
            renderTasks();
            updateStats();
        }

        function toggleTask(id) {
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                renderTasks();
                updateStats();
            }
        }

        function deleteTask(id) {
            tasks = tasks.filter(t => t.id !== id);
            renderTasks();
            updateStats();
        }

        function renderTasks() {
            taskList.innerHTML = '';
            
            let filteredTasks = tasks;
            if (currentFilter === 'active') {
                filteredTasks = tasks.filter(t => !t.completed);
            } else if (currentFilter === 'completed') {
                filteredTasks = tasks.filter(t => t.completed);
            }

            if (filteredTasks.length === 0) {
                const emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                emptyState.innerHTML = `
                    <div class="empty-state-icon">📭</div>
                    <div class="empty-state-text">
                        ${currentFilter === 'all' ? 'No tasks yet. Add one above!' : 
                          currentFilter === 'active' ? 'No active tasks!' : 
                          'No completed tasks yet!'}
                    </div>
                `;
                taskList.appendChild(emptyState);
                return;
            }

            filteredTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                
                li.innerHTML = `
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})"></div>
                    <span class="task-text ${task.completed ? 'completed' : ''}" onclick="toggleTask(${task.id})">${task.text}</span>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                `;
                
                taskList.appendChild(li);
            });
        }

        function updateStats() {
            const total = tasks.length;
            const completed = tasks.filter(t => t.completed).length;
            const active = total - completed;

            document.getElementById('totalTasks').textContent = total;
            document.getElementById('activeTasks').textContent = active;
            document.getElementById('completedTasks').textContent = completed;

            clearAllBtn.disabled = completed === 0;
        }

        function clearCompleted() {
            tasks = tasks.filter(t => !t.completed);
            renderTasks();
            updateStats();
        }

        addBtn.addEventListener('click', addTask);

        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTask();
            }
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderTasks();
            });
        });

        clearAllBtn.addEventListener('click', clearCompleted);

        renderTasks();
        updateStats();

        