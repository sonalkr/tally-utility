import { Injectable } from '@nestjs/common';
import { Message } from '@tally-utility/api-interfaces';
import { randomUUID } from 'crypto';
import { DataFrame } from 'danfojs-node';
import { writeFile } from 'fs';
import { readFile, utils } from 'xlsx';
import path = require('path');
import { upload_dirpath } from './global.config';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
  async convertJournal(file: Express.Multer.File): Promise<Message> {
    const file_path = path.join(
      '/tmp/tally_utility',
      file.path.split('/').slice(-1)[0]
    );
    let file_name = '';
    let result = '';
    result += `
    <ENVELOPE>
        <HEADER>
            <TALLYREQUEST>Import Data</TALLYREQUEST>
        </HEADER>
        <BODY>
            <IMPORTDATA>
                <REQUESTDESC>
                    <REPORTNAME>Vouchers</REPORTNAME>
                    <STATICVARIABLES>
                        <SVCURRENTCOMPANY>0000010928</SVCURRENTCOMPANY>
                    </STATICVARIABLES>
                </REQUESTDESC>
                <REQUESTDATA>
    `;

    const df = new DataFrame(this.excelToJson(file_path));
    df.head().print();
    console.log(df.columns);
    console.log(df.size);
    console.log('convert service');
    for (const i of df.index) {
      const u4 = randomUUID();
      const new_df = df.iloc({ rows: [i] });
      const date = this.ExcelDateToJSDate(new_df['date'].$data[0]);
      const account_dr = new_df['account_dr'].$data[0];
      const account_cr = new_df['account_cr'].$data[0];
      const amount = new_df['amount'].$data[0];
      const voucher = new_df['voucher'].$data[0];
      const narration = new_df['narration'].$data[0];
      let _date = '';
      const year = date.getFullYear();
      const month =
        date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

      _date = String(year) + String(month) + String(day);

      // console.log(date, account_dr, account_cr, amount, voucher, narration);
      result += `
        <TALLYMESSAGE>
            <VOUCHER REMOTEID="${u4}" VCHTYPE="${voucher}" ACTION="Create">
                <DATE>${_date}</DATE>
                <GUID>${u4}</GUID>
                <VOUCHERTYPENAME>${voucher}</VOUCHERTYPENAME>
                <NARRATION>${narration}</NARRATION>
                <ALLLEDGERENTRIES.LIST>
                    <LEDGERNAME>${account_dr}</LEDGERNAME>
                    <GSTCLASS/>
                    <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
                    <LEDGERFROMITEM>No</LEDGERFROMITEM>
                    <REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>
                    <ISPARTYLEDGER>No</ISPARTYLEDGER>
                    <ISLASTDEEMEDPOSITIVE>Yes</ISLASTDEEMEDPOSITIVE>
                    <ISCAPVATTAXALTERED>No</ISCAPVATTAXALTERED>
                    <ISCAPVATNOTCLAIMED>No</ISCAPVATNOTCLAIMED>
                    <AMOUNT>-${amount}</AMOUNT>
                    <VATEXPAMOUNT>-${amount}</VATEXPAMOUNT>
                </ALLLEDGERENTRIES.LIST>
                <ALLLEDGERENTRIES.LIST>
                    <LEDGERNAME>${account_cr}</LEDGERNAME>
                    <GSTCLASS/>
                    <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
                    <LEDGERFROMITEM>No</LEDGERFROMITEM>
                    <REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>
                    <ISPARTYLEDGER>no</ISPARTYLEDGER>
                    <ISLASTDEEMEDPOSITIVE>no</ISLASTDEEMEDPOSITIVE>
                    <ISCAPVATTAXALTERED>No</ISCAPVATTAXALTERED>
                    <ISCAPVATNOTCLAIMED>No</ISCAPVATNOTCLAIMED>
                    <AMOUNT>${amount}</AMOUNT>
                    <VATEXPAMOUNT>${amount}</VATEXPAMOUNT>
                </ALLLEDGERENTRIES.LIST>
            </VOUCHER>
        </TALLYMESSAGE>
        `;
    }

    result += `
                  </REQUESTDATA>
              </IMPORTDATA>
          </BODY>
      </ENVELOPE>
      `;

    file_name = randomUUID() + '.xml';
    await writeFile(
      path.join(upload_dirpath, file_name),
      // path.join(dirpath, 'r_data', file_name),
      result,
      (err) => {
        if (err) {
          console.log('unable to create file');
          return { message: 'unable to create file' };
        } else {
          console.log(file_name);
          return { message: file_name };
        }
      }
    );
    // return { message: 'error occur' };
    return { message: file_name };
  }

  async convertPayment(file: Express.Multer.File): Promise<Message> {
    const file_path = this.getFilePath(file);

    let file_name = '';
    let result = '';
    result += `
    <ENVELOPE>
        <HEADER>
            <TALLYREQUEST>Import Data</TALLYREQUEST>
        </HEADER>
        <BODY>
            <IMPORTDATA>
                <REQUESTDESC>
                    <REPORTNAME>Vouchers</REPORTNAME>
                    <STATICVARIABLES>
                        <SVCURRENTCOMPANY>0000010928</SVCURRENTCOMPANY>
                    </STATICVARIABLES>
                </REQUESTDESC>
                <REQUESTDATA>
    `;

    const df = new DataFrame(this.excelToJson(file_path));
    df.head().print();
    console.log(df.columns);
    console.log(df.size);
    console.log('convert service');
    for (const i of df.index) {
      const u4 = randomUUID();
      const new_df = df.iloc({ rows: [i] });
      const date = this.ExcelDateToJSDate(new_df['date'].$data[0]);
      const account_name = new_df['account_name'].$data[0];
      const party = new_df['party'].$data[0];
      const amount = new_df['amount'].$data[0];
      const voucher = new_df['voucher'].$data[0];
      const narration = new_df['narration'].$data[0];
      let _date = '';
      const year = date.getFullYear();
      const month =
        date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

      _date = String(year) + String(month) + String(day);

      // console.log(date, account_name, party, amount, voucher, narration);
      result += `
        <TALLYMESSAGE>
            <VOUCHER REMOTEID="${u4}" VCHTYPE="${voucher}" ACTION="Create">
                <DATE>${_date}</DATE>
                <GUID>${u4}</GUID>
                <VOUCHERTYPENAME>${voucher}</VOUCHERTYPENAME>
                <NARRATION>${narration}</NARRATION>
                <PARTYLEDGERNAME>${party}</PARTYLEDGERNAME>
                <ALLLEDGERENTRIES.LIST>
                    <LEDGERNAME>${party}</LEDGERNAME>
                    <GSTCLASS/>
                    <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
                    <LEDGERFROMITEM>No</LEDGERFROMITEM>
                    <REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>
                    <ISPARTYLEDGER>No</ISPARTYLEDGER>
                    <ISLASTDEEMEDPOSITIVE>Yes</ISLASTDEEMEDPOSITIVE>
                    <ISCAPVATTAXALTERED>No</ISCAPVATTAXALTERED>
                    <ISCAPVATNOTCLAIMED>No</ISCAPVATNOTCLAIMED>
                    <AMOUNT>-${amount}</AMOUNT>
                    <VATEXPAMOUNT>-${amount}</VATEXPAMOUNT>
                </ALLLEDGERENTRIES.LIST>
                <ALLLEDGERENTRIES.LIST>
                    <LEDGERNAME>${account_name}</LEDGERNAME>
                    <GSTCLASS/>
                    <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
                    <LEDGERFROMITEM>No</LEDGERFROMITEM>
                    <REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>
                    <ISPARTYLEDGER>no</ISPARTYLEDGER>
                    <ISLASTDEEMEDPOSITIVE>no</ISLASTDEEMEDPOSITIVE>
                    <ISCAPVATTAXALTERED>No</ISCAPVATTAXALTERED>
                    <ISCAPVATNOTCLAIMED>No</ISCAPVATNOTCLAIMED>
                    <AMOUNT>${amount}</AMOUNT>
                    <VATEXPAMOUNT>${amount}</VATEXPAMOUNT>
                </ALLLEDGERENTRIES.LIST>
            </VOUCHER>
        </TALLYMESSAGE>
        `;
    }

    result += `
                  </REQUESTDATA>
              </IMPORTDATA>
          </BODY>
      </ENVELOPE>
      `;

    file_name = randomUUID() + '.xml';
    await writeFile(
      path.join(upload_dirpath, file_name),
      // path.join(dirpath, 'r_data', file_name),
      result,
      (err) => {
        if (err) {
          console.log('unable to create file');
          return { message: 'unable to create file' };
        } else {
          console.log(file_name);
          return { message: file_name };
        }
      }
    );
    // return { message: 'error occur' };
    return { message: file_name };
  }
  async convertReceipt(file: Express.Multer.File): Promise<Message> {
    const file_path = this.getFilePath(file);
    let file_name = '';
    let result = '';
    result += `
    <ENVELOPE>
        <HEADER>
            <TALLYREQUEST>Import Data</TALLYREQUEST>
        </HEADER>
        <BODY>
            <IMPORTDATA>
                <REQUESTDESC>
                    <REPORTNAME>Vouchers</REPORTNAME>
                    <STATICVARIABLES>
                        <SVCURRENTCOMPANY>0000010928</SVCURRENTCOMPANY>
                    </STATICVARIABLES>
                </REQUESTDESC>
                <REQUESTDATA>
    `;

    const df = new DataFrame(this.excelToJson(file_path));
    df.head().print();
    console.log(df.columns);
    console.log(df.size);
    console.log('convert service');
    for (const i of df.index) {
      const u4 = randomUUID();
      const new_df = df.iloc({ rows: [i] });
      const date = this.ExcelDateToJSDate(new_df['date'].$data[0]);
      const account_name = new_df['account_name'].$data[0];
      const party = new_df['party'].$data[0];
      const amount = new_df['amount'].$data[0];
      const voucher = new_df['voucher'].$data[0];
      const narration = new_df['narration'].$data[0];
      let _date = '';
      const year = date.getFullYear();
      const month =
        date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

      _date = String(year) + String(month) + String(day);

      // console.log(date, account_name, party, amount, voucher, narration);
      result += `
        <TALLYMESSAGE>
            <VOUCHER REMOTEID="${u4}" VCHTYPE="${voucher}" ACTION="Create">
                <DATE>${_date}</DATE>
                <GUID>${u4}</GUID>
                <VOUCHERTYPENAME>${voucher}</VOUCHERTYPENAME>
                <PARTYLEDGERNAME>${party}</PARTYLEDGERNAME>
                <NARRATION>${narration}</NARRATION>
                <ALLLEDGERENTRIES.LIST>
                    <LEDGERNAME>${party}</LEDGERNAME>
                    <GSTCLASS/>
                    <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
                    <LEDGERFROMITEM>No</LEDGERFROMITEM>
                    <REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>
                    <ISPARTYLEDGER>no</ISPARTYLEDGER>
                    <ISLASTDEEMEDPOSITIVE>no</ISLASTDEEMEDPOSITIVE>
                    <ISCAPVATTAXALTERED>No</ISCAPVATTAXALTERED>
                    <ISCAPVATNOTCLAIMED>No</ISCAPVATNOTCLAIMED>
                    <AMOUNT>${amount}</AMOUNT>
                    <VATEXPAMOUNT>${amount}</VATEXPAMOUNT>
                </ALLLEDGERENTRIES.LIST>
                <ALLLEDGERENTRIES.LIST>
                    <LEDGERNAME>${account_name}</LEDGERNAME>
                    <GSTCLASS/>
                    <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
                    <LEDGERFROMITEM>No</LEDGERFROMITEM>
                    <REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>
                    <ISPARTYLEDGER>No</ISPARTYLEDGER>
                    <ISLASTDEEMEDPOSITIVE>Yes</ISLASTDEEMEDPOSITIVE>
                    <ISCAPVATTAXALTERED>No</ISCAPVATTAXALTERED>
                    <ISCAPVATNOTCLAIMED>No</ISCAPVATNOTCLAIMED>
                    <AMOUNT>-${amount}</AMOUNT>
                    <VATEXPAMOUNT>-${amount}</VATEXPAMOUNT>
                </ALLLEDGERENTRIES.LIST>
            </VOUCHER>
        </TALLYMESSAGE>
        `;
    }

    result += `
                  </REQUESTDATA>
              </IMPORTDATA>
          </BODY>
      </ENVELOPE>
      `;

    file_name = randomUUID() + '.xml';
    await writeFile(
      path.join(upload_dirpath, file_name),
      // path.join(dirpath, 'r_data', file_name),
      result,
      (err) => {
        if (err) {
          console.log('unable to create file');
          return { message: 'unable to create file' };
        } else {
          console.log(file_name);
          return { message: file_name };
        }
      }
    );
    // return { message: 'error occur' };
    return { message: file_name };
  }
  async convertSale(file: Express.Multer.File): Promise<Message> {
    const file_path = this.getFilePath(file);
    let file_name = '';
    let result = '';
    result += `
    <ENVELOPE>
        <HEADER>
            <TALLYREQUEST>Import Data</TALLYREQUEST>
        </HEADER>
        <BODY>
            <IMPORTDATA>
                <REQUESTDESC>
                    <REPORTNAME>Vouchers</REPORTNAME>
                    <STATICVARIABLES>
                        <SVCURRENTCOMPANY>0000010928</SVCURRENTCOMPANY>
                    </STATICVARIABLES>
                </REQUESTDESC>
                <REQUESTDATA>
    `;

    const df = new DataFrame(this.excelToJson(file_path));

    df.head().print();
    console.log('new');

    let no_of_account = 0;
    let no_of_amount = 0;
    df.columns
      .filter((n) => n.includes('account') || n.includes('amount'))
      .forEach((_name) => {
        if (_name.includes('account_')) no_of_account++;
        if (_name.includes('amount_')) no_of_amount++;
      });
    console.log(no_of_account, no_of_amount);
    if (no_of_account != no_of_amount) {
      console.log('no of accout and amount columns not same');
      return { message: 'no of accout and amount columns not same' };
    }
    for (let i = 1; i <= no_of_account; i++) {
      if (!df.columns.includes(`account_${i}`))
        return { message: `account_${i} not found` };
    }
    for (let i = 1; i <= no_of_amount; i++) {
      if (!df.columns.includes(`amount_${i}`))
        return { message: `amount_${i} not found` };
    }
    console.log(df.columns);
    console.log(df.size);
    console.log('convert service');
    interface accountListI {
      account: string;
      amount: number;
    }
    for (const i of df.index) {
      const account_lists: accountListI[] = [];
      const u4 = randomUUID();
      const new_df = df.iloc({ rows: [i] });
      const date = this.ExcelDateToJSDate(new_df['date'].$data[0]);
      const debtor = new_df['debtor'].$data[0];
      const invoice_no = new_df['invoice_no'].$data[0];
      const voucher = new_df['voucher'].$data[0];
      const narration = new_df['narration'].$data[0];
      const total_amount = new_df['total_amount'].$data[0];
      const _date = this.dateStringfy(date);
      for (let k = 1; k <= no_of_account; k++) {
        if (new_df[`account_${k}`].$data[0] != null) {
          const account = new_df[`account_${k}`].$data[0];
          const amount = new_df[`amount_${k}`].$data[0];
          account_lists.push({ account: account, amount: amount });
        }
      }
      let account_list_xml = '';
      account_lists.forEach((account) => {
        account_list_xml =
          account_list_xml +
          `
              <ALLLEDGERENTRIES.LIST>
                  <LEDGERNAME>${account.account}</LEDGERNAME>
                  <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
                  <LEDGERFROMITEM>No</LEDGERFROMITEM>
                  <ISPARTYLEDGER>No</ISPARTYLEDGER>
                  <AMOUNT>${account.amount}</AMOUNT>
              </ALLLEDGERENTRIES.LIST>
            `;
      });
      result += `
        <TALLYMESSAGE>
          <VOUCHER REMOTEID="${u4}" VCHTYPE="${voucher}" ACTION="Create">
            <GUID>${u4}</GUID>
            <DATE>${_date}</DATE>
            <VOUCHERNUMBER>${invoice_no}</VOUCHERNUMBER>
            <VOUCHERTYPENAME>${voucher}</VOUCHERTYPENAME>
            <PARTYLEDGERNAME>${debtor}</PARTYLEDGERNAME>
            <NARRATION>${narration}</NARRATION>
              <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>${debtor}</LEDGERNAME>
              <GSTCLASS/>
              <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
              <LEDGERFROMITEM>No</LEDGERFROMITEM>
              <REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>
              <ISPARTYLEDGER>Yes</ISPARTYLEDGER>
              <AMOUNT>-${total_amount}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>
            ${account_list_xml}
          </VOUCHER>
        </TALLYMESSAGE>
        `;
    }

    result += `
                  </REQUESTDATA>
              </IMPORTDATA>
          </BODY>
      </ENVELOPE>
      `;

    file_name = randomUUID() + '.xml';
    console.log('ok');
    console.log(file_name);
    await writeFile(
      path.join(upload_dirpath, file_name),
      // path.join(dirpath, 'r_data', file_name),
      result,
      (err) => {
        if (err) {
          console.log('unable to create file');
          return { message: 'unable to create file' };
        } else {
          console.log(file_name);
          return { message: file_name };
        }
      }
    );
    // return { message: 'error occur' };
    return { message: file_name };
  }

  async convertPurchase(file: Express.Multer.File): Promise<Message> {
    const file_path = this.getFilePath(file);
    let file_name = '';
    let result = '';
    result += `
    <ENVELOPE>
        <HEADER>
            <TALLYREQUEST>Import Data</TALLYREQUEST>
        </HEADER>
        <BODY>
            <IMPORTDATA>
                <REQUESTDESC>
                    <REPORTNAME>Vouchers</REPORTNAME>
                    <STATICVARIABLES>
                        <SVCURRENTCOMPANY>0000010928</SVCURRENTCOMPANY>
                    </STATICVARIABLES>
                </REQUESTDESC>
                <REQUESTDATA>
    `;

    const df = new DataFrame(this.excelToJson(file_path));

    df.head().print();
    console.log('new');

    let no_of_account = 0;
    let no_of_amount = 0;
    df.columns
      .filter((n) => n.includes('account') || n.includes('amount'))
      .forEach((_name) => {
        if (_name.includes('account_')) no_of_account++;
        if (_name.includes('amount_')) no_of_amount++;
      });
    console.log(no_of_account, no_of_amount);
    if (no_of_account != no_of_amount) {
      console.log('no of accout and amount columns not same');
      return { message: 'no of accout and amount columns not same' };
    }
    for (let i = 1; i <= no_of_account; i++) {
      if (!df.columns.includes(`account_${i}`))
        return { message: `account_${i} not found` };
    }
    for (let i = 1; i <= no_of_amount; i++) {
      if (!df.columns.includes(`amount_${i}`))
        return { message: `amount_${i} not found` };
    }
    console.log(df.columns);
    console.log(df.size);
    console.log('convert service');
    interface accountListI {
      account: string;
      amount: number;
    }
    for (const i of df.index) {
      const account_lists: accountListI[] = [];
      const u4 = randomUUID();
      const new_df = df.iloc({ rows: [i] });
      const date = this.ExcelDateToJSDate(new_df['date'].$data[0]);
      const creditor = new_df['creditor'].$data[0];
      const invoice_no = new_df['invoice_no'].$data[0];
      const voucher = new_df['voucher'].$data[0];
      const narration = new_df['narration'].$data[0];
      const total_amount = new_df['total_amount'].$data[0];
      const _date = this.dateStringfy(date);
      for (let k = 1; k <= no_of_account; k++) {
        if (new_df[`account_${k}`].$data[0] != null) {
          const account = new_df[`account_${k}`].$data[0];
          const amount = new_df[`amount_${k}`].$data[0];
          account_lists.push({ account: account, amount: amount });
        }
      }
      let account_list_xml = '';
      account_lists.forEach((account) => {
        account_list_xml =
          account_list_xml +
          `
              <ALLLEDGERENTRIES.LIST>
                  <LEDGERNAME>${account.account}</LEDGERNAME>
                  <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
                  <LEDGERFROMITEM>No</LEDGERFROMITEM>
                  <ISPARTYLEDGER>No</ISPARTYLEDGER>
                  <AMOUNT>-${account.amount}</AMOUNT>
              </ALLLEDGERENTRIES.LIST>
            `;
      });
      result += `
        <TALLYMESSAGE>
          <VOUCHER REMOTEID="${u4}" VCHTYPE="${voucher}" ACTION="Create">
            <GUID>${u4}</GUID>
            <DATE>${_date}</DATE>
            <REFERENCEDATE>${_date}</REFERENCEDATE>
            <REFERENCE>${invoice_no}</REFERENCE>
            <VOUCHERTYPENAME>${voucher}</VOUCHERTYPENAME>
            <PARTYLEDGERNAME>${creditor}</PARTYLEDGERNAME>
            <NARRATION>${narration}</NARRATION>
              <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>${creditor}</LEDGERNAME>
              <GSTCLASS/>
              <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
              <LEDGERFROMITEM>No</LEDGERFROMITEM>
              <REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>
              <ISPARTYLEDGER>Yes</ISPARTYLEDGER>
              <AMOUNT>${total_amount}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>
            ${account_list_xml}
          </VOUCHER>
        </TALLYMESSAGE>
        `;
    }

    result += `
                  </REQUESTDATA>
              </IMPORTDATA>
          </BODY>
      </ENVELOPE>
      `;

    file_name = randomUUID() + '.xml';
    console.log('ok');
    console.log(file_name);
    await writeFile(
      path.join(upload_dirpath, file_name),
      // path.join(dirpath, 'r_data', file_name),
      result,
      (err) => {
        if (err) {
          console.log('unable to create file');
          return { message: 'unable to create file' };
        } else {
          console.log(file_name);
          return { message: file_name };
        }
      }
    );
    // return { message: 'error occur' };
    return { message: file_name };
  }

  ExcelDateToJSDate(date) {
    return new Date(Math.round((date - 25569) * 86400 * 1000));
  }

  /**
   * return string 'yyyymmdd'
   * @param date Date object
   */
  dateStringfy(date: Date) {
    let _date = '';
    const year = date.getFullYear();
    const month =
      date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    _date = String(year) + String(month) + String(day);
    return _date;
  }

  excelToJson(file_path: string) {
    const ws = readFile(file_path);
    const s = ws.Sheets[ws.SheetNames[0]];
    return utils.sheet_to_json(s, { defval: null });
  }
  getFilePath(file: Express.Multer.File) {
    return path.join(upload_dirpath, file.path.split('/').slice(-1)[0]);
  }
}
