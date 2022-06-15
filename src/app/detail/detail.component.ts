import { Component, OnInit, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {

    this.setFormData(this.nextStep);

    this.exgtForm = this.setFormStatus(this.nextStep, this.exgtForm);

    //依exgtApplyOamt改變動態調整exgtEx1Rate和exgtEx2Rate值
    this.exgtForm.get("exgtApplyOamt")?.valueChanges.subscribe(selectedValue => {
      const applyIAmt = this.exgtForm.get("exgtApplyIamt")?.value;
        this.exgtForm.get("exgtEx1Rate")?.setValue(applyIAmt/selectedValue);
        this.exgtForm.get("exgtEx2Rate")?.setValue(selectedValue/applyIAmt);
    })

  }

  exgtForm = this.createForm();

  /**創建新表單 */
  private createForm() {
    return this.fb.group({
      exgcId: '',
      exgcCmNoAndName: '',
      exgcSettAccNoAndName: '',
      exgtApplyIbankNo: '',
      exgtApplyIccy: '',
      exgtApplyIamt: '',
      exgtApplyObankNo: '',
      exgtApplyOccy: '',
      exgtApplyOamt: '',
      exgtEx1Rate: '',
      exgtEx2Rate: '',
    });
  }

  private setFormData(action: string) {
    if (action == 'execute') {
      this.exgtForm.patchValue({
        exgcId: this.sendDetailData.exgcId,
        exgcCmNoAndName: this.sendDetailData.exgcCmNo + '' + this.sendDetailData.exgcCmName,
        exgcSettAccNoAndName: this.sendDetailData.exgcSettAccNo + '' + this.sendDetailData.exgcSettName,
        exgtApplyIbankNo: '',
        exgtApplyIccy: this.sendDetailData.exgcSCcy,
        exgtApplyIamt: this.sendDetailData.exgcTAmt,
        exgtApplyObankNo: '',
        exgtApplyOccy: this.sendDetailData.exgcOCcy,
      });
    }
    else {
      this.exgtForm.patchValue({
        exgcId: this.sendDetailData.exgcId,
        exgcCmNoAndName: this.sendDetailData.exgcCmNo + '' + this.sendDetailData.exgcCmName,
        exgcSettAccNoAndName: this.sendDetailData.exgcSettAccNo + '' + this.sendDetailData.exgcSettName,
        exgtApplyIbankNo: this.sendDetailData.mgnExgt.exgtApplyIbankNo,
        exgtApplyIccy: this.sendDetailData.mgnExgt.exgtApplyIccy,
        exgtApplyIamt: this.sendDetailData.mgnExgt.exgtApplyIamt,
        exgtApplyObankNo: this.sendDetailData.mgnExgt.exgtApplyObankNo,
        exgtApplyOccy: this.sendDetailData.mgnExgt.exgtApplyOccy,
        exgtApplyOamt: this.sendDetailData.mgnExgt.exgtApplyOamt,
        exgtEx1Rate: this.sendDetailData.mgnExgt.exgtEx1Rate,
        exgtEx2Rate: this.sendDetailData.mgnExgt.exgtEx2Rate
      });
    }
  }

  /** 設定是否disable */
  private setFormStatus(action: string, form: FormGroup) {
    // [執行]部分欄位反灰
    if (action == 'execute') {
      const ctrls = form.controls;
      ctrls['exgcId'].disable();
      ctrls['exgcCmNoAndName'].disable();
      ctrls['exgcSettAccNoAndName'].disable();
      ctrls['exgtApplyIccy'].disable();
      ctrls['exgtApplyIamt'].disable();
      ctrls['exgtApplyOccy'].disable();
      ctrls['exgtEx1Rate'].disable();
      ctrls['exgtEx2Rate'].disable();

      // [明細]、[沖正]全部欄位反灰
    } else {
      form.disable();
    }
    return form;
  }

  //父元件傳入單筆資料
  @Input()
  sendDetailData: any;

  //父元件傳入頁面狀態
  @Input()
  nextStep = '';

  //返回總查詢頁面
  @Output()
  backToAllDataPageEmit = new EventEmitter<any>();

  backToAllData() {
    this.backToAllDataPageEmit.emit();
  }

  //沖正回傳Id至父元件刪除
  @Output()
  reverseBackToAllEmit = new EventEmitter<any>();

  reverseBackToAll(exgcId: string) {
    this.reverseBackToAllEmit.emit(exgcId);
  }

  //執行回傳更新資料至父元件儲存
  @Output()
  executeBackToAllEmit = new EventEmitter<any>();
  executeBackToAll() {
    const ctrls = this.exgtForm.controls;

    this.sendDetailData.mgnExgt = {
      exgtApplyIbankNo : ctrls['exgtApplyIbankNo'].value,
      exgtApplyObankNo : ctrls['exgtApplyObankNo'].value,
      exgtApplyOamt : ctrls['exgtApplyOamt'].value,
      exgtEx1Rate : ctrls['exgtEx1Rate'].value,
      exgtEx2Rate : ctrls['exgtEx2Rate'].value,
      exgtApplyIccy : ctrls['exgtApplyIccy'].value,
      exgtApplyIamt : ctrls['exgtApplyIamt'].value,
      exgtApplyOccy :  ctrls['exgtApplyOccy'].value,
      exgtStatus : '0'
    }

    this.sendDetailData.exgcStatus = '0';

    this.executeBackToAllEmit.emit(this.sendDetailData);
  }

  //預設銀行資料
  public bankList = [
    { kacBankName: "中國信託銀行", kacBankNo: "822" },
    { kacBankName: "台新銀行", kacBankNo: "812" },
    { kacBankName: "郵局", kacBankNo: "700" }
  ]

}
