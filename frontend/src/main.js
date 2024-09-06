import '../src/style.css'

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registro');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Obtener los valores de los campos del formulario
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
                return window.location.href = '../pages/login.html';
            }

            alert('Error al registrar usuario');

            } catch (error) {
                console.error(error);
            }
            
        });
    }  
});


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
                    credentials: 'include'
                });

                if (response.ok) {
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

document.getElementById('logout').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include' 
        });

        if (response.ok) {
            window.location.href = '../pages/login.html'; 
        } else {
            alert('Error al cerrar sesión');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});





































// (async () => {
//     const response = await fetch('http://localhost:3000/session', {
//         method: 'GET',
//         credentials: 'include' // Importante para enviar las cookies de sesión
//     })

//     console.log({ response })


//     if (response.ok) {
//         const data = await response.json();
//         document.getElementById('Username').innerText = data.user.username;
//     } else {
//         // Redirigir al usuario a la página de inicio de sesión
//         window.location.href = 'index.html';
//     }
// })();


// Manejar el cierre de sesión
// document.getElementById('logout').addEventListener('click', async () => {
//     const response = await fetch('http://localhost:3000/logout', {
//         method: 'POST',
//         credentials: 'include'
//     })
    
//     if (!response.ok) {
//         throw new Error('Error al cerrar sesión');
//     } else {
//         window.location.href = 'login.html';
//     }
// });