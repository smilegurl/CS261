document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // หยุดการส่งฟอร์ม

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    // ตรวจสอบข้อมูล
    if (username === '' || password === '') {
        messageDiv.innerHTML = '<div class="alert alert-danger">กรุณากรอกข้อมูลให้ครบถ้วน</div>';
        return;
    }

    // ส่งข้อมูลไปยัง API (กรณีตัวอย่าง)
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TU9b67283c8256e557176b8d22a6c78aad94657a874f06e5353f152d946163d7b1ef51cb0811a249138d5cfe0186923414'
        },
        body: JSON.stringify({ "UserName": username, "PassWord": password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            messageDiv.innerHTML = '<div class="alert alert-success">เข้าสู่ระบบสำเร็จ!</div>';
            // ทำการเปลี่ยนหน้าไปยังหน้าหลักหรือต่อไป (กรณีต้องการ)
        } else {
            messageDiv.innerHTML = '<div class="alert alert-danger">' + data.message + '</div>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        messageDiv.innerHTML = '<div class="alert alert-danger">เกิดข้อผิดพลาดในการเชื่อมต่อ</div>';
    });
});





/*function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key' : 'TU9b67283c8256e557176b8d22a6c78aad94657a874f06e5353f152d946163d7b1ef51cb0811a249138d5cfe0186923414'
        },
        body: JSON.stringify({"UserName" : username,"PassWord" : password})
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));
}
*/


