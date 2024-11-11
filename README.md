Questa è un'applicazione di To-Do List creata per ripassare e fare pratica con React, TypeScript e Bootstrap per il frontend, e con Node.js, Express, MongoDB, e TypeScript per il backend, seguendo lo stack MERN. L'app permette agli utenti di registrarsi, creare, modificare ed eliminare note personali. Tutte le operazioni sono gestite seguendo le best practices del backend.

Funzionalità Principali:

- Creazione di un account utente.
- Aggiunta, modifica ed eliminazione delle note.
- Sicurezza, gestione delle sessioni e degli errori http.

Per avviare l'applicazione:

- Configurare le variabili di ambiente usando il file `.env.example` come riferimento per creare un file `.env`
- Avviare il server backend col comando `npm start`
- Avviare il server frontend col comando `npm start`

Per creare un cluster su MongoDB:

- Registrarsi su MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
- Creare un nuovo cluster gratuito
- Ottenere l’URI di connessione e configurarlo nel `.env`
