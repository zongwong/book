import config from "../utils/global";

export default (src) => {
    if(!src) return ''; 
    if(/^http/.test(src) ||  /^blob/.test(src)){
        return src;
    }else{
        return config.host + src;
    }
}

export const orderStatus = (status,target)  =>  {
    
    switch(status){
            case 'order_payed':
        return target.$t('order.order_payed');
            case 'order_create':
        return target.$t('order.order_create');
            case 'refund_apply':
        return target.$t('order.refund_apply');
            case 'order_refunded':
        return target.$t('order.order_refund');
            case 'order_canceled':
        return target.$t('order.order_canceled');
            case 'goods_delivered':
        return target.$t('order.goods_delivered');
            case 'goods_received':
        return target.$t('order.goods_received');
            case 'buyer_evaluated':
        return target.$t('order.buyer_evaluated');
            case 'seller_evaluated':
        return target.$t('order.seller_evaluated');
            case 'both_evaluated':
        return target.$t('order.both_evaluated');
            case 'outoftime':
        return target.$t('order.outoftime');
    }
}
export const isEmptyArr = (value) => {
    return Object.prototype.toString.call(value) === '[object Array]' && value.length === 0
}