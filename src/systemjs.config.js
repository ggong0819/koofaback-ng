/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            'ngx-bootstrap': 'npm:ngx-bootstrap/bundles/ngx-bootstrap.umd.min.js',
            'angular2-uuid' : 'npm:angular2-uuid/index.js',
            
            'moment': 'npm:moment/moment.js',
            'ng2-pagination' : 'npm:ng2-pagination/dist',
            'ng2-cookies' : 'npm:ng2-cookies',
            'mydatepicker': 'npm:mydatepicker/bundles/mydatepicker.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            lib:'app/_common/js',
            "ng2-summernote": "node_modules/ng2-summernote",
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'ng2-pagination': { main: 'ng2-pagination.js', defaultExtension: 'js' },
            'ng2-cookies': { main: 'index.js', defaultExtension: 'js' },
            'common-js': { main: 'common.js', defaultExtension: 'js' },
            'ng2-summernote': { main: 'lib/index.js', defaultExtension: 'js' },
        }
    });
})(this);