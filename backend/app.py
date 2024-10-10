from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import re

now = datetime.now()

app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    due_date = db.Column(db.DateTime)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

app.app_context().push()
db.create_all()


@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'due_date': task.due_date,
        'completed': task.completed,
        'created_at': task.created_at,
        'updated_at': task.updated_at
    } for task in tasks])

@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    
    print("Incoming data:", data)

    if not data or 'title' not in data:
        return jsonify({'error': 'Title is required'}), 400
    

    due_date_str = data.get('due_date')
    if due_date_str:
        iso8601_regex = r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$'
        if not re.match(iso8601_regex, due_date_str):
            return jsonify({'error': 'Due date must be in ISO 8601 format (YYYY-MM-DDTHH:MM)'}), 400
        
        try:
            due_date = datetime.fromisoformat(due_date_str)
            print("Parsed due_date:", due_date)
        except ValueError:
            return jsonify({'error': 'Invalid due date format'}), 400
    else:
        due_date = None
    
    print("Creating task with:", {
        'title': data['title'],
        'description': data.get('description'),
        'due_date': due_date,
        'completed': False
    })

    new_task = Task(
        title=data['title'],
        description=data.get('description'),
        due_date=due_date,
        completed=False
    )
    try:
        db.session.add(new_task)
        db.session.commit()
        return jsonify({'id': new_task.id}), 201
    except Exception as e:
        print("Error while adding task:", e)
        print("Task details:", new_task.__dict__)
        return jsonify({'error': str(e)}), 500

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.get_json()
    task = Task.query.get_or_404(id)
    if 'title' in data:
        task.title = data['title']
    if 'description' in data:
        task.description = data.get('description')
    if 'due_date' in data:
        try:
            # Convert due_date string to datetime object
            task.due_date = datetime.fromisoformat(data['due_date'])
        except ValueError:
            return jsonify({'error': 'Invalid due date format'}), 400
    db.session.commit()
    return jsonify({'message': 'Task updated successfully'})

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted successfully'})

@app.route('/tasks/<int:id>', methods=['PATCH'])
def complete_task(id):
    task = Task.query.get_or_404(id)
    
    # Toggle the completed status
    task.completed = not task.completed
    
    db.session.commit()
    return jsonify({'message': f'Task marked as {"completed" if task.completed else "not completed"}'})

if __name__ == '__main__':
    app.run(debug=True)