builder = require '../lib/dialog'
retry   = require './retry'

describe 'dialog'
  describe 'init'
    it 'is hidden'
      dialog = builder.init()
      retry!
        rect = document.getElementById(dialog.id).getBoundingClientRect()
        expect(rect.top).to.equal(0)
      
    it 'uses the html provided'
      html = '<h1>hello dialog</h1>'
      dialog = builder.init({html = html})
      dialog.show()
      expect(document.getElementById(dialog.id).innerHTML).to.equal(html)

    describe 'selector option'
      it 'uses html from a provided selector'
        existing = document.createElement 'div'
        existing.innerHTML = '<div id="existing-dialog"><h2>existing dialog</h2></div>'

        document.body.appendChild(existing)
        dialog = builder.init({selector = '#existing-dialog'})
        expect(dialog.el.innerHTML).to.include('existing dialog')
        dialog.show()
        retry!(timeout: 1500)
          rect = document.getElementById(dialog.id).getBoundingClientRect()
          expect(rect.top).to.be.at.least(0)

      it 'preserves the existing elements class names' 
        existing = document.createElement 'div'
        existing.innerHTML = '<div id="existing-dialog2" class="fancy"><h2>existing dialog2</h2></div>'

        document.body.appendChild(existing)
        dialog = builder.init({selector = '#existing-dialog2'})
        expect(dialog.el.classList.contains('fancy')).to.be.true
        dialog.show()
        expect(dialog.el.classList.contains('fancy')).to.be.true
              
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

  describe 'modal'
    it 'hides the dialog when clicking the overlay' =>
      self.timeout(5000)
      html = '<h1>hello dialog</h1>'
      dialog = builder.init({html = html})
      dialog.show()

      retry!(timeout: 1500)
        document.getElementsByClassName('sidler-overlay').0.click()
        retry!(timeout: 1500)
          rect = document.getElementById(dialog.id).getBoundingClientRect()
          expect(rect.top).to.be.lessThan(0)

    it'does not hide the dialog when clicking the dialog' =>
      self.timeout(5000)
      html = '<h1 id="myModal">hello dialog</h1>'
      dialog = builder.init({html = html})
      dialog.show()

      retry!(timeout: 1500)
        document.getElementById('myModal').click()
        retry!(timeout: 1500)
          rect = document.getElementById(dialog.id).getBoundingClientRect()
          expect(rect.top).to.be.at.least(0)
          expect(rect.left).to.be.at.least(0)
