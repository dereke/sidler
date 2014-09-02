# Sidler

## Goals

* Show dialogs at top/left/bottom/right of the screen
* Toggle dialog in situ resizing adjacent content
* Allow content of dialogs to be controlled using frameworks such as angular/react/ember etc.

## Usage

### Create a dialog that slides in from the right hand side using existing html

JavaScript
```javascript
var myDialog = sidler.init({selector: '#myDialog'}, position: 'right', modal: true)
```

HTML

```html
<a onclick="myDialog.show()">show</a>
<div id="myDialog">
  <h1>My Dialog</h1>
  <ul>
    <li>...</.li>
  </ul>
  <a onclick="myDialog.hide()">hide</a>
</div>
```

CSS
```css
.sidler-dialog.right {
  top: 0px;
  height: 100%;
```

### Inline Dialog

JavaScript
```javascript
var myDialog = sidler.init({selector: '#myDialog', position: 'right', modal: false, edge: false})
```

HTML
```html
<a onclick="myDialog.show()">show</a>
<div class="container">
    <div class="content">
    </div>
    <div id="myDialog">
      <h1>My Dialog</h1>
      <ul>
        <li>...</.li>
      </ul>
      <a onclick="myDialog.hide()">hide</a>
    </div>
</div>
```

CSS
```css
  .container {
    display: flex;
    flex-direction: row;
  }
  .content {
    flex: 1000%;
  }

```
