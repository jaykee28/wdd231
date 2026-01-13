
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];


const courseContainer = document.getElementById("courseCards");

const creditDisplay = document.createElement("p");
creditDisplay.id = "creditTotal";
courseContainer.before(creditDisplay);

function displayCourses(courseList) {
  courseContainer.innerHTML = "";

  courseList.forEach(course => {
    const card = document.createElement("article");
    card.classList.add("course-card");
    if(course.completed) card.classList.add("completed");
    card.setAttribute('aria-label', `${course.subject} ${course.number}: ${course.title}`);

    card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
      <p>Credits: ${course.credits}</p>
      <p>${course.description}</p>
      <p>Technology: ${course.technology.join(', ')}</p>
    `;

    courseContainer.appendChild(card);
  });

  const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
  creditDisplay.textContent = `Total Credits for courses listed: ${totalCredits}`;
}

const filterContainer = document.createElement("div");
filterContainer.classList.add("filters");
filterContainer.innerHTML = `
  <button id="all" class="active" aria-pressed="true">All</button>
  <button id="wdd" aria-pressed="false">WDD</button>
  <button id="cse" aria-pressed="false">CSE</button>
`;
courseContainer.before(filterContainer);

filterContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const subject = e.target.id;
    if(subject === "all") displayCourses(courses);
    else displayCourses(courses.filter(c => c.subject.toLowerCase() === subject));
    setActiveButton(subject);
  }
});

function setActiveButton(activeId){
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
  });
  const activeBtn = document.getElementById(activeId);
  activeBtn.classList.add('active');
  activeBtn.setAttribute('aria-pressed', 'true');
}

displayCourses(courses);
