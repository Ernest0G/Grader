function displayAllStudents() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:5000/grades", true);
    xhttp.send();

    xhttp.onload = function() {
            let students = {};
            students = this.responseText;
            console.log(students);
            let studentsParsed = JSON.parse(students); 

            console.log(studentsParsed);

            let t = '<tbody>'
            t+= '<tr>';
            t+= '<th onclick="sortTable(0)">' + 'Name' + '</td>';
            t+= '<th onclick="sortTable(1)">' + 'Grade' + '</td>';
            t+= '</tr>';
            for(const [key, value] of Object.entries(studentsParsed)){
                t+= '<tr>';
                t+= '<td>' + key + '</td>';
                t+= '<td>' + value + '</td>';
                t+= '</tr>';
            }
            t+='</tbody>';
            document.getElementById('students-table').innerHTML = t;
            
    };
}



function displayHeader() {
    let t = '<tbody>'
    t+= '<tr>';
    t+= '<th onclick="sortTable(0)">' + 'Name' + '</td>';
    t+= '<th onclick="sortTable(1)">' + 'Grade' + '</td>';
    t+= '</tr>';
    document.getElementById('students-table').innerHTML = t;
}


function clearTable(){
    document.getElementById("students-table").innerHTML = '';
    displayHeader();
}


function addStudents() {

    let newName = document.getElementById("new-name").value;
    let newGrade = document.getElementById("new-grade").value;

    let student = {};
    student[newName] = newGrade;

    console.log(student);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:5000/grades", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(student));
    console.log(JSON.stringify(student))

    xhttp.onload = function() {

        displayAllStudents();
            
    };
}

function searchUsingName(){
    let nameSearched = document.getElementById("name-search").value;

    //const student={nameSearched:'' };
    student = nameSearched;

    var xhttp = new XMLHttpRequest();
    url = "http://localhost:5000/grades"+ "/" + nameSearched;
    xhttp.open("GET", url, true);
    xhttp.send(JSON.stringify(student));
    xhttp.onload = function() {

        clearTable();

        let student = {};
        student = this.responseText;

        let studentParsed = JSON.parse(student); 

        let t = '<tbody>'
        t+= '<tr>';
        t+= '<th onclick="sortTable(0)">' + 'Name' + '</td>';
        t+= '<th onclick="sortTable(1)">' + 'Grade' + '</td>';
        t+= '</tr>';
        for(const [key, value] of Object.entries(studentParsed)){
            t+= '<tr>';
            t+= '<td>' + key + '</td>';
            t+= '<td>' + value + '</td>';
            t+= '</tr>';
        }
        t+='</tbody>';
        document.getElementById('students-table').innerHTML = t;
       
            
    };


}

function searchUsingGrade(){
    let gradeSearched = document.getElementById("grade-search").value;

    student = gradeSearched;
    var xhttp = new XMLHttpRequest();
    url = "http://localhost:5000/grades"+ "/" + gradeSearched;
    xhttp.open("GET", url, true);
    xhttp.send(JSON.stringify(student));
    xhttp.onload = function() {

        clearTable();

        let student = {};
        student = this.responseText;

        let studentParsed = JSON.parse(student); 

        let t = '<tbody>'
        t+= '<tr>';
        t+= '<th onclick="sortTable(0)">' + 'Name' + '</td>';
        t+= '<th onclick="sortTable(1)">' + 'Grade' + '</td>';
        t+= '</tr>';
        for(const [key, value] of Object.entries(studentParsed)){
            t+= '<tr>';
            t+= '<td>' + key + '</td>';
            t+= '<td>' + value + '</td>';
            t+= '</tr>';
        }
        t+='</tbody>';
        document.getElementById('students-table').innerHTML = t;
       
            
    };
}

function deleteStudent(){
    let nameSearched = document.getElementById("name-search").value;

    console.log(nameSearched);

    const student={
        "name": nameSearched,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:5000", true);
    xhttp.send(JSON.stringify(nameSearched));
    xhttp.onload = function() {

        displayAllStudents();
       
            
    };
}

function deleteGrade(){
    let studentDeleteName = document.getElementById("grade-delete").value;

    let student = {};
    student[studentDeleteName] =  ' ';

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:5000/grades", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(student));
    xhttp.onload = function() {

        displayAllStudents();
       
            
    };
       
}

function editGrade(){
    let studentEditName = document.getElementById("edit-name").value;
    let studentEditGrade = document.getElementById("edit-grade").value;

    let student = {};
    student[studentEditName] = studentEditGrade;

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:5000/grades", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(student));
    xhttp.onload = function() {

        displayAllStudents();
       
            
    };


}

