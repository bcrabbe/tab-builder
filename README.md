### tab-builder

React SPA for guitar utilities.

```
yarn install
yarn start
```
http://localhost:3000


##### Scales

Want to know what a scale looks like in different tunings?
```jsx
  <Scalometer
    className={classes.scale}
    root='D'
    scale={[0, 3, 5, 6, 7, 10]}
    tuning="DADFAD"
  />
```

#### Chords

Make svg chord diagrams:
```jsx
  <FretBoard
    key={i}
    className={this.props.classes.chord}
    notes={[
      [{fret:'X'}],
      [{fret:0}],
      [{fret:2}],
      [{fret:2}],
      [{fret:2}],
      [{fret:3}]
    ]}
  />
```

#### Tabs

Convert a txt tab to svg
