import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'M09';

  constructor() { }

  //功能名稱
  titleLast = '代結匯查詢/執行/沖正'

  //控管頁面顯示
  showWhichPage = 0

  //控管下一步功能
  nextStep = '';

  //依傳入指示顯示下一步行為
  buttonActionNext(event: { action: string; exgcId: string }) {
    this.sendDetailData = this.dataList.find(element => element.exgcId == event.exgcId);
    this.showWhichPage = 1;
    this.nextStep = event.action;
  }

  //傳出使用者點選的明細資料
  sendDetailData: any;

  //回到主頁(包含取消、返回)
  backToAllDataPage() {
    this.showWhichPage = 0;
  }

  //沖正 - 刪除該筆資料並顯示查詢頁
  reverseAndDelateData(exgcId: string) {
    const index = this.dataList.findIndex(obj => obj.exgcId === exgcId)
    if (index > -1) {
      this.dataList.splice(index, 1);
    }

    this.showWhichPage = 0;
  }

  //執行 - 更新該筆資料並顯示查詢頁
  executeAndUpdateDate(event: any) {
    const objIndex = this.dataList.findIndex(obj => obj.exgcId == event.exgcId);

    this.dataList[objIndex].mgnExgt = event.mgnExgt;
    this.dataList[objIndex].exgcStatus = event.exgcStatus;

    console.log(this.dataList[objIndex])

    this.showWhichPage = 0;
  }

  //重置資料
  dataReset() {
    this.dataList = [
      {
        exgcId: 'EXG20210303100729973',
        exgcITime: '2021-03-03 17:54:05.0190000',
        exgcCmNo: '8220000',
        exgcCmName: '台新銀行',
        exgcSettAccNo: '000001X',
        exgcSettName: '古亭結算帳戶',
        exgcAccType: 'C',
        exgcSCcy: 'USD',
        exgcTAmt: 100.10,
        exgcOCcy: 'TWD',
        exgcStatus: '0',
        exgTStatus: '',
        mgnExgt: {
          exgtId: "EXG20220602101657460",
          exgtCmNo: "8220000",
          exgtCmName: "中國信託商業銀行",
          exgtAccNo: "000001X",
          exgtAccName: "1國泰信託商業銀行",
          exgtApplyIbankNo: "822",
          exgtApplyIccy: "USD",
          exgtApplyIamt: 1.0000,
          exgtApplyObankNo: "822",
          exgtApplyOccy: "TWD",
          exgtApplyOamt: 1.0000,
          exgtEx1Rate: 1.000000,
          exgtEx2Rate: 1.000000,
          exgtStatus: "0",
          exgtFailReason: null
        }
      },
      {
        exgcId: 'EXG20210404100729974',
        exgcITime: '2021-04-04 17:54:05.0190000',
        exgcCmNo: '0070000',
        exgcCmName: '彰化銀行',
        exgcSettAccNo: '000002X',
        exgcSettName: '公館結算帳戶',
        exgcAccType: 'D',
        exgcSCcy: 'TWD',
        exgcTAmt: 200.00,
        exgcOCcy: 'USD',
        exgcStatus: '1',
        exgTStatus: '',
        mgnExgt: null
      },
      {
        exgcId: 'EXG20210505100729975',
        exgcITime: '2021-05-05 17:54:05.0190000',
        exgcCmNo: '0040000',
        exgcCmName: '臺灣銀行',
        exgcSettAccNo: '000003X',
        exgcSettName: '北車結算帳戶',
        exgcAccType: 'H',
        exgcSCcy: 'USD',
        exgcTAmt: 300.30,
        exgcOCcy: 'TWD',
        exgcStatus: '0',
        exgTStatus: '',
        mgnExgt: null
      }
    ]
  }

  //預設資料
  public dataList = [
    {
      exgcId: 'EXG20210303100729973',
      exgcITime: '2021-03-03 17:54:05.0190000',
      exgcCmNo: '8220000',
      exgcCmName: '台新銀行',
      exgcSettAccNo: '000001X',
      exgcSettName: '古亭結算帳戶',
      exgcAccType: 'C',
      exgcSCcy: 'USD',
      exgcTAmt: 100.10,
      exgcOCcy: 'TWD',
      exgcStatus: '0',
      exgTStatus: '',
      mgnExgt: {
        exgtId: "EXG20220602101657460",
        exgtCmNo: "8220000",
        exgtCmName: "中國信託商業銀行",
        exgtAccNo: "000001X",
        exgtAccName: "1國泰信託商業銀行",
        exgtApplyIbankNo: "822",
        exgtApplyIccy: "USD",
        exgtApplyIamt: 1.0000,
        exgtApplyObankNo: "822",
        exgtApplyOccy: "TWD",
        exgtApplyOamt: 1.0000,
        exgtEx1Rate: 1.000000,
        exgtEx2Rate: 1.000000,
        exgtStatus: "0",
        exgtFailReason: null
      }
    },
    {
      exgcId: 'EXG20210404100729974',
      exgcITime: '2021-04-04 17:54:05.0190000',
      exgcCmNo: '0070000',
      exgcCmName: '彰化銀行',
      exgcSettAccNo: '000002X',
      exgcSettName: '公館結算帳戶',
      exgcAccType: 'D',
      exgcSCcy: 'TWD',
      exgcTAmt: 200.00,
      exgcOCcy: 'USD',
      exgcStatus: '1',
      exgTStatus: '',
      mgnExgt: null
    },
    {
      exgcId: 'EXG20210505100729975',
      exgcITime: '2021-05-05 17:54:05.0190000',
      exgcCmNo: '0040000',
      exgcCmName: '臺灣銀行',
      exgcSettAccNo: '000003X',
      exgcSettName: '北車結算帳戶',
      exgcAccType: 'H',
      exgcSCcy: 'USD',
      exgcTAmt: 300.30,
      exgcOCcy: 'TWD',
      exgcStatus: '0',
      exgTStatus: '',
      mgnExgt: null
    }
  ]

}


