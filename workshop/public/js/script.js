document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // หยุดการส่งฟอร์ม

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    // รีเซ็ตข้อความก่อนหน้า
    messageDiv.style.display = 'none'; // ซ่อนข้อความเมื่อเริ่มต้นใหม่

    // ส่งข้อมูลไปยัง API
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Application-Key': 'TU9b67283c8256e557176b8d22a6c78aad94657a874f06e5353f152d946163d7b1ef51cb0811a249138d5cfe0186923414',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "UserName": username, "PassWord": password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            // เมื่อเข้าสู่ระบบสำเร็จ
            const modalContent = `
                <p>Message: ${data.message}</p>
                <p>Username: ${data.username}</p>
                <p>Display Name (TH): ${data.displayname_th}</p>
                <p>Display Name (EN): ${data.displayname_en}</p>
                <p>Email: ${data.email}</p>
                <p>Department: ${data.department}</p>
                <p>Faculty: ${data.faculty}</p>
            `;
            console.log(modalContent); // สามารถใช้ console log เพื่อดูข้อมูล
            messageDiv.innerHTML = 'Success'; // แสดงข้อความเมื่อเข้าสู่ระบบสำเร็จ
            messageDiv.style.color = 'green'; // เปลี่ยนเป็นสีเขียวเมื่อสำเร็จ
            messageDiv.style.display = 'block'; // แสดงข้อความ
        } else {
            // เมื่อเข้าสู่ระบบไม่สำเร็จ
            messageDiv.innerHTML = 'Incorrect Username or Password'; // แสดงข้อความผิดพลาด
            messageDiv.style.color = 'red'; // เปลี่ยนเป็นสีแดงเมื่อไม่สำเร็จ
            messageDiv.style.display = 'block'; // แสดงข้อความ
        }
    })
    .catch(error => {
        console.error('Error:', error);
        messageDiv.innerHTML = 'เกิดข้อผิดพลาดในการเชื่อมต่อ'; // แสดงข้อความผิดพลาด
        messageDiv.style.color = 'red'; // เปลี่ยนเป็นสีแดง
        messageDiv.style.display = 'block'; // แสดงข้อความ
    });
});
