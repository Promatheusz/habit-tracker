# Wybieramy obraz bazowy Node.js
FROM node:20-alpine

# Ustawiamy katalog roboczy
WORKDIR /usr/src/app

# Kopiujemy pliki zależności
COPY package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy resztę kodu źródłowego
COPY . .

# Ekspozycja portu dla Express
EXPOSE 5000

# Komenda startowa
CMD ["npm", "start"]