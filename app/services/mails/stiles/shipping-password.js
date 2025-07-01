
module.exports = ({ name, password }) => {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
            body {
                background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
                margin: 0;
                padding: 0;
                font-family: 'Segoe UI', Arial, sans-serif;
            }
            .main-container {
                max-width: 420px;
                margin: 40px auto;
                background: #fff;
                border-radius: 18px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.09);
                overflow: hidden;
            }
            .header {
                background: #0077b6;
                color: #fff;
                padding: 32px 0 18px 0;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 2.1em;
                letter-spacing: 1px;
            }
            .greeting {
                font-size: 1.1em;
                color: #333;
                text-align: center;
                margin: 28px 0 0 0;
            }
            .message {
                color: #444;
                font-size: 1em;
                text-align: center;
                margin: 18px 0 0 0;
            }
            .password-section {
                margin: 32px 0 32px 0;
                text-align: center;
            }
            .password-label {
                font-size: 1em;
                color: #0077b6;
                margin-bottom: 8px;
                font-weight: 500;
            }
            .password-box {
                display: inline-block;
                background: #e9f5ff;
                color: #1b5e20;
                font-size: 1.7em;
                font-weight: bold;
                letter-spacing: 2px;
                padding: 16px 36px;
                border-radius: 10px;
                border: 2px dashed #0077b6;
                margin-top: 8px;
                margin-bottom: 8px;
                box-shadow: 0 2px 8px rgba(0,123,255,0.07);
            }
            .footer {
                background: #f1f1f1;
                color: #888;
                font-size: 0.95em;
                text-align: center;
                padding: 18px 12px;
                border-top: 1px solid #e0e0e0;
            }
            @media (max-width: 500px) {
                .main-container {
                    margin: 10px;
                    border-radius: 10px;
                }
                .header h1 {
                    font-size: 1.3em;
                }
                .password-box {
                    font-size: 1.1em;
                    padding: 10px 18px;
                }
            }
        </style>
    </head>
    <body>
        <div class="main-container">
            <div class="header">
                <h1>ATI</h1>
            </div>
            <div class="greeting">
                ¡Hola, <strong>${name}</strong>!
            </div>
            <div class="message">
                Hemos reseteado tu contraseña.<br>
                Tu nueva contraseña es:
            </div>
            <div class="password-section">
                <div class="password-label">Contraseña temporal:</div>
                <div class="password-box">${password}</div>
            </div>
            <div class="footer">
                Si no solicitaste este cambio, por favor ignora este correo.<br>
            </div>
        </div>
    </body>
    </html>
    `;
};