# Repositorio para as atividades Curso Labenu Módulo BackEnd

**Atividade aula Node-Package-JSON 02/01/23**

EXERCICIO 1 -

Para iniciar um aplicativo node precisamos configurar suas dependências.
O objetivo desse exercício é justamente isso:

- criar o package.json
- personalizar as configurações
- criar scripts

Lembrando que ainda veremos ao longo do back-end diversas ferramentas e tecnologias que entrarão como dependências futuramente, ou seja, o package.json será atualizado ao longo das semanas.

Personalizando o package.json

- Dê um nome para o projeto! Dica: labecommerce-backend (o nome precisa ser kebab-case)
- A versão pode deixar 1.0.0
- O arquivo principal será o index.js
- Adicione a propriedade "type" valendo "module" para conseguir utilizar import e export
- Crie pelo menos o script de start, que executa o arquivo index.js
    
Opcional:

- criar palavras-chaves na propriedade "keywords"
- colocar seu nome na propriedade "author"
- adicionar uma licença
- adicionar uma descrição

EXERCICIO 2 - 

    INDEX.JS

Crie o arquivo index.js e dentro dele coloque um console.log avisando que o aplicativo foi iniciado. Teste seu funcionamento executando no terminal o script de start.

 - Argumentos de comando -
Vimos em aula que é possível enviar dados do terminal para o aplicativo via process.argv, então agora chegou a hora de praticar!

Faça aparecer no console pelo menos um argumento, exemplo:

- ao executar no terminal o comando: node index.js bananinha
- aparece no console: "bananinha"

EXERCICIO 3 -

Crie um joguinho simples utilizando os conceitos vistos em aula. Temos alguns exemplos abaixo para auxiliar, você pode escolher um deles ou pensar em outro se quiser!