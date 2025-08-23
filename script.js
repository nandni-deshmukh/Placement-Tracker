let students = JSON.parse(localStorage.getItem("students")) || [];
let companies = JSON.parse(localStorage.getItem("companies")) || [];

function addStudent() {
  let sname = document.getElementById("sname").value;
  let roll = document.getElementById("roll").value;
  let cgpa = parseFloat(document.getElementById("cgpa").value);
  let skills = document.getElementById("skills").value.split(",");

  let student = { sname, roll, cgpa, skills, status: "Applied" };
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
  alert("Student Added!");
}

function addCompany() {
  let cname = document.getElementById("cname").value;
  let ccgpa = parseFloat(document.getElementById("ccgpa").value);
  let cskills = document.getElementById("cskills").value.split(",");

  let company = { cname, ccgpa, cskills };
  companies.push(company);
  localStorage.setItem("companies", JSON.stringify(companies));
  shortlistStudents();
  alert("Company Added!");
}

function shortlistStudents() {
  students.forEach(student => {
    student.status = "Rejected"; 
    companies.forEach(company => {
      let skillMatch = company.cskills.some(skill => student.skills.includes(skill.trim()));
      if (student.cgpa >= company.ccgpa && skillMatch) {
        student.status = "Shortlisted for " + company.cname;
      }
    });
  });
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}

function displayStudents() {
  let table = document.getElementById("studentTable");
  table.innerHTML = "";
  students.forEach(s => {
    let row = `<tr>
      <td>${s.sname}</td>
      <td>${s.roll}</td>
      <td>${s.cgpa}</td>
      <td>${s.skills.join(", ")}</td>
      <td>${s.status}</td>
    </tr>`;
    table.innerHTML += row;
  });
}

// Initial Load
displayStudents();
