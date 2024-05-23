# Plates-Up Application [Client-Side / UI]

This project is licensed under _MIT_, feel free to reuse it with **original ownership mentioned**.

The client-side of this project is built with _ReactNative_.

For the server-side, please refer to my other repository _plates-up-server_.

---

## Purpose of this Application

Going to the gym has become a common practice for many people, and many of us have a goal when working out. Whether it's to lose weight, gain muscle, or just to stay healthy, we all have a goal in mind. But how do we know if we're making progress?

- Keep in mind that there are many applications out there that provide fancy functionalities, and a lot of times, they are not free. But really, we want a simple application to be able to track our progress.
- This is where Plates-Up comes in, to cut away all the fancy stuff, letting you to focus on your goal and progress.
- The team at Plates-Up is commited to make progress visible for our users, making progress tracking at the gym easy and available for everyone.

This repository contains the **Client-Side** of Plates-Up.

Note that, this project is under _MIT License_, thus, ones are allowed to reproduce it using the source code, with **original ownership mentioned**.

---

## Contribute to this Project

To make contributions or add features to this project:

1. Fork this repository.
2. Add additional features or enhancements to the existing codes.
3. Make a pull request to notify me.
4. You are good to go!

---

## List of Features

This project currently contains the following list of features (**Client-Side** of it):

- Existing Screens & Functionalities:

  - Register - Allows new user to register to become a part of Plates-Up member.
  - Login - Allows registered user to login to Plates-Up, and start tracking progress.
  - Logs - The main page after the user has logged in. On this page, the users can enter the desired exercise that he/she wants to track.
  - Progress - This page allows user to select the exercise that he/she wants to track on, and be able to visualize the progress using a plot.
  - About - This page contains the motive of building this app, and acknowledging all open source licenses used for this project.

- Folder Structures:

  - screens - The folder where each of the main screens is located.
  - components - The folder where reususable components are stored, such as buttons, etc.
  - contexts - Context API folder, serving as the global state to feed the application to avoid prop drilling.
  - utils - The folder where all helper information or functions are stored, can be reused in multiple code places.
  - apis - Defined API endpoints that point to the backend server is stored here.
  - assets - Containing all the media files, such as images, etc.

---

## List of Dependencies

For details of the dependencies, check _package.json_.

In general, this project uses:

- react native - the main framework
- expo - the wrapper framework to develop react native application
- nativewind (tailwindcss) - for modern css
- react native paper - for UI components
- heroicons - for icons displaying purposes

**To install:** install via _package.json_.

> If you are using `npm`, run `npm install`
> If you are using `yarn`, run `yarn`

---

### Description of Architecture

This project is designed with the following architecture:

Component-related:

- The outer-most wrapper: App.js
  - This file holds the configuration states, such as Contexts Providers, React Native Paper Provider, Navigation Configurations

- navigation/AppNavigation.js
  - The wrapper for the application, defines how the apps is routed (by screens).

- screens/<component.js>
  - The actual screens of the application


Data-related:

- As stated in the _List of Dependencies_ section, the folder structure is the architecture of the data-related elements:
  - apis - The folder where backend apis will be stored, used to CRUD information for the page.
  - assets - The folder where media files will be stored, import them in code as needed.
  - components - _Reusable Components_ for the page, import them wherever needed, such as _Button_, etc.
  - utils - The folder where all helper information or functions are stored, can be reused in multiple code places.

---

### Reporting Issues

To report issues or bugs, **create a new issue** via _Issue_ tab, it will be reviewed as soon as possible.

- Be sure to write description for the issue that you are facing, so that it can be dealt efficiently.
