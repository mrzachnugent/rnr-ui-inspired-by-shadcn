# React Native Reusables

![banner](https://github.com/mrzachnugent/react-native-reusables/assets/63797719/0eef0a6d-d8eb-4b52-a97d-fa3b1e534215)

## Universal [shadcn/ui](https://ui.shadcn.com) for React Native featuring a focused collection of components

Crafted with [NativeWind v4](https://www.nativewind.dev/) and accessibility in mind, `react-native-reusables` is open source, offering a foundation for developing your own high-quality component library.

https://github.com/mrzachnugent/react-native-reusables/assets/63797719/ae7e074f-05a4-4568-b71a-f1e0be13650d

[📖 Docs](https://rnr-docs.vercel.app/)
<br/>
[🌐 Web demo](https://rnr-showcase.vercel.app/)

### How to use

**Init**

Quickly create a new project using the React Native Reusables CLI.

> If a `package.json` is detected, the CLI will install all necessary dependencies and automatically configure your project for you.

```bash
npx @react-native-reusables/cli@latest init
```

**Add**

Add components to an existing project using the React Native Reusables CLI.

```bash
npx @react-native-reusables/cli@latest add
```

#### Upcoming components

- [Alert](https://ui.shadcn.com/docs/components/alert)
- [Breadcrumb](https://ui.shadcn.com/docs/components/breadcrumb)
- [Pagination](https://ui.shadcn.com/docs/components/pagination)
- [Slider](https://ui.shadcn.com/docs/components/slider)
- [Toast](https://ui.shadcn.com/docs/components/toast)

## Project Scope

This project includes only components built without third-party libraries or those that use [@rn-primitives](https://rnprimitives.com) _(universal radix-ui/primitives)_.

**Excluded components**

Only **15 out of the 51** shadcn/ui components are excluded from this library. However, you can use the following packages or repositories to build your own

#### Calendar

- [React Native Flash Calendar](https://github.com/MarceloPrado/flash-calendar): An incredibly fast and flexible library to build calendars in React Native.

#### Carousel

- [Animated.ScrollView](https://medium.com/timeless/building-a-gallery-carousel-in-react-native-using-reanimated-i-19b19e6b6b10): An article explaining how to create a carousel using the ScrollView component.

#### Chart

- [Victory Native](https://github.com/FormidableLabs/victory-native-xl): A charting library for React Native with a focus on performance and customization.

#### Combobox

_TBD_

#### Command

_TBD_

#### Data Table

- [Tanstack Table](https://tanstack.com/table/latest): Headless UI for building powerful tables & datagrids

#### Date Picker

- [React Native DateTimePicker](https://github.com/react-native-datetimepicker/datetimepicker): React Native date & time picker component for iOS, Android and Windows

#### Drawer

- [Universal Bottom Sheet](https://github.com/adebayoileri/universal-bottom-sheet) by [adebayoileri](https://github.com/adebayoileri): A bottom sheet component that combines Gorhom Bottom Sheet and Vaul for seamless and responsive experience across both mobile and web.

#### Form

- [React Hook Form](https://react-hook-form.com/get-started#ReactNative): Performant, flexible and extensible forms with easy-to-use validation.

#### Input OTP

- [input-otp-input](https://github.com/yjose/input-otp-native): 🔐 OTP input for React Native/Expo App: Unstyled, copy-paste examples that are fully tested and compatible with NativeWind.

#### Resizable

_TBD_

#### Scroll Area

- [React Native ScrollView](https://reactnative.dev/docs/scrollview): A generic scrolling container that can host multiple components and views.

#### Sheet (Drawer navigation)

- [Drawer navigation](https://reactnavigation.org/docs/drawer-based-navigation/): A drawer navigation component that slides in from the side.

#### Sonner

- [Sonner Native](https://github.com/gunnartorfis/sonner-native) by [gunnartorfis](https://github.com/gunnartorfis): An opinionated toast component for React Native. A port of @emilkowalski's sonner.

- [Burnt](https://www.npmjs.com/package/burnt): Cross-platform toasts for React Native, powered by native elements. On Web, it wraps [Sonner](https://github.com/emilkowalski/sonner).

### Community Templates

Explore community-created components and templates that extend the core library and fill in missing shadcn/ui elements. Contributions are welcome!

- [RNR Base Bare](https://github.com/a0m0rajab/rnr-base-bare) by [a0m0rajab](https://github.com/a0m0rajab): _A simple app using Supabase as the backend, featuring sign-in/sign-up and profile functionality._

## How to contribute

1. Fork this repo, then clone your fork on your machine.

2. Change directory into the cloned repo: `cd react-native-reusables`

3. Install the dependencies (**IMPORTANT:** Must use pnpm): `pnpm i`

4. From the root directory, start up desired app with the following commands:

- Showcase
  - iOS: `pnpm dev:showcase`
  - Android: `pnpm dev:showcase:android`
  - Web: `pnpm dev:showcase:web`
- Starter-base
  - iOS: `pnpm dev:starter-base`
  - Android: `pnpm dev:starter-base:android`
  - Web: `pnpm dev:starter-base:web`
- Docs: `pnpm dev:docs`

5. Add and commit your changes

6. Make a pull request

### Deprecated-UI

> These components are still available for use but are no longer recommended or actively supported by the developers. They can be used as inspiration or as a starting point for your own components.

[View deprecated components](/packages/reusables/src/components/deprecated-ui/README.md)
