## Hoe gebruiken wij Git tijdens dit project?

### Aanpak
Iedereen heeft zijn eigen branch tijdens de development fase.
- `development-wouter`
- `development-maria`
- `development-michiel`

Wanneer je een nieuwe feature wilt toevoegen doe je dit op je eigen branch.

Indien je code werkt mag je deze pushen naar de `development` branch.

De `development` branch is onze nieuwe `master` branch. 

De `master` branch word niet meer aangeraakt tenzij er een stabiele versie aanwezig is op de `development` branch.

### Commando's

#### Maak jouw eigen git branch
We willen een nieuwe branch aanmaken die een copy is van de master branch.
Dit gebeurd maar eenmalig.
```
$ git checkout -b development-<jouw_naam> master
```

Je kan nu je eigen features beginnen toe tevoegen!

### Jouw feature toevoegen aan de development branch
Eens dat je feature klaar is en werkt mag je jouw veranderingen toevoegen aan de `development` branch!

**Let op!** In de tussentijd kan een ander teamlid veranderingen hebben gepushed naar de `development` branch.
Volg de instructies die git je geeft. Je gaat waarschijnlijk gewoon een merge moeten uitvoeren!

Gebruik deze commando's om een feature toe te voegen aan de `development` branch:
```
# Bewaar je feature op jouw branch
$ git push origin development-<name>

# Switch van jouw branch naar de development branch
$ git checkout development

# Merge jouw veranderingen met die van de development branch
$ git merge --no-ff development-<jouw_naam>

>> Het is hier dat het merge conflict kan ontstaan! Als je niet weet wat je moet doen, stuur mij (Michiel) gerust een berichtje :)

# Push je veranderingen op de development branch
$ git push origin development

# Switch terug naar je eigen branch
$ git checkout development-<name>

```

