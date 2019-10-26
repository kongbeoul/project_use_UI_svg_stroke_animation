function hasJqueryObject($elem) { return $elem.length > 0 }

var app = app || {};

app.brandA = {
  line: {
    init: function() {
      var _this = this;
      this.mainVisualClass = '.mainVisual'
      this.lineClass = "#Line";
      this.smileClass = '#smile';
      this.iconSmileClass = '.ico01';
      this.iconDonutClass = '.ico02';
      this.visualTxtWrapClass = '.visualTxtWrap'

      this.$mainVisual = app.$body.find(this.mainVisualClass);

      this.$line = app.$body.find(this.lineClass);
      this.$smile = app.$body.find(this.smileClass)

      this.$iconSmile = app.$body.find(this.iconSmileClass);
      this.$iconDonut = app.$body.find(this.iconDonutClass);
      this.$visualTxtWrap = app.$body.find(this.visualTxtWrapClass);

      var tl = new TimelineMax();

      var totalLen = this.$line.get(0).getTotalLength();
      var smileTotalLen = this.$smile.get(0).getTotalLength() 

      var props = {
        max: 0,
        min: 0
      }

      var strokeDasharray = [totalLen * ((props.max - props.min) / 100), totalLen].join(' ');
      var strokeDashoffset = totalLen * (props.min / 100);
      TweenMax.set(this.$line, { strokeDasharray: strokeDasharray, strokeDashoffset: - strokeDashoffset })
      TweenMax.set(this.$smile, { strokeDasharray: '0 ' + smileTotalLen, strokeDashoffset: 0, opacity: 0 })

      tl.fromTo(this.$mainVisual.find(".bg > img"), 2, { scale: 1.2 }, { scale: 1, ease: Linear.easeNone })
      .to(props, 4, { max: 100, roundProps:'max', ease: Linear.easeNone, onUpdate: function() {
        var strokeDasharray = [totalLen * ((props.max - props.min) / 100), totalLen].join(' ');
        var strokeDashoffset = totalLen * (props.min / 100);
        TweenMax.set(_this.$line, { strokeDasharray: strokeDasharray, strokeDashoffset: - strokeDashoffset })
      }}, "1")
      .to(props, 4, { min: 100, roundProps:'min', ease: Linear.easeNone, onUpdate: function(){
        var strokeDasharray = [totalLen * ((props.max - props.min) / 100), totalLen].join(' ');
        var strokeDashoffset = totalLen * (props.min / 100);
        TweenMax.set(_this.$line, { strokeDasharray: strokeDasharray, strokeDashoffset: -strokeDashoffset })
      }}, "2") 
      .to(this.$smile , 1, { opacity:1, strokeDashoffset: 0, strokeDasharray:smileTotalLen, ease: Linear.easeNone}, "2.7")
      .to(this.$iconSmile, 1, { opacity:1, ease: Linear.easeNone }, "3")
      .set(this.$iconSmile, { display: 'none'}, "4")
      .set(this.$iconDonut, { display: 'block' }, "4")
      .set(this.$iconDonut, { display: 'none' }, "6")
      .set(this.$visualTxtWrap, { display: "block" }, "6")
      .to(this.$visualTxtWrap.find("> p"), .45, { opacity: 1, ease: Linear.easeNone }, "6");

      console.log(tl.totalDuration())
    },
  }, 
}



$(function(){
  app.$window = $(window);
  app.$body = $("body");
  app.$header = $("#header");
  app.$dim = $(".dim");
  hasJqueryObject(app.$body.find("#Line")) && app.brandA.line.init();

})
