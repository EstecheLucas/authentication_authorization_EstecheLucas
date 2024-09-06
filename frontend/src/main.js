import '../src/style.css';

//  formulario de registro
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registro');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok) {
                    window.location.href = '../pages/login.html';
                } else {
                    alert('Error al registrar usuario');
                }

            } catch (error) {
                console.error('Error:', error);
            }
        });
    }  
});

//formulario de inicio de sesión
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    // Guardar el token JWT en localStorage
                    localStorage.setItem('token', data.token);
                    window.location.href = '../pages/index.html';
                } else {
                    const data = await response.json();
                    document.getElementById('error').innerText = data.error || 'Error al iniciar sesión';
                }

            } catch (error) {
                console.error('Error:', error);
            }
        });
    }  
});

// cierre de sesión
document.getElementById('logout').addEventListener('click', async () => {
    try {
        // Eliminar el token JWT del almacenamiento
        localStorage.removeItem('token');

        window.location.href = '../pages/login.html'; 
    } catch (error) {
        console.error('Error:', error);
    }
});
