# Wybieramy obraz bazowy Node.js
FROM node:20-alpine

# Ustawiamy katalog roboczy
WORKDIR /usr/src/app

# Kopiujemy pliki zależności
COPY package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy kod źródłowy
COPY . .

# Ekspozycja portu dla Reacta
EXPOSE 3000

# Komenda startowa dla dewelopera
CMD ["npm", "start"]