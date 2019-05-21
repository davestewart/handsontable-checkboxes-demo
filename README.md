# Checkboxes Demo


## Intro

This project demos a Handsontable [custom editor](https://handsontable.com/docs/7.0.3/tutorial-cell-editor.html).

The code for the editor itself was taken from the link below, as suggested [here](https://forum.handsontable.com/t/select-editor-tutorial-has-bugs/3232/12?u=dave.stewart):

- https://github.com/handsontable/handsontable/blob/master/src/editors/selectEditor.js

## Problem

We'd like to understand how to handle focus correctly, using either the button in the editor or the ENTER key, to end editing and pass back focus to the table. We'd like this to work with single and multiple cell selections.

The original forum post with more detail is here:

- https://forum.handsontable.com/t/custom-editor-multiple-cell-focus-question/3263

UI preview:

> ![UI Preview](https://forum.handsontable.com/uploads/default/original/1X/4d4e46c6efb15766919789d2a182def5b4d68b7c.png)

Non-working and working flow:

> ![UI Preview](http://g.recordit.co/OagvY54Uj9.gif)


## Project structure

There seem like a lot of files, as we've broken them out of a larger project, with reusable config, settings, etc.

The handsontable-specific files are in:

```
src/plugins/handsontable/*
```
The editor-specific files are in:

```
src/plugins/handsontable/editors/*
```

The key files in context are:

```
+- src
    +- components
    |   +- Demo.vue                         Main demo
    |   +- DemoTable.vue                    Reusable Demo Table
    +- config
    |   +- index.js                         Config for editor
    +- plugins
        +- handsontable
            +- config
            |   +- columns.js               Reusable columns definitions
            |   +- settings.js              Helper function to build custom settings and handlers
            +- editors
            |   +- CheckboxesEditor.js      Main editor component logic
            |   +- CheckboxesView.vue       Main editor view
            +- renderers
            |   +- CollateralRenderer.js    Custom renderer for the checkboxes output
            +- ...
```

Note that the editor / renderer combination uses JSON to store the array of checkbox array results.

We assume this is the only way based on [this post](https://forum.handsontable.com/t/how-to-use-an-array-of-array-of-objects-as-data-source/2812/2) ?



## Libraries

Handsontable

- https://handsontable.com

Vue JS

- https://vuejs.org/v2/guide

Element UI

- https://element.eleme.io/#/checkbox-group


## Project setup

```
npm install
npm run dev
```
