import {
  Component,
  Injector,
  Directive,
  ElementRef,
  provide,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  SimpleChange
} from '@angular/core';

@Directive({
  selector: 'ons-switch'
})
export class OnsSwitch implements OnChanges, OnDestroy {
  private _element: any;
  private _boundOnChange: Function;

  @Input('value') _value: boolean;
  @Output('valueChange') _valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _elementRef: ElementRef) {
    this._boundOnChange = this._onChange.bind(this);
    this._element = _elementRef.nativeElement;
    this._element.checkbox.addEventListener('change', this._boundOnChange);
  }

  _onChange(event) {
    this._valueChange.emit(this._element.checked);
  }

  ngOnChanges(changeRecord: {[key: string]: SimpleChange;}) {
    const value = !!changeRecord['_value'].currentValue;
    this._element.checked = value;
  }

  get element(): any {
    return this._element;
  }

  ngOnDestroy() {
    this._element.checkbox.removeEventListener('change', this._boundOnChange);
    this._element = null;
  }
}