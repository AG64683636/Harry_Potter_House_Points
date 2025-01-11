/**
 * Updates the house points by sending a POST request to the server.
 * @param {string} house - The name of the house (e.g., "Gryffindor").
 * @param {number} change - The number of points to add or subtract.
 */
async function updatePoints(house, change) {
    try {
        const response = await fetch('/points', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ house, points: change }),
        });

        if (response.ok) {
            const updatedData = await response.json();
            document.getElementById(`${house}-points`).textContent = `${updatedData[house].points} Points`;
        } else {
            alert('Failed to update points. Please try again.');
        }
    } catch (error) {
        console.error('Error updating points:', error);
        alert('An error occurred. Please check your connection and try again.');
    }
}

/**
 * Updates the students of a house by sending a POST request to the server.
 * Handles both adding and removing students.
 * @param {string} house - The name of the house (e.g., "Gryffindor").
 * @param {string} action - The action to perform ("add" or "remove").
 * @param {string|null} [student=null] - The name of the student (required for "remove").
 */
async function updateStudents(house, action, student = null) {
    const studentName = action === 'add' ? document.getElementById(`${house}-student-name`).value.trim() : student;

    if (action === 'add' && !studentName) {
        alert('Please enter a student name.');
        return;
    }

    try {
        const response = await fetch('/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                house,
                action,
                student: studentName,
            }),
        });

        if (response.ok) {
            const updatedData = await response.json();
            updateStudentList(house, updatedData[house].students);

            // Clear input field for 'add' action
            if (action === 'add') {
                document.getElementById(`${house}-student-name`).value = '';
            }
        } else {
            alert('Failed to update students. Please try again.');
        }
    } catch (error) {
        console.error('Error updating students:', error);
        alert('An error occurred. Please check your connection and try again.');
    }
}

/**
 * Adds a student to a house by invoking the updateStudents function with the "add" action.
 * @param {string} house - The name of the house (e.g., "Gryffindor").
 */
function addStudent(house) {
    updateStudents(house, 'add');
}

/**
 * Loads the initial data for house points and students from the server.
 * Populates the UI with the fetched data.
 */
async function loadInitialData() {
    try {
        const response = await fetch('/points'); // Fetch data from backend
        if (response.ok) {
            const data = await response.json();
            for (const house in data) {
                // Update house points
                document.getElementById(`${house}-points`).textContent = `${data[house].points} Points`;
                // Update student list
                updateStudentList(house, data[house].students);
            }
        } else {
            console.error('Failed to fetch initial data:', response.statusText);
        }
    } catch (error) {
        console.error('Error loading initial data:', error);
    }
}

/**
 * Updates the student list for a house in the UI.
 * Dynamically creates list items with a remove button for each student.
 * Stores the students as JSON in a data attribute for filtering purposes.
 * @param {string} house - The name of the house (e.g., "Gryffindor").
 * @param {Array<string>} students - The list of students in the house.
 */
function updateStudentList(house, students) {
    const studentList = document.getElementById(`${house}-students`);
    studentList.dataset.students = JSON.stringify(students); // Store students as JSON
    studentList.innerHTML = ""; // Clear existing students

    // Sort students alphabetically
    students.sort();

    students.forEach(student => {
        const listItem = document.createElement("li");
        listItem.className =
            "list-group-item bg-dark text-light d-flex justify-content-between align-items-center";

        const studentName = document.createTextNode(student);

        const removeButton = document.createElement("button");
        removeButton.className = "btn btn-sm btn-danger";
        removeButton.innerHTML = "×";
        removeButton.onclick = () => updateStudents(house, "remove", student);

        listItem.appendChild(studentName);
        listItem.appendChild(removeButton);

        studentList.appendChild(listItem);
    });
}

/**
 * Filters the student lists across all houses based on the search query.
 * Dynamically updates the UI to display only the matching students.
 * @param {string} query - The search query entered by the user.
 */
function filterStudents(query) {
    const lists = document.querySelectorAll(".list-group"); // All house student lists
    const noResults = document.getElementById("no-results"); // No results message
    query = query.toLowerCase();
    let overallMatch = false; 

    lists.forEach(list => {
        const house = list.id.split("-")[0]; // Extract house name from ID
        const students = list.dataset.students ? JSON.parse(list.dataset.students) : []; // Get all students
        const filteredStudents = students.filter(student =>
            student.toLowerCase().includes(query)
        ); // Find matching students

        list.innerHTML = ""; // Clear the current list

        if (filteredStudents.length > 0) {
            overallMatch = true;
            filteredStudents.forEach(student => {
                const listItem = document.createElement("li");
                listItem.className =
                    "list-group-item bg-dark text-light d-flex justify-content-between align-items-center";
                listItem.textContent = student;

                const removeButton = document.createElement("button");
                removeButton.className = "btn btn-sm btn-danger";
                removeButton.innerHTML = "×"; // Remove button
                removeButton.onclick = () => updateStudents(house, "remove", student);

                listItem.appendChild(removeButton);
                list.appendChild(listItem);
            });
        }
    });

    noResults.style.display = overallMatch ? "none" : "block";
}

document.addEventListener('DOMContentLoaded', loadInitialData);
