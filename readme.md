# Kanban

This repo contains the code for the frontend of the Kanban project.
The goal of this website is mainly to show off some of my web development skills.

A demo account is available with some datas already written if you want to have a quick idea of how the Kanban project works. You have to use the placeholders in the sign in form (max@gmail.com, 123456).
To avoid abuse, permanent datas modofication in this account is not allowed. Therefore, any modification will be lost on page reload.

## Backend

For this project, I used Firebase as backend:

- Firestore
- Authentication

## Hightlighted skills in this project

- React with Redux
- Typescript
- SCSS (BEM)
- Firebase

## Main features

### Responsive

**Fully responsive**: the website works on desktop, tablet and mobile (last version of Chromimum or Firefox). Even if it's responsive, I recommend to use the desktop or Tablet version for an optimal user experience.

### Datas persistence

The user can save items into a cart. I used localStorage as an easy way to keep track of the cart content.

### Design

The idea and design of this project comes from [Frontend Mentor](https://www.frontendmentor.io/profile/Wandole).

# How to install

## Prerequisites

- nodeJS v16.14.2 or better

## Setup

- Run `npm install`
- Add project to your Firebase environement

# Dependencies

The core dependencies are _React_(v.18.2) with:

- _react-router-dom_(v6)
- _redux_ with _redux-toolkit_
- _firebase_
- _axios_

_react-colorful_ was used to have a quick access to a color picker module.

# Scripts

## `dev`

Launch the app in the environement for development with Vite.

## `build`

Build the app with Vite

## `preview`

Host the built version of the app with Vite.

## `emule`

Launch the Firebase emulators suite for development

# Development environement

- Launch the Firebase emulators `npm run emule`
- Launch project in development environement `npm run dev`
- Reload web page to populate the database in the Firebase emulators with mocked datas

# To be developed

- Drag and drop of cards
- Animations
- Improve keyboard accessibility

# Licence

This website has been build for demonstration purpose only.

All the content is published under the MIT licence (see ['/licence.txt'](https://github.com/WandoCode/kanban-client/blob/main/licence.txt))
