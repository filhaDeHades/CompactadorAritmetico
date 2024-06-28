Como rodar o projeto
Este projeto é uma aplicação React que foi compilada para produção. Para rodá-lo, você precisará servir os arquivos estáticos a partir de um servidor HTTP. Aqui estão as instruções passo a passo:

Descompacte o arquivo zip que contém a pasta build.

Instale um servidor HTTP simples, como o serve, se ainda não tiver um instalado. Você pode instalar o serve globalmente com o seguinte comando no terminal:

Navegue até a pasta build descompactada no terminal. Você pode fazer isso com o comando cd, substituindo path_to_build pelo caminho da pasta build:
Inicie o servidor com o comando serve -s .. O -s flag é para servir os arquivos em modo de produção (single-page application):
O aplicativo agora estará disponível em http://localhost:5000 (ou outra porta se a 5000 estiver em uso). Abra este URL em um navegador para visualizar o aplicativo.
Por favor, note que você precisará ter o Node.js e npm instalados em seu computador para instalar e rodar o serve. Se você não tiver o Node.js e npm instalados, você pode baixá-los aqui.