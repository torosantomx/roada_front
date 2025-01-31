module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            jasmine: {
                // Configuraciones de Jasmine
            },
            clearContext: false // Deja el resultado de las pruebas en el navegador
        },
        jasmineHtmlReporter: {
            suppressAll: true // Elimina los mensajes duplicados
        },
        coverageReporter: {
            dir: require('path').join(__dirname, './coverage'),
            subdir: '.',
            reporters: [
                { type: 'html' },
                { type: 'text-summary' }
            ]
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'], // Usa Chrome en modo headless
        singleRun: true, // Ejecuta las pruebas una vez y cierra
        restartOnFileChange: true
    });
};