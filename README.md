# Správa domácích zvířat v útulku

Tato webová aplikace umožňuje správu domácích zvířat v útulku – přidávání, výpis, úpravu a mazání záznamů o zvířatech. Data jsou ukládána do souborové SQLite3 databáze.

---

## Autor
**Jméno autora:** Jan Kulišek

---

## Návod na spuštění

1. **Klonujte nebo stáhněte tento repozitář.**
2. Otevřete terminál ve složce projektu.
3. Nainstalujte závislosti:
    ```
    npm install
    ```
4. (Volitelné) Naplňte databázi ukázkovými daty:
    ```
    npm run seed
    ```
5. Spusťte aplikaci:
    ```
    npm run start
    ```
6. Otevřete prohlížeč a přejděte na [http://localhost:3000](http://localhost:3000)

---

## Bonusové Point Pack balíčky

- **Moderní vzhled a responzivní design**  
  Stránka je plně responzivní, využívá moderní CSS, stínování, přechody a Google Fonts.
- **Okamžitá aktualizace seznamu**  
  Po každé operaci (přidání, smazání) se seznam zvířat ihned aktualizuje bez reloadu stránky.
- **Validace a uživatelská přívětivost**  
  Formulář obsahuje validaci a uživatelsky přívětivé chybové hlášky.
- **Kód v češtině**  
  Celý projekt je lokalizován do češtiny včetně API odpovědí.

---

## Struktura projektu

```
/public         - statické soubory (frontend)
/api            - backendové API pro práci se zvířaty
/database       - SQLite3 databáze a její inicializace
server.js       - hlavní spouštěcí soubor serveru
seed.js         - naplnění databáze ukázkovými daty
README.md       - tento soubor
```

---

## Požadavky

- Node.js (doporučeno 18+)
- npm

---

Pokud budete chtít rozšířit aplikaci o další funkce (editace, filtrování, vyhledávání), neváhejte mě kontaktovat!