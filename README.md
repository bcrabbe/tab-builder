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
![Screenshot 2022-02-05 at 14 47 30](https://user-images.githubusercontent.com/6035754/152646658-c195c14f-05dc-49bd-be17-091d4a704412.png)


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
![Screenshot 2022-02-05 at 14 48 22](https://user-images.githubusercontent.com/6035754/152646696-275b05bc-545c-4227-9a51-ad2d43959f32.png)

#### Tabs

Convert a txt tab to svg
![Screenshot 2022-02-05 at 14 47 00](https://user-images.githubusercontent.com/6035754/152646635-b3669187-6418-46ec-a2c6-246d7bfd17c1.png)

