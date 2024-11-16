# Welcome to the Gyroscope Demo App 👋

This is an [Expo](https://expo.dev) project created to demonstrate the fun features of Expo, specifically using the gyroscope sensor to move a ball on the screen.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## About the Gyroscope Demo

This app features a GyroscopeDemo component that uses the device's gyroscope to move a ball around the screen. The ball's movement is constrained within the screen dimensions, and haptic feedback is provided when the ball hits the edges of the screen.

### Key Features

- Gyroscope Integration: Uses the `expo-sensors` package to read gyroscope data.
- Smooth Animations: Utilizes `react-native-reanimated` for smooth animations.
- Haptic Feedback: Provides haptic feedback using the `expo-haptics` package when the ball hits the screen edges.
- Landscape Orientation: The app is designed to be used in landscape mode.

### Code Overview

The main component is `GyroscopeDemo.tsx`, which handles the gyroscope data and animates the ball's movement. Here's a brief overview of the code:
