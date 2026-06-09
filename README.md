# 🌱 TerraByte 🌱

O TerraByte é uma solução desenvolvida para auxiliar agricultores na tomada de decisão frente aos impactos das mudanças climáticas na agricultura. O aplicativo disponibiliza informações sobre tipos de solo, culturas agrícolas e características de terrenos, permitindo analisar a compatibilidade entre uma área de plantio e determinadas culturas.

Com isso, o sistema apoia produtores na escolha de cultivos mais adequados às condições ambientais e climáticas da região, contribuindo para uma produção mais eficiente, sustentável e resiliente aos desafios climáticos.
## 📱 Sobre o projeto

Aplicativo mobile desenvolvido em React Native com Expo para auxiliar produtores rurais na análise de compatibilidade entre terrenos e culturas agrícolas, fornecendo informações sobre solos, plantios, defensivos e recomendações baseadas em dados ambientais.

O aplicativo permite que usuários:

* Criem uma conta.
* Façam login na plataforma.
* Gerenciem seus terrenos cadastrados.
* Consultem tipos de solo disponíveis.
* Consultem defensivos agrícolas.
* Visualizem plantios cadastrados.
* Realizem análises de compatibilidade entre terreno e cultura.
* Consultem recomendações para plantio.
* Gerenciem seus dados pessoais.

---

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido como atividade prática da disciplina de Mobile Application Development - ADS (FIAP), integrando uma API desenvolvida em Java Spring Boot com uma aplicação mobile construída em React Native.

O projeto atende aos seguintes requisitos propostos:

### Navegação entre telas

* Implementação de navegação utilizando React Navigation.
* Estrutura com múltiplas rotas organizadas em Drawer Navigation e Stack Navigation.
* Navegação entre módulos de terrenos, plantios, solos, defensivos e análises.

### Consumo de API REST

* Integração completa com API desenvolvida em Spring Boot.
* Consumo de endpoints para cadastro, consulta, atualização e exclusão de dados.
* Comunicação utilizando Axios.

### Protótipo visual funcional

* Interface moderna inspirada em aplicações agrícolas.
* Componentização para reutilização de elementos visuais.
* Experiência de navegação intuitiva para o usuário.

### Gerenciamento de estado

* Utilização de React Hooks.
* Context API para gerenciamento de sessão e perfil do usuário.
* Atualização dinâmica das informações em toda a aplicação.

### Funcionalidades implementadas

#### Usuário

* Cadastro de conta.
* Login.
* Atualização de telefone.
* Alteração de senha.
* Escolha de avatar.
* Exclusão de conta.

#### Terrenos

* Cadastro de terrenos por nome e CEP.
* Consulta de terrenos cadastrados.
* Visualização detalhada do solo e localização.
* Exclusão de terrenos.

#### Plantios

* Consulta de culturas agrícolas.
* Visualização detalhada dos requisitos de plantio.

#### Solos

* Consulta dos tipos de solo.
* Visualização dos plantios compatíveis com cada solo.

#### Defensivos

* Consulta de defensivos agrícolas.
* Filtro por tipo de defensivo.
* Visualização dos plantios associados a cada defensivo.

#### Análise de Compatibilidade

* Seleção de terreno e cultura.
* Geração de análise automatizada.
* Consulta do histórico de análises.
* Visualização detalhada dos resultados e recomendações.

---

## 👩‍💻 Equipe TerraByte

Carolina Nascimento Gonçalves
- RM: 564786
- 2TDSPJ
- [Github](https://github.com/carolnascgoncalves) 
- [Linkedin](http://linkedin.com/in/carolina-nascimento-906274364)

Emanuelly Ventura do Nascimento
- RM: 562339
- 2TDSPJ
- [Github](https://github.com/Emanuelly0ventura) 
- [Linkedin](https://www.linkedin.com/in/emanuelly-ventura-966135355) 

Julia Sayuri Kina
- RM: 564555
- 2TDSPJ
- [Github](https://github.com/juliakina) 
- [Linkedin](https://www.linkedin.com/in/julia-kina)

---

## 🚀 Tecnologias utilizadas

Este projeto foi desenvolvido com:

### Mobile

* React Native
* Expo
* JavaScript
* React Navigation
* Axios
* React Context API
* React Native Safe Area Context
* Expo Vector Icons

### Backend

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* Swagger
* Maven
* H2 Database

---

## ⚙️ Funcionalidades

### Autenticação

* Cadastro de usuários.
* Login utilizando JWT.
* Controle de sessão.

### Gerenciamento de terrenos

* Cadastro de terrenos via CEP.
* Consulta detalhada do solo e localização.
* Exclusão de terrenos.

### Consulta agrícola

* Plantios disponíveis.
* Solos compatíveis.
* Defensivos recomendados.

### Análise de compatibilidade

* Avaliação de adequação do solo.
* Temperatura ideal para cultivo.
* Índice de risco.
* Recomendação automática baseada nos dados do terreno.

### Perfil do usuário

* Alteração de telefone.
* Alteração de senha.
* Seleção de avatar.
* Exclusão da conta.

---

## 🛠 Dependências principais

```bash
npm install axios

npm install @react-navigation/native

npm install @react-navigation/native-stack

npm install @react-navigation/drawer

npx expo install react-native-screens

npx expo install react-native-safe-area-context

npx expo install react-native-gesture-handler

npx expo install react-native-reanimated

npx expo install @expo/vector-icons
```

---

## 🎥 Vídeo Demonstrativo

Confira a demonstração completa do aplicativo no YouTube!

➡️[Clique aqui para assistir!](https://youtu.be/eUGbpgh_hTw)

Neste vídeo é possível visualizar o fluxo completo da aplicação, incluindo cadastro, login, gerenciamento de terrenos, consultas agrícolas e geração de análises de compatibilidade.

---

## 📬 Contato

Caso tenha dúvidas, sugestões ou interesse em conhecer mais sobre o projeto, ficamos à disposição para conversar. Você pode entrar em contato com qualquer uma da nossa equipe:

- [Carolina Nascimento Gonçalves](http://linkedin.com/in/carolina-nascimento-906274364)
- [Emanuelly Ventura do Nascimento](https://www.linkedin.com/in/emanuelly-ventura-966135355) 
- [Julia Sayuri Kina](https://www.linkedin.com/in/julia-kina)
