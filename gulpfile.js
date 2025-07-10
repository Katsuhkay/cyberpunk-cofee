// config padrão, sendo alterado conforme necessidades futuras:

// Importa o Gulp (task runner)
const gulp = require('gulp');

// Importa o compilador Sass, usando o Dart Sass como engine
const sass = require('gulp-sass')(require('sass'));

// Importa o plugin para otimização de imagens
const imagemin = require('gulp-imagemin');

// Importa o path do node para facilitar manipulação de caminhos
const path = require('path');

// Define os caminhos dos arquivos para facilitar a manutenção
const paths = {
    styles: {
        src: 'src/styles/**/*.scss',  // Todos os arquivos .scss na pasta src/styles
        dest: 'dist/css'              // Pasta de saída para os arquivos CSS gerados
    },
    images: {
        src: 'src/images/**/*',       // Todos os arquivos dentro de src/images
        dest: 'dist/images'           // Pasta de saída para as imagens otimizadas
    },
    libs: {
        bootstrapCSS: 'node_modules/bootstrap/dist/css/bootstrap.min.css',  // CSS Bootstrap
        bootstrapJS: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', // JS Bootstrap (bundle com Popper)
        jqueryJS: 'node_modules/jquery/dist/jquery.min.js',                  // jQuery minificado
        destCSS: 'dist/libs/css',      // Pasta destino CSS das libs
        destJS: 'dist/libs/js'         // Pasta destino JS das libs
    }
};

// Tarefa que compila SCSS em CSS
function compileSass() {
    return gulp.src(paths.styles.src)               // Lê os arquivos SCSS de origem
        .pipe(sass({ outputStyle: 'compressed' })   // Compila e comprime o CSS
            .on('error', sass.logError))            // Exibe erros no terminal, se houver
        .pipe(gulp.dest(paths.styles.dest));        // Salva os arquivos CSS no destino
}

// Tarefa que otimiza as imagens
function optimizeImages() {
    return gulp.src(paths.images.src)               // Lê os arquivos de imagem de origem
        .pipe(imagemin())                           // Otimiza/comprime as imagens
        .pipe(gulp.dest(paths.images.dest));        // Salva as imagens otimizadas no destino
}

// Tarefa para copiar o CSS do Bootstrap para a pasta dist/libs/css
function copyBootstrapCSS() {
    return gulp.src(paths.libs.bootstrapCSS)        // Pega o arquivo bootstrap.min.css
        .pipe(gulp.dest(paths.libs.destCSS));       // Copia para a pasta destino
}

// Tarefa para copiar o JS do Bootstrap para a pasta dist/libs/js
function copyBootstrapJS() {
    return gulp.src(paths.libs.bootstrapJS)         // Pega o arquivo bootstrap.bundle.min.js
        .pipe(gulp.dest(paths.libs.destJS));        // Copia para a pasta destino
}

// Tarefa para copiar o JS do jQuery para a pasta dist/libs/js
function copyJqueryJS() {
    return gulp.src(paths.libs.jqueryJS)             // Pega o arquivo jquery.min.js
        .pipe(gulp.dest(paths.libs.destJS));         // Copia para a pasta destino
}

// Tarefa que observa mudanças nos arquivos SCSS e imagens
function watchFiles() {
    gulp.watch(paths.styles.src, compileSass);       // Se um .scss mudar, recompila o CSS
    gulp.watch(paths.images.src, optimizeImages);    // Se uma imagem mudar, reotimiza
    // Não precisa assistir libs, normalmente são estáticas
}

// Task para copiar todas as libs (CSS e JS)
const copyLibs = gulp.parallel(copyBootstrapCSS, copyBootstrapJS, copyJqueryJS);

// Exporta tarefas individuais para execução manual, se necessário
exports.sass = compileSass;
exports.images = optimizeImages;
exports.libs = copyLibs;

// Define a tarefa de watch como padrão, incluindo compilação inicial e libs
exports.watch = gulp.series(
    gulp.parallel(compileSass, optimizeImages, copyLibs),  // Executa tudo antes de assistir
    watchFiles                                             // Inicia o monitoramento
);

// Define a task padrão (quando você digita "gulp" no terminal)
exports.default = exports.watch;