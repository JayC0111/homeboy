import { generateId, paginateData, filterData } from './index'; //

// 模拟销售单数据数组 - 使用 export 关键字进行命名导出
export const salesOrders = [ // 使用你提供的最新数据
  {
    id: 'so-001',
    orderNo: 'SO-20241001-001',
    customerId: 'customer-001', // Added
    customerName: '北京音像有限公司',
    customerPhone: '13800138000',
    customerAddress: '北京市朝阳区建国路88号',
    totalAmount: 12580.50,
    status: 'DRAFT',  //
    salespersonId: 'user-zhangsan', // Added
    salespersonName: '张三',   // Added
    createdBy: '张三',
    orderTime: '2024-05-15 10:30:00', // Added distinct orderTime
    createTime: '2024-05-15 10:30:45',
    remarks: '测试销售单，请优先处理',
    items: [
      { id: 'soitem-001', productId: 'p-001', productCode: 'PRD-1001', productName: '周杰伦《叶惠美》专辑', specification: 'CD', unit: '张', unitPrice: 68.00, quantity: 100, lineTotal: 6800.00, outboundQuantity: 0 }, //
      { id: 'soitem-002', productId: 'p-002', productCode: 'PRD-1002', productName: '林俊杰《曹操》专辑', specification: 'CD', unit: '张', unitPrice: 58.00, quantity: 100, lineTotal: 5800.00, outboundQuantity: 0 } //
    ]
  },
  {
    id: 'so-002',
    orderNo: 'SO-20241001-002',
    customerId: 'customer-002', // Added
    customerName: '上海唱片销售中心',
    customerPhone: '13900139000',
    customerAddress: '上海市徐汇区天钥桥路333号',
    totalAmount: 23650.00,
    status: 'PENDING_APPROVAL',  //
    salespersonId: 'user-lisi', // Changed from 张三 to 李四 for consistency
    salespersonName: '李四',   // Changed
    createdBy: '李四',       // Changed
    orderTime: '2024-05-16 14:25:00', // Added
    createTime: '2024-05-16 14:25:30',
    remarks: '急件，请尽快处理，客户要求发顺丰',
    items: [
      { id: 'soitem-003', productId: 'p-003', productCode: 'PRD-1003', productName: '薛之谦《绅士》专辑', specification: 'CD+DVD', unit: '套', unitPrice: 88.00, quantity: 150, lineTotal: 13200.00, outboundQuantity: 0 }, //
      { id: 'soitem-004', productId: 'p-004', productCode: 'PRD-1004', productName: '五月天《自传》专辑', specification: '黑胶唱片', unit: '张', unitPrice: 145.00, quantity: 72, lineTotal: 10440.00, outboundQuantity: 0 } //
    ]
  },
  {
    id: generateId('so'), 
    orderNo: `SO-20240520-003`,
    customerId: 'customer-003', 
    customerName: '广州流行前线音像店',
    customerPhone: '13700137001',
    customerAddress: '广州市天河区体育西路101号',
    totalAmount: 9850.00,
    status: 'APPROVED',  //
    salespersonId: 'user-wangwu',
    salespersonName: '王五',
    createdBy: '王五',
    orderTime: '2024-05-20 09:14:00',
    createTime: '2024-05-20 09:15:00',
    remarks: '新客户首单，赠送海报',
    items: [
      { id: generateId('soi'), productId: 'p-005', productCode: 'PRD-1005', productName: '华语经典流行合集', specification: 'U盘装', unit: '个', unitPrice: 129.00, quantity: 50, lineTotal: 6450.00, outboundQuantity: 0 }, //
      { id: generateId('soi'), productId: 'p-001', productCode: 'PRD-1001', productName: '周杰伦《叶惠美》专辑', specification: 'CD', unit: '张', unitPrice: 68.00, quantity: 50, lineTotal: 3400.00, outboundQuantity: 0 } //
    ]
  },
  {
    id: generateId('so'),
    orderNo: `SO-20240519-001`,
    customerId: 'customer-004',
    customerName: '深圳乐迷唱片行',
    totalAmount: 17600.00,
    status: 'SHIPPED',  //
    salespersonId: 'user-zhaoliu',
    salespersonName: '赵六',
    createdBy: '赵六',
    orderTime: '2024-05-19 11:39:00',
    createTime: '2024-05-19 11:40:20',
    customerPhone: '13301330133',
    customerAddress: '深圳市福田区华强北路1001号',
    remarks: '客户指定快递：圆通',
    items: [
      { id: generateId('soi'), productId: 'p-003', productCode: 'PRD-1003', productName: '薛之谦《绅士》专辑', specification: 'CD+DVD', unit: '套', unitPrice: 88.00, quantity: 200, lineTotal: 17600.00, outboundQuantity: 200 } //
    ]
  },
  {
    id: generateId('so'),
    orderNo: `SO-20240518-005`,
    customerId: 'customer-005',
    customerName: '成都乐府唱片',
    totalAmount: 5820.00,
    status: 'COMPLETED',  //
    salespersonId: 'user-sunqi',
    salespersonName: '孙七',
    createdBy: '孙七',
    orderTime: '2024-05-18 16:05:00',
    createTime: '2024-05-18 16:05:55',
    customerPhone: '13500135001',
    customerAddress: '成都市锦江区红星路三段99号',
    remarks: '已签收，用户满意',
    items: [
      { id: generateId('soi'), productId: 'p-002', productCode: 'PRD-1002', productName: '林俊杰《曹操》专辑', specification: 'CD', unit: '张', unitPrice: 58.00, quantity: 60, lineTotal: 3480.00, outboundQuantity: 60 }, //
      { id: generateId('soi'), productId: 'p-004', productCode: 'PRD-1004', productName: '五月天《自传》专辑', specification: '黑胶唱片', unit: '张', unitPrice: 145.00, quantity: 10, lineTotal: 1450.00, outboundQuantity: 10 }, //
      { id: generateId('soi'), productId: 'p-001', productCode: 'PRD-1001', productName: '周杰伦《叶惠美》专辑', specification: 'CD', unit: '张', unitPrice: 68.00, quantity: 10, lineTotal: 680.00, outboundQuantity: 10 }, //
    ]
  },
  {
    id: generateId('so'),
    orderNo: `SO-20240517-010`,
    customerId: 'customer-006',
    customerName: '杭州音乐时空',
    totalAmount: 34000.00,
    status: 'DRAFT',  //
    salespersonId: 'user-zhouba',
    salespersonName: '周八',
    createdBy: '周八',
    orderTime: '2024-05-17 09:55:00',
    createTime: '2024-05-17 10:00:00',
    customerPhone: '13601360136',
    customerAddress: '杭州市西湖区文三路303号',
    remarks: '大客户订单，待确认细节',
    items: [
      { id: generateId('soi'), productId: 'p-001', productCode: 'PRD-1001', productName: '周杰伦《叶惠美》专辑', specification: 'CD', unit: '张', unitPrice: 68.00, quantity: 500, lineTotal: 34000.00, outboundQuantity: 0 } //
    ]
  },
  { 
    id: 'mock-id-009', // Was previously REJECTED in your data
    orderNo: `SO-20240517-009`,
    customerId: 'customer-007',
    customerName: '南京潮流音像',
    totalAmount: 12070.00,
    status: 'DRAFT', // MODIFIED: from REJECTED (as per your requirement)
    salespersonId: 'user-wujiu',
    salespersonName: '吴九',
    createdBy: '吴九',
    orderTime: '2024-05-17 13:10:00',
    createTime: '2024-05-17 13:12:10',
    customerPhone: '13401340134',
    customerAddress: '南京市秦淮区中山南路77号',
    remarks: '客户信息有误，审核打回，请修改后重新提交。', // Updated remark
    items: [
      { id: generateId('soi'), productId: 'p-002', productCode: 'PRD-1002', productName: '林俊杰《曹操》专辑', specification: 'CD', unit: '张', unitPrice: 58.00, quantity: 150, lineTotal: 8700.00, outboundQuantity: 0 }, //
      { id: generateId('soi'), productId: 'p-005', productCode: 'PRD-1005', productName: '华语经典流行合集', specification: 'U盘装', unit: '个', unitPrice: 129.00, quantity: 20, lineTotal: 2580.00, outboundQuantity: 0 }, //
      { id: generateId('soi'), productId: 'p-001', productCode: 'PRD-1001', productName: '周杰伦《叶惠美》专辑', specification: 'CD', unit: '张', unitPrice: 68.00, quantity: 10, lineTotal: 680.00, outboundQuantity: 0 }, //
    ]
  },
  {
    id: generateId('so'),
    orderNo: `SO-20240515-008`,
    customerId: 'customer-008',
    customerName: '武汉知音唱片',
    totalAmount: 6800.00,
    status: 'PENDING_APPROVAL',  //
    salespersonId: 'user-zhengshi',
    salespersonName: '郑十',
    createdBy: '郑十',
    orderTime: '2024-05-15 17:45:00',
    createTime: '2024-05-15 17:50:30',
    customerPhone: '13201320132',
    customerAddress: '武汉市江汉区解放大道555号',
    remarks: '加急订单',
    items: [
      { id: generateId('soi'), productId: 'p-001', productCode: 'PRD-1001', productName: '周杰伦《叶惠美》专辑', specification: 'CD', unit: '张', unitPrice: 68.00, quantity: 100, lineTotal: 6800.00, outboundQuantity: 0 } //
    ]
  },
  {
    id: generateId('so'),
    orderNo: `SO-20240514-002`,
    customerId: 'customer-009',
    customerName: '长沙星城音像',
    totalAmount: 19980.00,
    status: 'PARTIALLY_SHIPPED',  //
    salespersonId: 'user-fengshiyi',
    salespersonName: '冯十一',
    createdBy: '冯十一',
    orderTime: '2024-05-14 10:20:00',
    createTime: '2024-05-14 10:22:15',
    customerPhone: '13101310131',
    customerAddress: '长沙市芙蓉区五一大道222号',
    remarks: '部分商品先发，剩余待补',
    items: [
      { id: generateId('soi'), productId: 'p-004', productCode: 'PRD-1004', productName: '五月天《自传》专辑', specification: '黑胶唱片', unit: '张', unitPrice: 145.00, quantity: 80, lineTotal: 11600.00, outboundQuantity: 80 }, // 假设已发80
      { id: generateId('soi'), productId: 'p-003', productCode: 'PRD-1003', productName: '薛之谦《绅士》专辑', specification: 'CD+DVD', unit: '套', unitPrice: 88.00, quantity: 95, lineTotal: 8380.00, outboundQuantity: 0 } // 待发95
    ]
  },
  {
    id: generateId('so'),
    orderNo: `SO-20240513-001`,
    customerId: 'customer-010',
    customerName: '西安古城回响',
    totalAmount: 4290.00,
    status: 'CANCELLED',  //
    salespersonId: 'user-chenshier',
    salespersonName: '陈十二',
    createdBy: '陈十二',
    orderTime: '2024-05-13 14:55:00',
    createTime: '2024-05-13 15:00:00',
    customerPhone: '13001300130',
    customerAddress: '西安市碑林区南大街88号',
    remarks: '客户取消订单',
    items: [
      { id: generateId('soi'), productId: 'p-005', productCode: 'PRD-1005', productName: '华语经典流行合集', specification: 'U盘装', unit: '个', unitPrice: 129.00, quantity: 30, lineTotal: 3870.00, outboundQuantity: 0 }, //
      { id: generateId('soi'), productId: 'p-002', productCode: 'PRD-1002', productName: '林俊杰《曹操》专辑', specification: 'CD', unit: '张', unitPrice: 58.00, quantity: 5, lineTotal: 290.00, outboundQuantity: 0 }, //
    ]
  },
  {
    id: generateId('so'), // This was so-001's customer again
    orderNo: `SO-20240512-007`,
    customerId: 'customer-001', // Same as so-001
    customerName: '北京音像有限公司', 
    totalAmount: 2760.00,
    status: 'COMPLETED',  //
    salespersonId: 'user-zhangsan',
    salespersonName: '张三',
    createdBy: '张三',
    orderTime: '2024-05-12 11:10:00',
    createTime: '2024-05-12 11:11:11',
    customerPhone: '13800138000',
    customerAddress: '北京市朝阳区建国路88号',
    remarks: '老客户补单，已完成',
    items: [
      { id: generateId('soi'), productId: 'p-002', productCode: 'PRD-1002', productName: '林俊杰《曹操》专辑', specification: 'CD', unit: '张', unitPrice: 58.00, quantity: 40, lineTotal: 2320.00, outboundQuantity: 40 }, //
      { id: generateId('soi'), productId: 'p-001', productCode: 'PRD-1001', productName: '周杰伦《叶惠美》专辑', specification: 'CD', unit: '张', unitPrice: 68.00, quantity: 5, lineTotal: 340.00, outboundQuantity: 5 }, //
    ]
  },
  {
    id: generateId('so'), // This was so-002's customer again
    orderNo: `SO-20240510-004`,
    customerId: 'customer-002', // Same as so-002
    customerName: '上海唱片销售中心', 
    totalAmount: 16880.00,
    status: 'APPROVED',  //
    salespersonId: 'user-lisi',
    salespersonName: '李四',
    createdBy: '李四',
    orderTime: '2024-05-10 18:00:00',
    createTime: '2024-05-10 18:00:45',
    customerPhone: '13900139000',
    customerAddress: '上海市徐汇区天钥桥路333号',
    remarks: '月末大单，准备出库',
    items: [
      { id: generateId('soi'), productId: 'p-003', productCode: 'PRD-1003', productName: '薛之谦《绅士》专辑', specification: 'CD+DVD', unit: '套', unitPrice: 88.00, quantity: 100, lineTotal: 8800.00, outboundQuantity: 0 }, //
      { id: generateId('soi'), productId: 'p-001', productCode: 'PRD-1001', productName: '周杰伦《叶惠美》专辑', specification: 'CD', unit: '张', unitPrice: 68.00, quantity: 100, lineTotal: 6800.00, outboundQuantity: 0 }, //
      { id: generateId('soi'), productId: 'p-002', productCode: 'PRD-1002', productName: '林俊杰《曹操》专辑', specification: 'CD', unit: '张', unitPrice: 58.00, quantity: 20, lineTotal: 1160.00, outboundQuantity: 0 }, //
    ]
  }
];

// 模拟API服务对象
const salesOrdersMock = {
  getSalesOrderList(params) {
    let result = [...salesOrders]; // 操作的是本文件顶部的 salesOrders 数组
    if (params) {
      const filters = {};
      if (params.orderNo) filters.orderNo = params.orderNo;
      if (params.customerName) filters.customerName = params.customerName;
      if (params.status) filters.status = params.status;
      result = filterData(result, filters);
      if (params.startDate && params.endDate) {
        result = result.filter(order => {
          const orderDateValue = order.orderTime || order.createTime;
          if (!orderDateValue) return false;
          const orderDate = new Date(orderDateValue.split(' ')[0]);
          const startDate = new Date(params.startDate);
          const endDate = new Date(params.endDate);
          return orderDate >= startDate && orderDate <= endDate;
        });
      }
    }
    result.sort((a, b) => {
        const dateA = new Date(a.orderTime || a.createTime || 0);
        const dateB = new Date(b.orderTime || b.createTime || 0);
        return dateB - dateA;
    });
    return {
      code: 200,
      message: '获取成功',
      data: paginateData(result, params?.page || 0, params?.size || 10)
    };
  },

  getSalesOrderDetail(id) {
    const order = salesOrders.find(order => order.id === id); // 操作的是本文件顶部的 salesOrders 数组
    if (order) {
      return {
        code: 200,
        message: '获取成功',
        data: { 
          ...order,
          salespersonId: order.salespersonId || (order.createdBy === '张三' ? 'user-zhangsan' : (order.createdBy === '李四' ? 'user-lisi' : '')),
          salespersonName: order.salespersonName || order.createdBy || '',
          orderTime: order.orderTime || order.createTime || '',
          createTime: order.createTime || order.orderTime || '', 
          remarks: order.remarks || '',
          status: order.status || 'DRAFT',
          items: (order.items || []).map(item => ({...item, outboundQuantity: item.outboundQuantity === undefined ? 0 : item.outboundQuantity})) // 确保 outboundQuantity 存在
        }
      };
    } else {
      return { code: 404, message: '销售单不存在', data: null };
    }
  },

  createSalesOrder(data) { 
    const newOrder = {
      id: generateId('so'),
      orderNo: `SO-${new Date().toISOString().slice(2,10).replace(/-/g,'')}-${String(salesOrders.length + 1).padStart(3,'0')}`,
      orderTime: data.orderTime, 
      createTime: data.orderTime, 
      salespersonId: data.salespersonId,
      salespersonName: data.salespersonName,
      createdBy: data.salespersonName || '未知创建人',
      status: data.status || 'DRAFT', 
      customerId: data.customerId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      totalAmount: data.totalAmount,
      remarks: data.remarks || '',
      items: (data.items || []).map(item => ({ 
        ...item, 
        id: generateId('soi'),
        outboundQuantity: 0 
      }))
    };
    salesOrders.unshift(newOrder); // 操作的是本文件顶部的 salesOrders 数组
    console.log('[Mock /salesOrders.js] New sales order created:', JSON.stringify(newOrder, null, 2));
    return { code: 200, message: '创建成功', data: { ...newOrder } };
  },

  updateSalesOrder(id, data) {
    const index = salesOrders.findIndex(order => order.id === id); // 操作的是本文件顶部的 salesOrders 数组
    if (index !== -1) {
      const originalOrder = salesOrders[index];
      salesOrders[index] = {
        ...originalOrder,
        ...data, 
        orderTime: data.orderTime || originalOrder.orderTime,
        createTime: data.orderTime || originalOrder.orderTime || originalOrder.createTime,
        salespersonId: data.salespersonId || originalOrder.salespersonId,
        salespersonName: data.salespersonName || originalOrder.salespersonName,
        createdBy: data.salespersonName || originalOrder.createdBy,
        updateTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
        items: (data.items || originalOrder.items).map(item => {
            // 查找原始行项目的 outboundQuantity
            const originalItem = originalOrder.items.find(origItem => origItem.id === item.id);
            const existingOutboundQuantity = originalItem ? (originalItem.outboundQuantity === undefined ? 0 : originalItem.outboundQuantity) : 0;
            
            return { 
                ...item, 
                id: item.id || generateId('soi'),
                // 如果更新时没有传递 outboundQuantity，则保留原有的，否则使用传递的值或默认为0
                outboundQuantity: item.outboundQuantity === undefined ? existingOutboundQuantity : (item.outboundQuantity || 0)
            };
        }),
      };
      console.log('[Mock /salesOrders.js] Sales order updated:', JSON.stringify(salesOrders[index], null, 2));
      return { code: 200, message: '更新成功', data: { ...salesOrders[index] } };
    } else {
      return { code: 404, message: '销售单不存在', data: null };
    }
  },

  deleteSalesOrder(id) {
    const index = salesOrders.findIndex(order => order.id === id); // 操作的是本文件顶部的 salesOrders 数组
    if (index !== -1) {
      salesOrders.splice(index, 1);
      return { code: 200, message: '删除成功', data: null };
    }
    return { code: 404, message: '销售单不存在', data: null };
  },

  submitSalesOrder(id) {
    const order = salesOrders.find(order => order.id === id); // 操作的是本文件顶部的 salesOrders 数组
    if (order) {
      if (order.status === 'DRAFT') {
        order.status = 'PENDING_APPROVAL';
        order.updateTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
        console.log('[Mock /salesOrders.js] Sales order submitted for approval:', order);
        return { code: 200, message: '提交成功', data: { ...order } };
      } else {
        return { code: 400, message: `状态为 ${order.status} 的订单无法提交审核`, data: null };
      }
    }
    return { code: 404, message: '销售单不存在', data: null };
  },

  approveSalesOrder(id, approved, comment) {
    const order = salesOrders.find(order => order.id === id); // 操作的是本文件顶部的 salesOrders 数组
    if (order) {
      if (order.status === 'PENDING_APPROVAL') {
        order.status = approved ? 'APPROVED' : 'DRAFT'; 
        order.updateTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
        const approvalLogAction = approved ? `[审核通过]` : `[审核不通过, 打回草稿]`;
        const commentEntry = comment ? `${approvalLogAction}: ${comment}` : approvalLogAction;
        const timestamp = new Date().toLocaleString('zh-CN', { hour12: false });
        if (order.remarks) {
          order.remarks += `\n${timestamp} - ${commentEntry}`;
        } else {
          order.remarks = `${timestamp} - ${commentEntry}`;
        }
        console.log('[Mock /salesOrders.js] Sales order approval processed. Order updated:', JSON.stringify(order, null, 2));
        return { 
            code: 200, 
            message: approved ? '审核通过' : '审核不通过，已打回草稿', 
            data: { ...order } 
        };
      } else {
        return { code: 400, message: `状态为 ${order.status} 的订单无法执行审核操作`, data: null };
      }
    }
    return { code: 404, message: '销售单不存在', data: null };
  }
};

export default salesOrdersMock; // 默认导出API服务对象