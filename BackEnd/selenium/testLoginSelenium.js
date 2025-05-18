// testLoginSelenium.js
const { Builder, By, until } = require('selenium-webdriver');

(async function example() {
  // Crear una nueva instancia del navegador
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Ir a tu sistema
    await driver.get('http://localhost:3000');

    // Esperar que cargue algún elemento que confirme que el sistema está disponible
    await driver.wait(until.elementLocated(By.css('button')), 5000); // Espera que haya un botón en pantalla

    // Opcional: verificar que el botón diga algo como "Ingresar"
    let button = await driver.findElement(By.css('button'));
    let buttonText = await button.getText();

    if (buttonText.includes('Ingresar') || buttonText.includes('Login')) {
      console.log('✅ Test OK: Botón de ingreso encontrado.');
    } else {
      console.log('⚠️ Test Fallido: Botón encontrado pero no tiene texto esperado.');
    }

  } catch (error) {
    console.error('❌ Error en la prueba:', error);
  } finally {
    await driver.quit(); // Cerrar el navegador
  }
})();
