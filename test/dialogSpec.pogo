builder = require '../lib/dialog'
retry   = require './retry'

describe 'dialog'
  describe 'init'
    it 'is hidden'
      dialog = builder.init()
      retry!
        rect = document.getElementById(dialog.id).getBoundingClientRect()
        expect(rect.top).to.be.lessThan(0)
      
  describe 'show'
    it 'is shown'
      dialog = builder.init({html = '<h1>Show</h1>'})
      dialog.show()
      retry!(timeout: 1500)
        rect = document.getElementById(dialog.id).getBoundingClientRect()
        expect(rect.top).to.be.at.least(0)
        expect(rect.left).to.be.at.least(0)

  describe 'hide'
    it 'is hidden' =>
      self.timeout(5000)
      dialog = builder.init({html = '<h1>hides</h1>'})
      dialog.show()
      retry!(timeout: 1500)
        rect = document.getElementById(dialog.id).getBoundingClientRect()
        expect(rect.top).to.be.at.least(0)
        expect(rect.left).to.be.at.least(0)

      dialog.hide()
      retry!(timeout: 1500)
        rect = document.getElementById(dialog.id).getBoundingClientRect()
        expect(rect.top).to.be.lessThan(0)

    it 'uses the html provided'
      html = '<h1>hello dialog</h1>'
      dialog = builder.init({html = html})
      dialog.show()
      expect(document.getElementById(dialog.id).innerHTML).to.equal(html)
      
  describe 'top'
    it 'animates from the top'
      html = '<h1>top dialog</h1>'
      dialog = builder.top({html = html})

      retry!
        expect(getComputedStyle(document.getElementById(dialog.id), null).top).to.equal('0px')
        expect(getComputedStyle(document.getElementById(dialog.id), null).position).to.equal('fixed')


  describe 'right'
    it 'animates from the right'
      html = '<h1>right dialog</h1>'
      dialog = builder.right({html = html})

      retry!
        expect(getComputedStyle(document.getElementById(dialog.id), null).right).to.equal('0px')
        expect(getComputedStyle(document.getElementById(dialog.id), null).position).to.equal('fixed')

  describe 'left'
    it 'animates from the left'
      html = '<h1>left dialog</h1>'
      dialog = builder.left({html = html})

      retry!
        expect(getComputedStyle(document.getElementById(dialog.id), null).left).to.equal('0px')
        expect(getComputedStyle(document.getElementById(dialog.id), null).position).to.equal('fixed')


  describe 'bottom'
    it 'animates from the bottom'
      html = '<h1>bottom dialog</h1>'
      dialog = builder.bottom({html = html})

      retry!
        expect(getComputedStyle(document.getElementById(dialog.id), null).bottom).to.equal('0px')
        expect(getComputedStyle(document.getElementById(dialog.id), null).position).to.equal('fixed')
