import { Component, Input, OnInit, TemplateRef, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() {
  }

  dataSource: any;

  //表格總共有多少筆資料
  totalCount = 0;

  //表格要顯示哪些
  displayedColumns: string[] = ['exgcId', 'exgcITime', 'exgcCmNoAndName', 'exgcSettAccNoAndName', 'exgcAccType', 'exgcSCcy', 'exgcTAmt', 'exgcOCcy', 'exgcStatus', 'taifexExgtStatus', 'action'];

  //分頁
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {
    //實作分頁須由MatTableDataSource
    this.dataSource = new MatTableDataSource(this.dataList);
    this.totalCount = this.dataList.length;
    this.dataSource.paginator = this.paginator;
  }

  //重製資料時重新new一個MatTableDataSource
  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.dataList);
    this.totalCount = this.dataList.length;
  }

  //父元件傳入資料
  @Input()
  dataList: any;

  //使用者點擊明細 > 回傳所點選id
  @Output()
  buttonActionEmit = new EventEmitter<any>();

  buttonAction(action: string, exgcId: string) {
    this.buttonActionEmit.emit({ action, exgcId });
  }

  accTypeMapping: { [key: string]: string } = accTypeMapping;

  exgStatusConst = exgStatusConst;

}

// 用enum存取常數
enum accTypeMapping {
  'C' = "客戶帳",
  'H' = "自有帳",
  'D' = "違約處理專戶"
}

// 用常數存常數
const exgStatusConst: { [key: number]: string } = {
  0: "申請成功",
  1: "已申請",
  2: "已註銷",
  5: "申請失敗",
  6: "申請中",
  7: "註銷中",
  8: "已沖正",
}

// 自訂型別
// type testType = {
//   exgtId: string,
//   exgcITime: string,
//   exgcCmNo: string,
//   exgcCmName: string,
//   exgcSettAccNo: string,
//   exgcSettName: string,
//   exgcAccType: string,
//   exgcSCcy: string,
//   exgcTAmt: number,
//   exgcOCcy: string,
//   exgcStatus: string,
//   exgTStatus: string,
//   mgnExgt:any
// }



