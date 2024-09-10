let users = [];

// تحميل البيانات من users.json
fetch('users.json')
    .then(response => response.json())
    .then(data => {
        users = data;
    });

// تسجيل الدخول
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        switch (user.role) {
            case 'admin':
                window.location.href = 'admin.html';
                break;
            case 'teacher':
                window.location.href = 'teachers.html';
                break;
            case 'student':
                window.location.href = 'attendance.html';
                break;
            default:
                alert('Role not defined!');
        }
    } else {
        document.getElementById('loginMessage').textContent = 'Invalid email or password.';
    }
});

// تسجيل مستخدم جديد
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('role').value;

    // تحقق مما إذا كان البريد الإلكتروني موجودًا بالفعل
    if (users.some(u => u.email === email)) {
        document.getElementById('registerMessage').textContent = 'Email already exists.';
        return;
    }

    // إضافة المستخدم الجديد
    users.push({ email, password, role });
    
    // حفظ البيانات في users.json (قد تحتاج إلى استخدام خادم لحفظ البيانات بشكل صحيح)
    fetch('users.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(users)
    }).then(() => {
        alert('Registration successful! You can now log in.');
        window.location.href = 'index.html';
    }).catch(err => {
        document.getElementById('registerMessage').textContent = 'Registration failed.';
        console.error(err);
    });
});