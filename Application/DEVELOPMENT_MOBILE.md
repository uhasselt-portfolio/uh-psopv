# Hoe moet je de Ionic app builden & runnen?

## Voorbereiding
### Android Studio
Download: https://developer.android.com/studio
### Ionic React
Open je terminal en type:
```
npm install -g @ionic/cli
```

## Build
Maak een nieuw **Ionic React TypeScript** project:
```
ionic start <project naam> blank --capacitor --type=react
```

#### Run het project in de browser
```
ionic serve
```

#### Run het project in een Android emulator
Build het project eerst
```
npm run build
```
We voegen een Android emulator toe aan de capacitor:
```
ionic cap add android
```
Synchroniseer je code met de emulator (doe dit elke keer je veranderingen hebt gemaakt).

| Dit commando **build** de typescript code, **kopieert** de code naar de emulator en **opent** Android Studio.
```
ionic cap run android --prod
```
### Run Emulator
De versie van Android en het model van de smartphone maakt niet uit.

#### Wat als ik een wit scherm krijg?
Verander het model van de smartphone, bv: Pixel 2a => Pixel 3a XL