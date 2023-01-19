# Interview Scheduler

!["logo"](https://github.com/Likai-L/scheduler/blob/master/docs/logo.png?raw=true)

Interviewer Scheduler is a React single-page app that provides a convenient interface for users to view, book, edit and cancel interviews. Data is communicated to a Postgre databse through an API server. Forms are validated prior to submission and error messages are shown should there be server-side errors. Unit, integration and end-to-end tests are performed throughout the development.

# Getting Started

## Setup: Install dependencies

```sh
npm install
```

## Running Webpack Development Server

```sh
npm start
```

## Visiting in the browser

```sh
http://localhost:8000
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress E2E Tests

```sh
npm run cypress
```

<br/>

# App Demo

## Page Preview

<br/>

!["page-preview"](https://github.com/Likai-L/scheduler/blob/master/docs/screenshot.png?raw=true)

## GIF Demos

!["switch-days"](https://github.com/Likai-L/scheduler/blob/master/docs/switch-days.gif?raw=true)

<p align="center">Switching between the weekdays.</p>
<br>

!["book-interview"](https://github.com/Likai-L/scheduler/blob/master/docs/book.gif?raw=true)

<p align="center">Booking an interview. The number of the remaining spots gets updated upon change.</p>
<br>

!["edit-and-delete-interview"](https://github.com/Likai-L/scheduler/blob/master/docs/edit-and-delete.gif?raw=true)

<p align="center">Editting and deleting an interview. The number of the remaining spots gets updated upon change.</p>
<br>

!["form-validation"](https://github.com/Likai-L/scheduler/blob/master/docs/form-validation.gif?raw=true)

<p align="center">Form validations: a student name must be entered; an interviewer must be selected.</p>
<br>

!["error-display"](https://github.com/Likai-L/scheduler/blob/master/docs/errors.gif?raw=true)

<p align="center">Error displaying</p>
<br>
