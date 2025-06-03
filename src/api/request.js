import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import mockService from '@/mock'; //

// 全局Mock开关
const useMock = true; //

// 需要使用真实API的路径前缀列表（不使用Mock数据）
const realApiPaths = [ //
  '/auth/login',
  '/auth/logout',
  // '/auth/info' 
];

const isRealApiPath = (url) => {
  return realApiPaths.some(prefix => url.startsWith(prefix));
};

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000
});

service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 200) {
      ElMessage({
        message: res.message || '请求失败',
        type: 'error',
        duration: 5 * 1000
      });
      if (res.code === 401) {
        ElMessageBox.confirm(
          '登录状态已过期，请重新登录',
          '系统提示',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('userInfo');
          window.location.href = '/login';
        });
      }
      return Promise.reject(new Error(res.message || '请求失败'));
    } else {
      return res;
    }
  },
  error => {
    console.error('响应错误:', error);
    const message = error.response?.data?.message || error.message;
    ElMessage({
      message: message,
      type: 'error',
      duration: 5 * 1000
    });
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
    if (error.response?.status === 403) {
      window.location.href = '/403';
    }
    return Promise.reject(error);
  }
);

// Mock方法映射
const mockMethodMap = {
  get: (url, params) => {
    const pathParts = url.split('/');
    console.log('[request.js] Mock GET:', url, 'Params:', params);

    // 用户信息
    if (url === '/auth/info') {
      return mockService.getCurrentUser(); //
    }
    // 销售单
    if (pathParts[1] === 'sales' && pathParts[2] === 'orders') {
      if (pathParts.length === 3) return mockService.getSalesOrderList(params);
      if (pathParts.length === 4) return mockService.getSalesOrderDetail(pathParts[3]);
    }
    // 商品
    if (url === '/products') {
        return mockService.getProductList(params);
    }
    if (pathParts[1] === 'products' && pathParts.length === 3) {
        return mockService.getProductDetail(pathParts[2]);
    }
    // 客户
    if (url === '/customers') {
        return mockService.getCustomerList(params);
    }
    if (pathParts[1] === 'customers' && pathParts.length === 3) {
        return mockService.getCustomerDetail(pathParts[2]);
    }

    // --- 调整和新增的路由顺序 ---
    // 1. 更具体的规则放在前面
    if (url === '/inventory/pending-outbound-lines') { // 获取待创建出库单的销售单明细
      return mockService.getPendingOutboundSalesOrderLines(params); //
    }
    // 2. 获取待发货出库单列表 (用于发货单创建)
    if (url === '/inventory/outbound-orders/ready-to-ship') {
        return mockService.getReadyToShipOutboundOrders(params); //
    }
    // 3. 出库单列表
    if (url === '/inventory/outbound-orders' && pathParts.length === 3) {
        return mockService.getOutboundOrderList(params); //
    }
    // 4. 出库单详情 (确保这是最后关于 /inventory/outbound-orders 的匹配)
    if (pathParts[1] === 'inventory' && pathParts[2] === 'outbound-orders' && pathParts.length === 4) {
        return mockService.getOutboundOrderDetail(pathParts[3]); //
    }
    
    // 发货单模块的 Mock GET 路由
    if (url === '/sales/shipments') {
        return mockService.getShipmentOrderList(params); //
    }
    if (pathParts[1] === 'sales' && pathParts[2] === 'shipments' && pathParts.length === 4) {
        return mockService.getShipmentOrderDetail(pathParts[3]); //
    }
    if (url === '/basedata/logistics-carriers') {
        return mockService.getLogisticsCarriers(params); //
    }
    // --- 结束调整 ---

    console.warn(`Mock GET for ${url} not found.`);
    return Promise.resolve({ code: 404, message: `Mock API不存在: GET ${url}`, data: null });
  },
  post: (url, data) => { //
    const pathParts = url.split('/');
    console.log('[request.js] Mock POST:', url, 'Data:', data);

    // 销售单
    if (url === '/sales/orders') {
      return mockService.createSalesOrder(data);
    }
    if (pathParts[1] === 'sales' && pathParts[2] === 'orders' && pathParts.length === 5 && pathParts[4] === 'submit') {
      return mockService.submitSalesOrder(pathParts[3]);
    }
    if (pathParts[1] === 'sales' && pathParts[2] === 'orders' && pathParts.length === 5 && pathParts[4] === 'approve') {
      return mockService.approveSalesOrder(pathParts[3], data.approved, data.comment);
    }
    
    // 出库模块
    if (url === '/inventory/outbound-orders') {
      return mockService.createOutboundOrder(data); //
    }

    // 发货单模块的 Mock POST 路由
    if (url === '/sales/shipments') {
      return mockService.createShipmentOrder(data); //
    }
    if (pathParts[1] === 'sales' && pathParts[2] === 'shipments' && pathParts.length === 5 && pathParts[4] === 'delivered') {
        return mockService.confirmShipmentDelivery(pathParts[3]); //
    }

    console.warn(`Mock POST for ${url} not found.`);
    return Promise.resolve({ code: 404, message: `Mock API不存在: POST ${url}`, data: null });
  },
  put: (url, data) => { //
    const pathParts = url.split('/');
    console.log('[request.js] Mock PUT:', url, 'Data:', data);
    
    // 销售单
    if (pathParts[1] === 'sales' && pathParts[2] === 'orders' && pathParts.length === 4) {
      return mockService.updateSalesOrder(pathParts[3], data);
    }

    // 出库模块
    if (pathParts[1] === 'inventory' && pathParts[2] === 'outbound-orders' && pathParts.length === 4) {
        return mockService.updateOutboundOrder(pathParts[3], data); //
    }

    // 发货单模块的 Mock PUT 路由
    if (pathParts[1] === 'sales' && pathParts[2] === 'shipments' && pathParts.length === 4) {
        return mockService.updateShipmentOrder(pathParts[3], data); //
    }

    console.warn(`Mock PUT for ${url} not found.`);
    return Promise.resolve({ code: 404, message: `Mock API不存在: PUT ${url}`, data: null });
  },
  delete: (url, params) => {  //
    const pathParts = url.split('/');
    console.log('[request.js] Mock DELETE:', url, 'Params:', params);

    // 销售单
    if (pathParts[1] === 'sales' && pathParts[2] === 'orders' && pathParts.length === 4) {
      return mockService.deleteSalesOrder(pathParts[3]);
    }

    // 出库模块
    if (pathParts[1] === 'inventory' && pathParts[2] === 'outbound-orders' && pathParts.length === 4) {
        return mockService.deleteOutboundOrder(pathParts[3]); //
    }

    // 发货单模块的 Mock DELETE 路由
    if (pathParts[1] === 'sales' && pathParts[2] === 'shipments' && pathParts.length === 4) {
        return mockService.deleteShipmentOrder(pathParts[3]); //
    }

    console.warn(`Mock DELETE for ${url} not found.`);
    return Promise.resolve({ code: 404, message: `Mock API不存在: DELETE ${url}`, data: null });
  }
};

const request = {
  async get(url, params) {
    if (isRealApiPath(url) || !useMock) {
      return service({ url, method: 'get', params });
    }
    return mockMethodMap.get(url, params);
  },
  async post(url, data) {
    if (isRealApiPath(url) || !useMock) {
      return service({ url, method: 'post', data });
    }
    return mockMethodMap.post(url, data);
  },
  async put(url, data) {
    if (isRealApiPath(url) || !useMock) {
      return service({ url, method: 'put', data });
    }
    return mockMethodMap.put(url, data);
  },
  async delete(url, params) { 
    if (isRealApiPath(url) || !useMock) {
      return service({ url, method: 'delete', params });
    }
    return mockMethodMap.delete(url, params);
  }
};

export default request;