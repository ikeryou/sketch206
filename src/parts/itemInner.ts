
import { Mouse } from "../core/mouse";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Rect } from "../libs/rect";
import { Util } from "../libs/util";


// -----------------------------------------
//
// -----------------------------------------
export class ItemInner extends MyDisplay {

  private _id:number;
  private _posId:number;
  private _mask:HTMLElement;
  private _p:HTMLElement;
  private _size:Rect = new Rect();
  private _total:number = 0;
  private _textTable:Array<String> = 'ABCDEFGHIKLMNOPRSTUVWXYZ0123456789'.split('')

  constructor(opt:any = {}) {
    super(opt)

    this._id = opt.id;
    this._posId = opt.posId;

    this._mask = this.qs('.mask');
    this._p = this.qs('p');
    this._p.innerHTML = (Util.instance.randomArr(this._textTable) as String).toUpperCase();

    Tween.instance.set(this._p, {
      color:'#' + opt.color.getHexString()
    })
  }


  public setSize(width:number, height:number, total:number): void {
    this._size.width = width;
    this._size.height = height;

    this._total = total;

    Tween.instance.set(this.getEl(), {
      width: this._size.width,
      height: this._size.height,
    })

    Tween.instance.set(this._mask, {
      width: this._size.width,
      height: this._size.height,
    })

    Tween.instance.set(this._p, {
      fontSize:this._size.height
    })
  }


  protected _update(): void {
    super._update();

    let mx = Mouse.instance.easeNormal.x;
    mx *= 1.5

    if(this._c % 1 == 0) {
      this._p.innerHTML = (Util.instance.randomArr(this._textTable) as String).toUpperCase();
    }

    const it = 1 / (this._total)
    let min = this._id * it;
    let max = min + it;

    min = min * 2 - 1
    max = max * 2 - 1

    let dist = Util.instance.map(mx, -this._size.width, this._size.width, min, max);

    if(this._posId == 0) {
      Tween.instance.set(this.getEl(), {
        x:dist
      });
      Tween.instance.set(this._mask, {
        x:dist * -1
      })
    }

    if(this._posId == 1) {
      Tween.instance.set(this.getEl(), {
        y:dist
      });
      Tween.instance.set(this._mask, {
        y:dist * -1
      })
    }

    if(this._posId == 2) {
      Tween.instance.set(this.getEl(), {
        x:dist * -1
      });
      Tween.instance.set(this._mask, {
        x:dist
      })
    }

    if(this._posId == 3) {
      Tween.instance.set(this.getEl(), {
        y:dist * -1
      });
      Tween.instance.set(this._mask, {
        y:dist
      })
    }
  }


}