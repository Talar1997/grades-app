# Grades - implementacja w Vue

## Setup
1. Project setup: ```npm install```
2. Compiles and hot-reloads for development: ```npm run serve```
3. Compiles and minifies for production: ``npm run build```
4. Lints and fixes files: ```npm run lint```


## Podstrony

### Login
Logowanie do systemu

### Strona główna
Tabela (bądź karty) z dostępnymi przedmiotami. Wyświetlenie listy przedmiotów zalogowanego użytkownika.

Możliwość utworzenia nowego przedmiotu. Modal - nazwa przedmiotu, data prowadzenia, prowadzący domyślnie zalogowany użytkownik. Użytkownicy dodawani później (po utworzeniu przedmiotu)

### Strona przedmiotu
Możliwość edycji, dodawania strudentów. Zakładka absencji, zakładka z ocenami, wyliczanie średniej.
Na ocenę bdb: oceny muszą mieć swoje wagi oraz opis oraz jeśi uczeń ma na zaj 100% obecności anulowana jest jedna najsłabsza ocena. 

### Strona z nieobecnościami
Lista uczniów z możliwością zatwierdzenia czy jest on obecny czy nie.  Historia obecności.

### (Opcjonalnie) Panel admina do zarządzania użytkownikami
jw
