"use client";
import NbCartItem from "@models/nbCartItem.model";
import api2 from "@utils/__api__/market-1";
import {
  FC,
  useMemo,
  ReactNode,
  useReducer,
  useContext,
  createContext,
  useEffect,
} from "react";


// =================================================================================
type InitialState = { cart: NbCartItem[]; 
  isHeaderFixed: boolean, 
  cartInfo: any, 
  order: any, 
  checkoutStep: string | number, 
  signupOtp:{phone: string | number, session: string },
  componentLoader: boolean,
  buttonLoader: boolean,
  pageLoader: boolean,
  alertNotification: boolean,
  alertToast: boolean,
  products: any,
  categories: any
  customerOrders: any,
  loginPopup: boolean,
  buttonState: ButtonStateType,
  orderStatus: any,
  customerProfileData: any,
  wishList: any,
  isBulkQuantityFormOpen: boolean
};

type ButtonStateType = {
  name: string,
  state: boolean
}


type DeleteCartItem = { type: "DELETE_ALL_CART_ITEMS"; };
type CartActionType = { type: "CHANGE_CART_AMOUNT"; payload: any };
type LayoutActionType = { type: "TOGGLE_HEADER"; payload: boolean };
type UpdateOrderDetails = {type: "UPDATE_ORDER_DETAILS_GSTINFO"; payload: any };
type UpdateOrderCustomerInfo = {type: "UPDATE_ORDER_CUSTOMER_INFO"; payload: any};
type UpdateShippingAddress = {type: "UPDATE_SHIPPING_ADDRESS"; payload: any};
type UpdateBillingAddress = {type: "UPDATE_BILLING_ADDRESS"; payload: any};
type UpdateCartId = {type: "UPDATE_CART_ID"; payload: any};
type PhoneTempCache = {type: "PHONE_TEMP_CACHE"; payload: any};
type ComponentLoader = {type: "UPDATE_COMPONENT_LOADER"; payload: any};
type ButtonLoader = {type: "UPDATE_BUTTON_LOADER"; payload: any};
type ButtonState = {type: "UPDATE_BUTTON_STATE"; payload: any};
type PageLoader = {type: "UPDATE_PAGE_LOADER"; payload: any};
type AlertNotification = {type: "UPDATE_ALERT_NOTIFCATION"; payload: any};
type AlertToast = {type: "UPDATE_ALERT_TOAST"; payload: any};
type UpdateCheckoutStep = {type: "UPDATE_CHECKOUT_FORM_STEP"; payload: any};
type UpdateProductList = {type: "UPDATE_PRODUCT_LIST"; payload: any};
type CategoryList = {type: "CATEGORY_LIST"; payload: any};
type CustomerOrders = {type: "CUSTOMER_ORDERS"; payload: any};
type OrderStatus = {type: "ORDER_STATUS"; payload: any};
type CustomerProfileData = {type: "CUSTOMER_PROFILE_DATA"; payload: any};
type LoginPopup = {type: "LOGIN_POPUP"; payload: any};
type WishList = {type: "WISHLIST"; payload: any};
type IsBulkQuantityFormOpen = {type: "ISBULKQUANTITYFORMOPEN"; payload: boolean};
type ActionType = IsBulkQuantityFormOpen | WishList | CustomerProfileData | OrderStatus | ButtonState | LoginPopup | CustomerOrders | ButtonLoader | CategoryList | UpdateProductList | UpdateCheckoutStep | CartActionType | LayoutActionType | DeleteCartItem | UpdateOrderDetails | UpdateOrderCustomerInfo | UpdateShippingAddress | UpdateBillingAddress | UpdateCartId | PhoneTempCache | ComponentLoader | PageLoader | AlertNotification | AlertToast;


// =================================================================================

const INITIAL_PRODUCT_SEARCH_AND_CRITERIA = {
  dataOption: "all",
  searchCriteriaList: [
      {
        filterKey: "isVariant",
        operation: "eq",
        value: false,
        attributeValue : "true"
    }
  ]
}

const INITIAL_BUTTON_STATE = {
  name: "",
  state: false
}

const INITIAL_CART = [];

const INITAIL_ORDER = {
    cartId : null,
    shippingAddress: null,
    billingAddress: null,
    paymentMethod: "COD",
    gstInfo: "",
    customerFullName : "",
    customerEmail: "",
    customerPhone: ""
}

const INITIAL_SIGNUP_OTP = {
  phone: "",
  session: ""
}

const INITIAL_STATE = { 
  cart: INITIAL_CART, 
  isHeaderFixed: false, 
  cartInfo: null, 
  order: INITAIL_ORDER, 
  checkoutStep : 1, 
  signupOtp: INITIAL_SIGNUP_OTP, 
  componentLoader: false,
  buttonLoader: false,
  pageLoader: false,
  alertNotification: false,
  alertToast: false,
  products: null,
  categories: [],
  customerOrders: null,
  loginPopup: false,
  buttonState: INITIAL_BUTTON_STATE,
  orderStatus: [],
  customerProfileData: null,
  wishList: [],
  isBulkQuantityFormOpen: false
};

interface ContextProps {
  state: InitialState;
  dispatch: (args: ActionType) => void;
}

const AppContext = createContext<ContextProps>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const reducer = (state: InitialState, action: ActionType) => {
  switch (action.type) {
    case "WISHLIST" : 
      return { ...state, wishList : action.payload}
    case "ISBULKQUANTITYFORMOPEN" : 
      return { ...state, isBulkQuantityFormOpen : action.payload}
    case "UPDATE_BUTTON_STATE" : 
      return { ...state, buttonState : action.payload}
    case "CUSTOMER_PROFILE_DATA" : 
      return { ...state, customerProfile : action.payload}
    case "TOGGLE_HEADER":
      return { ...state, isHeaderFixed: action.payload };

    case "CATEGORY_LIST":
      return { ...state, categories: action.payload };
    
    case "DELETE_ALL_CART_ITEMS":
      return { ...state, cart: [] };

    case "CHANGE_CART_AMOUNT":
      return { ...state, cart: action.payload?.cartItems, cartInfo: action.payload };

    case "UPDATE_CART_ID":
      return { ...state, order: { ...state.order, cartId: action.payload?.cart }};
      
    case "UPDATE_CHECKOUT_FORM_STEP":
      return { ...state, checkoutStep: action.payload};

    case "UPDATE_ORDER_DETAILS_GSTINFO":
      return { ...state, checkoutStep: 3, order: { ...state.order, gstInfo: action.payload }};

    case "UPDATE_SHIPPING_ADDRESS":
      return { ...state, order: { ...state.order, shippingAddress: action.payload }};

    case "UPDATE_BILLING_ADDRESS":
      return { ...state, order: { ...state.order, billingAddress: action.payload }};

    case "UPDATE_COMPONENT_LOADER" :
        return {...state, componentLoader: action.payload}

    case "UPDATE_BUTTON_LOADER" :
        return {...state, buttonLoader: action.payload}
        
    case "UPDATE_PAGE_LOADER" :
        return {...state, pageLoader: action.payload}
    case "UPDATE_ALERT_NOTIFCATION" :
        return {...state, alertNotification: action.payload}
    case "UPDATE_ALERT_TOAST" :
        return {...state, alertToast: action.payload}
    
    case "UPDATE_PRODUCT_LIST" : 
      return {...state, products: action.payload}

    case "CUSTOMER_ORDERS" : 
      return {...state, customerOrders: action.payload}
    
    case "ORDER_STATUS" : 
      return {...state, orderStatus: action.payload}
    
    case "LOGIN_POPUP" : 
      return {...state, loginPopup: action.payload}

    case "PHONE_TEMP_CACHE":
      debugger;
      console.log(action.payload);
      return { ...state, signupOtp : {...state.signupOtp, phone: action.payload?.phone, session:action.payload?.session  }};

    case "UPDATE_ORDER_CUSTOMER_INFO":
      return { ...state, checkoutStep: 2, order: { ...state.order, 
        customerFullName: action.payload.fullName,
        customerPhone: action.payload.phone,
        customerEmail: action.payload.email,
     }};

    default: {
      return state;
    }
  }
};

// =======================================================
type AppProviderProps = { children: ReactNode };
// =======================================================

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext<ContextProps>(AppContext);

export default AppContext;
