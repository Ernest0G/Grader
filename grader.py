from enum import unique
from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
import json

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///students.sqlite"
db = SQLAlchemy(app)


class students(db.Model):
    id = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String, unique=False, nullable=False)
    grade = db.Column(db.String, unique=False, nullable=True)


@app.route('/', endpoint='main')
def index():
    return render_template('grader.html')


@app.route('/grades', methods=['GET'], endpoint='students')
def getStudents():
    studentsAll = students.query.with_entities(
        students.name, students.grade).order_by(students.name)
    studentsList = {}
    for student in studentsAll:
        studentsList[student.name] = student.grade

    print(studentsList)
    return jsonify(studentsList)


@app.route('/grades/search/name/<nameSearch>', methods=['GET'], endpoint='studentFindWithName')
def getStudentByName(nameSearch):
    studentsAll = students.query.with_entities(
        students.name, students.grade).filter_by(name=nameSearch)
    studentFound = {}
    for student in studentsAll:
        studentFound[student.name] = student.grade
    return jsonify(studentFound)


@app.route('/grades/search/grade/<gradeSearch>', methods=['GET'], endpoint='studentFindWithGrade')
def getStudentByGrade(gradeSearch):
    studentsAll = students.query.with_entities(
        students.name, students.grade).filter_by(grade=gradeSearch)

    studentFound = {}
    for student in studentsAll:
        studentFound[student.name] = student.grade
    return jsonify(studentFound)


@app.route('/grades', methods=['POST'], endpoint='studentAdd')
def addStudent():
    NewStudent = {}
    NewStudent.update(request.get_json())

    for i in NewStudent:
        key = i
        value = NewStudent[i]

    studentAdd = students(name=key, grade=value)
    db.session.add(studentAdd)

    db.session.commit()
    return '', 204


@app.route('/grades', methods=['POST'], endpoint='studentEdit')
def editStudent():
    NewStudent = {}
    NewStudent.update(request.get_json())

    for i in NewStudent:
        key = i
        value = NewStudent[i]

    student = students.query.with_entities(
        students.name, students.grade).filter_by(name=key)

    student.grade = value
    db.session.commit()
    return '', 204


@app.route('/grades', methods=['POST'], endpoint='studentDeleteGrade')
def deleteStudentGrade():
    NewStudent = {}
    NewStudent.update(request.get_json())

    for i in NewStudent:
        key = i

    student = students.query.with_entities(
        students.name, students.grade).filter_by(name=key)

    student.grade = ' '

    db.session.commit()
    return '', 204

@app.route('/grades/delete', methods=['POST'], endpoint='studentDelete')
def deleteStudent():
    NewStudent = {}
    NewStudent.update(request.get_json())

    for i in NewStudent:
        key = i

    students.query.with_entities(
        students.name, students.grade).filter_by(name=key).delete()

    db.session.commit()
    return '', 204


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
