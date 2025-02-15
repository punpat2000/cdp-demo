import { Injectable } from '@angular/core';
import { OrderService } from './order.service';
import { file } from '../models/order.model';

@Injectable({providedIn : 'root'})
export class PaymentService {
    constructor(
        private orderService : OrderService
    ){}

    uploadInvoice(orderId:string, invoiceFile:file){
        const updateField = {};
        updateField['payment.invoice'] = invoiceFile;
        this.orderService.updateOrder(orderId,updateField);
    }
    uploadEarnestBankReceipt(orderId:string, receiptFile:file){
        const updateField = {};
        updateField['payment.bankTransferReceiptEarnest'] = receiptFile;
        updateField['payment.bankTransferReceiptEarnestConfirmed'] = false;
        this.orderService.updateOrder(orderId,updateField);
    }
    uploadFullBankReceipt(orderId:string, receiptFile:file){
        const updateField ={};
        updateField['payment.bankTransferReceiptFull'] = receiptFile;
        updateField['payment.bankTransferReceiptFullConfirmed'] = false;
        this.orderService.updateOrder(orderId, updateField);
    }
    uploadReceipt(orderId:string, receiptFile:file){
        const updateField ={};
        updateField['payment.receipt'] = receiptFile;
        updateField['payment.receiptConfirmed'] = false;
        this.orderService.updateOrder(orderId, updateField);
    }
}