from flask import Flask, render_template, request, redirect, url_for, flash, session

app = Flask(__name__)

app.secret_key = 'i_am_a_secret'

users = {'user@gmail.com':'12345678'}

@app.route('/')
def home():
    if 'email' in session:
        return render_template('home.html', email=session['email'])
    return render_template('home.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if email in users:
            flash('Email already registered. Please login or use a different email.', 'danger')
        else:
            users[email] = password
            flash('Account created successfully! Please log in.', 'success')
            return redirect(url_for('login'))
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'email' in session:
        flash('You are already logged in!', 'success')
        return render_template('home.html', email=session['email'])
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if email in users and users[email] == password:
            session['email'] = email
            flash('Login Successful!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Invalid Email or Password.', 'danger')
    return render_template('login.html')

@app.route('/logout')
def logout():
    if 'email' not in session:
        flash('You are not logged in!', 'danger')
        return redirect(url_for('home'))
    session.pop('email', None)
    flash('You have been logged out.', 'info')
    return redirect(url_for('login'))

@app.route('/settings')
def settings():
    return render_template('settings.html')

@app.route('/privacy')
def privacy():
    return render_template('privacy.html')

@app.route('/terms')
def terms():
    return render_template('terms.html')

@app.route('/commerce')
def commerce():
    return render_template('commerce.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/simple')
def simple():
    return render_template('simple.html')

@app.route('/summary')
def summary():
    return render_template('summary.html')

@app.route('/details')
def details():
    return render_template('details.html')

@app.route('/ranking')
def ranking():
    return render_template('ranking.html')

if __name__ == '__main__':
    app.run(debug=True)
