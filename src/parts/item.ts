
import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { ItemInner } from "./itemInner";
import { Color } from "three/src/math/Color";
import { Util } from "../libs/util";
import { HSL } from "../libs/hsl";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _inner:Array<ItemInner> = [];
  private _colors:Array<Color> = [];

  constructor(opt:{el:HTMLElement; id:number}) {
    super(opt)

    this._c = Util.instance.randomInt(0, 360)

    this._makeColors();

    const num = this.qsAll('.inner').length
    this.qsAll('.inner').forEach((val,i) => {

      const hsl = new HSL()
      hsl.s = 1
      hsl.l = 0.5
      hsl.h = ((360 / num) * i)
      hsl.h += opt.id * 30
      hsl.h = hsl.h % 360;

      const color = new Color()
      color.setHSL(hsl.h / 360, hsl.s, hsl.l)


      this._inner.push(new ItemInner({
        el:val,
        id:i,
        posId:(i + opt.id) % num,
        // color:this._colors[i],
        color:color,
        text:['A','B','C','D','E'][opt.id]
      }))
    })

    this._resize();
  }


  //
  // ------------------------------------
  private _makeColors():void {
    this._colors = []

    const colA = new Color(Util.instance.random(0, 1), Util.instance.random(0, 1), Util.instance.random(0, 1))
    const colB = new Color(Util.instance.random(0, 1), Util.instance.random(0, 1), Util.instance.random(0, 1))
    const colC = new Color(Util.instance.random(0, 1), Util.instance.random(0, 1), Util.instance.random(0, 1))

    for(let i = 0; i < 100; i++) {
      const colD = colA.clone()
      this._colors.push(colD.lerp(colB, Util.instance.random(0, 1)))

      const colE = colB.clone()
      this._colors.push(colE.lerp(colC, Util.instance.random(0, 1)))

      const colF = colC.clone()
      this._colors.push(colF.lerp(colA, Util.instance.random(0, 1)))
    }

    Util.instance.shuffle(this._colors);
  }




  protected _update(): void {
    super._update();

    const radian = Util.instance.radian(this._c * 2);
    const range = 5

    Tween.instance.set(this.getEl(), {
      x:Math.sin(radian * 1.052) * range,
      y:Math.cos(radian * -0.87) * range,
      rotationX:Math.sin(radian * -1.252) * range,
      rotationY:Math.cos(radian * 0.752) * range,
    })
  }


  protected _resize(): void {
    super._resize();

    const size = Func.instance.sw() * 0.1;
    this._inner.forEach((val) => {
      val.setSize(size, size, this._inner.length);
    })

    Tween.instance.set(this.getEl(), {
      width: size,
      height: size,
    })
  }


}