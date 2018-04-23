import { Component, Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'code-base-info',
    template:
    `
        <div class="box-body">                
            <table class="table table-bordered">
                <thead>
                    <tr role="row">
                        <th class="text-center col-sm-4" style="vertical-align:middle;background-color: #f9f9f9;">코드번호</th>
                        <th class="text-center col-sm-4" style="vertical-align:middle;background-color: #f9f9f9;">코드명</th>
                        <th class="text-center col-sm-4" style="vertical-align:middle;background-color: #f9f9f9;">사용여부</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center col-sm-4" style="vertical-align:middle;">{{codeItem.codeId}}</td>
                        <td class="text-center col-sm-4" style="vertical-align:middle;">{{codeItem.codeName}}</td>
                        <td class="text-center col-sm-4" style="vertical-align:middle;" *ngIf="codeItem.displayYn == 'Y'">사용</td>
                        <td class="text-center col-sm-4" style="vertical-align:middle;" *ngIf="codeItem.displayYn == 'N'">미사용</td>                            
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class CodeBaseInfoTable{
    @Input()
    codeItem: any;
}