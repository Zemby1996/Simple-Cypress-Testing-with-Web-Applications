const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addTask');
const list = document.getElementById('taskList');
const sortBtn = document.getElementById('sort');
let currentFilter = 'all';
let sortNewestFirst = true;

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

// Dodawanie zadania
addBtn.addEventListener('click', () => {
    if (!input.value.trim()) return;
    const task = {
        text: input.value,
        done: false,
        createdAt: Date.now()
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    input.value = '';
});

// Filtrowanie
document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// Sortowanie
sortBtn.addEventListener('click', () => {
    sortNewestFirst = !sortNewestFirst;
    renderTasks();
});

// Zapis
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Generowanie listy
function renderTasks() {
    list.innerHTML = '';

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.done;
        if (currentFilter === 'done') return task.done;
        return true;
    });

    filteredTasks.sort((a, b) =>
        sortNewestFirst ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
    );

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', () => {
            task.done = !task.done;
            saveTasks();
            renderTasks();
        });

        // Edytowalny tekst
        const text = document.createElement('span');
        text.textContent = task.text;
        if (task.done) text.classList.add('completed');
        text.addEventListener('click', () => {
            const edit = document.createElement('input');
            edit.type = 'text';
            edit.value = task.text;

            edit.addEventListener('keydown', e => {
                if (e.key === 'Enter') {
                    task.text = edit.value;
                    saveTasks();
                    renderTasks();
                }
            });

            li.replaceChild(edit, text);
            edit.focus();
        });

        // Usuwanie
        const remove = document.createElement('button');
        remove.textContent = "Usuń";
        remove.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.append(checkbox, text, remove);
        list.appendChild(li);
    });
}
